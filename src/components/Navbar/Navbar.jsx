import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/dog-logo.png";

const Menu = ({ onSignupClick, onLoginClick }) => {
  return (
    <>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <a href="#signup" onClick={onSignupClick}>
        Signup
      </a>
      <a href="#login" onClick={onLoginClick}>
        Login
      </a>
    </>
  );
};

const Navbar = ({ onSignup, onLogin }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    onSignup();
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="nav">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src={logo} alt="logo" />
        </a>
        <span className="navbar-text">PawfectMatch</span>
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <Menu
            onSignupClick={handleSignupClick}
            onLoginClick={handleLoginClick}
          />
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
