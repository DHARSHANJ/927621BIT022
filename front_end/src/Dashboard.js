import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Emp from "./images/emp.png";
import Emp2 from "./images/emp3.png";
import Logo from "./images/logo.png";
import Swal from "sweetalert2";

// Dashboard component
const DashBoard = () => {
  // Menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status
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

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Clear local storage
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
      }
    });
  };

  return (
    <>
      <header className="ems-header">
        {/* Header left section */}
        <div className="ems-header-left">
          <img src={Logo} alt="ems Logo" className="ems-logo" />
          <div className="ems-header-title">ems</div>
        </div>
        {/* Menu icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        {/* Navigation menu */}
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
          <Link to="/list" className="ems-header-link">
            List
          </Link>
          {isLoggedIn ? (
            <Link
              onClick={clearLocalStorageVariables}
              className="ems-header-link2"
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
      <>
        <div className="ems-space" />
        <div className="ems-container">
          <div className="ems-content-box">
            <div className="ems-slogan">Compare Top Products</div>
            <div className="ems-content">
              <p>
                Discover the best deals from various e-commerce platforms.
                Compare prices, ratings, discounts, and more to make informed
                purchasing decisions.
              </p>
              <br />
              <Link to="/addpage">
                <button className="ems-rounded-outline-button">
                  Add Product
                </button>
              </Link>
            </div>
          </div>
          <div className="ems-image-container">
            <img src={Emp} alt="Product" className="ems-image" />
          </div>
        </div>
        <div className="ems-slogan-center">
          Simplifying Your Shopping Experience
        </div>
        <div className="ems-columns-container">
          <div className="ems-column">
            <h2 className="ems-column-title">Top Deals</h2>
            <p className="ems-content-justified">
              Find the best deals across multiple e-commerce platforms. Our
              service ensures you never miss out on great discounts and offers.
            </p>
          </div>
          <div className="ems-column">
            <h2 className="ems-column-title">Comprehensive Comparison</h2>
            <p className="ems-content-justified">
              Compare products based on price, rating, discount, and more. Our
              platform provides a detailed comparison to help you make the best
              choice.
            </p>
          </div>
          <div className="ems-column">
            <h2 className="ems-column-title">User Reviews</h2>
            <p className="ems-content-justified">
              Read user reviews from various platforms to get insights into
              product quality and performance before making a purchase.
            </p>
          </div>
        </div>
        <div className="ems-container">
          <div className="ems-content-box">
            <div className="ems-slogan">
              Stay Updated with the Latest Products
            </div>
            <div className="ems-content">
              <p>
                Our platform constantly updates to bring you the latest products
                from various e-commerce platforms. Stay ahead with the newest
                offerings in the market.
              </p>
              <br />
              <Link to="/edit">
                <button className="ems-rounded-outline-button">
                  Edit Product
                </button>
              </Link>
            </div>
          </div>
          <div className="ems-image-container">
            <img src={Emp2} alt="Product" className="ems-image" />
          </div>
        </div>
      </>
      <Footer />
    </>
  );
};

export default DashBoard;
