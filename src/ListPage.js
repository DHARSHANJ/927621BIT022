import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import Logo from "./images/logo.png";
import Photo from "./images/images.jpg";
import Swal from "sweetalert2";

// List employee component
const ListEmployee = () => {
  // State variables
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [data, setData] = useState([]);

  // Check login status on mount
  useEffect(() => {
    for (let key in localStorage) {
      if (key.startsWith("emsloggedin")) {
        if (localStorage.getItem(key)) {
          setIsLoggedIn(true);
          break;
        }
      }
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/fetch-data");
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Filtered data based on search query
  const filteredData = data.filter((employee) =>
    Object.values(employee).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Logout function
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
          if (key.startsWith("emsloggedin")) {
            localStorage.removeItem(key);
          }
        }
        setIsLoggedIn(false);
        navigate("/");
      }
    });
  };

  // Return JSX
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
          <Link to="/addpage" className="ems-header-link">
            Add
          </Link>
          <Link to="/edit" className="ems-header-link">
            Edit
          </Link>
          {isLoggedIn ? (
            <Link
              onClick={clearLocalStorageVariables}
              className="ems-header-link"
            >
              Logout
            </Link>
          ) : (
            <Link to="/loginpage" className="ems-header-link2">
              Login
            </Link>
          )}
        </nav>
      </header>
      <div className="ems-container">
        <h2>List of Employees</h2>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <table className="ems-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.mail}>
                <td>{item.id}</td>
                <td>
                  {item.image ? (
                    <img
                      src={`http://localhost:3001/uploads/${item.image}`}
                      alt={item.name}
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
                <td>{item.mail}</td>
                <td>{item.position}</td>
                <td>{item.dept}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="ems-footer1">
        &copy; 2024 Employee Management System. All rights reserved.
      </footer>{" "}
    </>
  );
};

export default ListEmployee;
