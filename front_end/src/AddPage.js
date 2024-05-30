import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./App.css";
import Logo from "./images/logo.png";
import Footer from "./Footer";

// Add product component
const AddPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    url: "",
    contact: "",
    prize: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      dataToSend.append(key, value);
    }

    if (imageFile) {
      dataToSend.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:3001/submit", {
        method: "POST",
        body: dataToSend,
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Product added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setFormData({
          name: "",
          website: "",
          url: "",
          contact: "",
          prize: "",
        });
        setImageFile(null);
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  const clearLocalStorageVariables = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will log you out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        for (let key in localStorage) {
          if (key.startsWith("buybetterloggedin")) {
            localStorage.removeItem(key);
          }
        }
        navigate("/");
      }
    });
  };

  return (
    <>
      <header className="buybetter-header">
        <div className="buybetter-header-left">
          <img src={Logo} alt="BuyBetter Logo" className="buybetter-logo" />
          <div className="buybetter-header-title">BUYBETTER</div>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        <nav className={`buybetter-header-nav ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="buybetter-header-link1" onClick={toggleMenu}>
            Home
          </Link>
          <Link
            to="/list"
            className="buybetter-header-link"
            onClick={toggleMenu}
          >
            List
          </Link>
          <Link
            to="/edit"
            className="buybetter-header-link"
            onClick={toggleMenu}
          >
            Edit
          </Link>
          <Link
            onClick={clearLocalStorageVariables}
            className="buybetter-header-link2"
          >
            Logout
          </Link>
        </nav>
      </header>

      <form className="buybetter-container" onSubmit={handleSubmit}>
        <div className="buybetter-formContainer">
          <div className="buybetter-formGroup">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              className="buybetter-input"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="buybetter-formGroup">
            <label htmlFor="website">E-Commerce Website:</label>
            <input
              type="text"
              className="buybetter-input"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
            />
          </div>
          <div className="buybetter-formGroup">
            <label htmlFor="url">URL:</label>
            <input
              type="text"
              className="buybetter-input"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="buybetter-formContainer">
          <div className="buybetter-formGroup">
            <label htmlFor="contact">Contact:</label>
            <input
              type="tel"
              className="buybetter-input"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              pattern="\d{10}"
              title="Enter a 10-digit phone number"
            />
          </div>
          <div className="buybetter-formGroup">
            <label htmlFor="prize">Price:</label>
            <input
              type="number"
              className="buybetter-input"
              id="prize"
              name="prize"
              value={formData.prize}
              onChange={handleChange}
              required
              min={0}
              step="0.01"
            />
          </div>
          <div className="buybetter-formGroup">
            <label htmlFor="photo">Upload Photo:</label>
            <input
              type="file"
              className="buybetter-input"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="buybetter-formGroup">
            <input
              type="submit"
              className="buybetter-submitButton"
              value="Submit"
            />
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default AddPage;
