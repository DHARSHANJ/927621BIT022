// Import modules
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// Initialize app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce",
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Handle form submission
app.post("/submit", upload.single("image"), async (req, res) => {
  const { name, web, url, contact, prize } = req.body;
  const imagePath = req.file ? req.file.filename : null;

  try {
    const connection = await pool.getConnection();
    const insertQuery = `
      INSERT INTO data (name, web, url, contact, prize, photo)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await connection.query(insertQuery, [
      name,
      web,
      url,
      contact,
      prize,
      imagePath,
    ]);
    res.status(201).json({ message: "Product added successfully" });
    connection.release();
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "Product ID already exists." });
    } else {
      res
        .status(500)
        .json({ error: "An error occurred while inserting data." });
    }
  }
});

// Handle login
app.post("/login", async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res.status(400).send("ID and password are required.");
    return;
  }

  const query =
    "SELECT * FROM data WHERE id = ? AND password = ? AND dept='HR'";
  try {
    const [results] = await pool.query(query, [id, password]);
    if (results.length === 1) {
      res.status(200).json({ message: "Login successful", id });
    } else {
      res.status(401).send("Invalid ID or password.");
    }
  } catch (err) {
    res.status(500).send("An error occurred during login.");
  }
});

// Replace data
app.post("/replace-data", async (req, res) => {
  const { id } = req.body;
  const randomSixDigitNumber = crypto.randomInt(100000, 1000000);
  const formattedNumber = `emsloggedin${randomSixDigitNumber}`;
  const updateSql = "UPDATE data SET number = ? WHERE id = ? AND dept='HR'";

  try {
    await pool.query(updateSql, [formattedNumber, id]);
    res.status(200).json({ newNumber: formattedNumber });
  } catch (err) {
    res.status(500).send("Error updating data");
  }
});

// Get data
app.get("/getdata", async (req, res) => {
  const { id, number } = req.query;
  if (!id || !number) {
    res.status(400).json({ error: "Missing id or number" });
    return;
  }

  const query =
    "SELECT * FROM data WHERE id = ? AND number = ? AND dept = 'HR'";
  try {
    const [results] = await pool.query(query, [id, number]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Fetch all data
app.get("/fetch-data", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM data");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while fetching data." });
  }
});

// Update data
app.put("/update", upload.single("image"), async (req, res) => {
  const { name, web, url, prize } = req.body;
  const imagePath = req.file ? req.file.filename : null;

  try {
    const updateQuery = imagePath
      ? `
        UPDATE data
        SET name=?, web=?, url=?, prize=?, photo=?`
      : `
        UPDATE data
        SET name=?, web=?, url=?, prize=?
      `;
    const values = imagePath
      ? [name, web, url, prize, imagePath]
      : [name, web, url, prize];

    await pool.query(updateQuery, values);
    res.status(200).send({ message: "Data updated successfully" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "Product Mail already exists." });
    } else {
      res.status(500).json({ error: "An error occurred while updating data." });
    }
  }
});

// Delete data
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM data WHERE id = ?", [id]);
    res.status(200).send({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while deleting data." });
  }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
