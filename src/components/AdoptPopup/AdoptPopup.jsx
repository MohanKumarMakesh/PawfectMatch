import React from "react";
import "./adopt-popup.css";

const AdoptPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Appointment Made</h2>
        <p>Looking forward to your visit!</p>
      </div>
    </div>
  );
};

export default AdoptPopup;
