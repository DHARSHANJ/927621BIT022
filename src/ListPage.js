import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Logo from "./images/logo.png";
import Photo from "./images/images.jpg";

// List employee component
const ListEmployee = () => {
  // State variables
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

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

  // Return JSX
  return (
    <>
      <header className="ems-header">
        <div className="ems-header-left">
          <img src={Logo} alt="EMS Logo" className="ems-logo" />
          <div className="ems-header-title">BUYBETTER</div>
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
              <th>Photo</th>
              <th>Name</th>
              <th>Website</th>
              <th>prize</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr>
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
                <td>{item.web}</td>
                <td>{item.prize}</td>
                <td>{item.contact}</td>
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
