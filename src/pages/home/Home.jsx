import Navbar from "../../components/Navbar/Navbar";
import React from "react";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Adopt from "../../components/Adopt/Adopt";
import Contact from "../../components/Contact/Contact";

const Home = ({ onSignup, onLogin }) => {
  return (
    <>
      <Navbar onSignup={onSignup} onLogin={onLogin} />
      <Hero />
      <About />
      <Adopt />
      <Contact />
    </>
  );
};

export default Home;
