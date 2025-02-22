import React from "react";
import "./hero.css";
import wave from "../../assets/wave.svg";
import dog from "../../assets/dog.png";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-container">
          <div className="cta">
            <h1 className="hero-text">Find the Pawfect Match</h1>
            <button className="btn">Adopt now</button>
          </div>
          <img src={wave} alt="wave" className="wave" />
          <img src={dog} alt="dog" className="hero-bottom-dog" />
        </div>
      </div>
    </>
  );
};

export default Hero;
