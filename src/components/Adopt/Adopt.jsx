import React from "react";
import "./adopt.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faDog, faHome } from "@fortawesome/free-solid-svg-icons";

const Adopt = () => {
  return (
    <div className="adopt-container">
      <div className="adopt-text">
        <h1>We Need Help</h1>
        <h2>Adopt Us</h2>
      </div>
      <div className="adopt-cards">
        <div className="card-adopt">
          <FontAwesomeIcon icon={faPaw} className="card-icon" />
          <h3>Pets Available</h3>
          <p>50</p>
        </div>
        <div className="card-adopt">
          <FontAwesomeIcon icon={faDog} className="card-icon" />
          <h3>Number of Breeds</h3>
          <p>20</p>
        </div>
        <div className="card-adopt">
          <FontAwesomeIcon icon={faHome} className="card-icon" />
          <h3>Shelters Needing Support</h3>
          <p>10</p>
        </div>
      </div>
    </div>
  );
};

export default Adopt;
