import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/dog-logo.png";

const Menu = () => {
  return (
    <>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <a href="/signup">Signup</a>
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="nav">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src={logo} alt="logo" />
        </a>
        <span className="navbar-text">PawfectMatch</span>
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <Menu />
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
