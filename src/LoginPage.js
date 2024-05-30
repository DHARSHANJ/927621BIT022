import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "./images/logo.png";
import "./App.css";

// Login form component
function FormComponent() {
  const [id, setid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle login submit
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const eid = responseData.id;

        axios
          .post("http://localhost:3001/replace-data", { id: eid })
          .then((response) => {
            const newNumber = response.data.newNumber;
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              if (key && key.startsWith("emsloggedin")) {
                keysToRemove.push(key);
              }
            }
            keysToRemove.forEach((key) => localStorage.removeItem(key));
            localStorage.setItem(newNumber, eid);
          })
          .catch((error) => {
            console.error("Error replacing data:", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred during data replacement.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });

        Swal.fire({
          title: "Success!",
          text: "Login successful.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Invalid ID or password.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred during login.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="ems-header">
        <div className="ems-header-left">
          <img src={Logo} alt="EMS Logo" className="ems-logo" />
          <div className="ems-header-title">EMS</div>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        <nav className={`ems-header-nav ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="ems-header-link1" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/list" className="ems-header-link2">
            List
          </Link>
        </nav>
      </header>
      <div className="empForm-container2">
        <div className="empForm-formContainer">
          <h2 className="login-header">LOGIN</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="empForm-formGroup">
              <label>ID:</label>
              <input
                type="text"
                className="empForm-input2"
                value={id}
                onChange={(e) => setid(e.target.value)}
                required
              />
            </div>
            <div className="empForm-formGroup">
              <label>PASSWORD:</label>
              <input
                type="password"
                className="empForm-input2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="empForm-submitButton2">
              LOGIN
            </button>
          </form>
        </div>
      </div>
      <footer className="ems-footer1">
        &copy; 2024 Employee Management System. All rights reserved.
      </footer>
    </>
  );
}

export default FormComponent;
