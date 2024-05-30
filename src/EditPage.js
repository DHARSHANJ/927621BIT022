import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import Logo from "./images/logo.png";
import Photo from "./images/images.jpg";

// Edit employee component
const EditPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editImageFile, setEditImageFile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchInitialData = async () => {
    try {
      const response = await fetch("http://localhost:3001/fetch-data");
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Handle input change
  const handleChange = (e, setFunc) => {
    const { name, value } = e.target;
    setFunc((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image change
  const handleEditImageChange = (e) => {
    setEditImageFile(e.target.files[0]);
  };

  // Handle edit click
  const handleEditClick = (item) => {
    setEditMode(true);
    setEditFormData({ ...item });
    setEditImageFile(null);
  };

  // Handle update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("name", editFormData.name);
    updatedData.append("contact", editFormData.contact);
    updatedData.append("web", editFormData.web);
    updatedData.append("prize", editFormData.prize);
    updatedData.append("url", addOneDay(editFormData.url));
    if (editImageFile) {
      updatedData.append("image", editImageFile);
    }

    try {
      const response = await fetch("http://localhost:3001/update", {
        method: "PUT",
        body: updatedData,
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Data updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/abc");
        });

        setData((prevData) =>
          prevData.map((item) =>
            item.id === editFormData.id
              ? {
                  ...editFormData,
                }
              : item
          )
        );

        setEditMode(false);
      } else {
        const errorMessage = await response.json();

        Swal.fire({
          title: "Warning!",
          text: errorMessage.error,
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  //Handle delete
  const handleDeleteClick = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3001/delete/${id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            setData((prevData) => prevData.filter((item) => item.id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your data has been deleted.",
              icon: "success",
            });
          } else {
            const errorMessage = await response.json();
            Swal.fire({
              title: "Error!",
              text: errorMessage.error,
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An unexpected error occurred.",
            icon: "error",
          });
        }
      }
    });
  };

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const addOneDay = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div>
      <header className="ems-header">
        <div className="ems-header-left">
          <img src={Logo} alt="EMS Logo" className="ems-logo" />
          <div className="ems-header-title">BUYBETTER</div>
        </div>
        {/* Header navbar */}
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        <nav className={`ems-header-nav ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="ems-header-link1" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/addpage" className="ems-header-link">
            Add
          </Link>
          <Link to="/list" className="ems-header-link">
            List
          </Link>
        </nav>
      </header>
      <div className="ems-container">
        <h2>Fetched Data</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        {/*Edit table*/}
        {data.length > 0 ? (
          <table className="ems-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Website</th>
                <th>prize</th>
                <th>url</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const matchesSearch = Object.values(item).some((value) =>
                  value
                    .toString()
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                );

                if (matchesSearch) {
                  return (
                    <tr key={item.id}>
                      <td>
                        {item.image ? (
                          <img
                            src={`http://localhost:3001/uploads/${item.image}`}
                            alt="Employee"
                            className="employee-photo"
                          />
                        ) : (
                          <img
                            src={Photo}
                            alt="Employee"
                            className="employee-photo"
                          />
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.web}</td>
                      <td>{item.prize}</td>
                      <td>{item.url}</td>

                      <td>
                        <button
                          onClick={() => handleEditClick(item)}
                          className="ems-rounded-edit-button"
                        >
                          Edit
                        </button>{" "}
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="ems-rounded-delete-button"
                        >
                          Delete
                        </button>{" "}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
        {/*Edit form*/}
        {editMode && (
          <div>
            <div className="ems-editform">
              <button className="close-btn" onClick={() => setEditMode(false)}>
                &times;
              </button>
              <h2>Edit Employee</h2>
              <form onSubmit={handleUpdateSubmit}>
                <div className="ems-label">
                  <label>ID:</label>
                  <input
                    className="empForm-input"
                    type="text"
                    name="id"
                    value={editFormData.id}
                    readOnly
                  />
                </div>
                <div className="ems-label">
                  <label>Name:</label>
                  <input
                    className="empForm-input"
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={(e) => handleChange(e, setEditFormData)}
                  />
                </div>

                <div className="ems-label">
                  <label>Website:</label>
                  <input
                    className="empForm-input"
                    type="text"
                    name="web"
                    value={editFormData.web}
                    onChange={(e) => handleChange(e, setEditFormData)}
                  />
                </div>

                <div className="ems-label">
                  <label htmlFor="contact">Contact:</label>
                  <input
                    type="tel"
                    className="empForm-input"
                    name="contact"
                    value={editFormData.contact}
                    onChange={(e) => handleChange(e, setEditFormData)}
                    pattern="\d{10}"
                    title="Enter a 10-digit phone number"
                  />
                </div>

                <div className="ems-label">
                  <label htmlFor="prize">Prize:</label>
                  <input
                    type="number"
                    className="empForm-input"
                    name="prize"
                    value={editFormData.prize}
                    onChange={(e) => handleChange(e, setEditFormData)}
                    min={0}
                    step="0.01"
                  />
                </div>
                <div className="ems-label">
                  <label>Upload Image:</label>
                  <input
                    type="file"
                    className="empForm-input"
                    onChange={handleEditImageChange}
                  />
                </div>
                <button type="submit" className="empForm-updateButton">
                  Update
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="empForm-closeButton"
                >
                  close{" "}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <footer className="ems-footer1">
        &copy; 2024 Employee Management System. All rights reserved.
      </footer>{" "}
    </div>
  );
};

export default EditPage;
