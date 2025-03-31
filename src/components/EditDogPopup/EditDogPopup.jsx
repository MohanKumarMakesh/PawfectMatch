import React, { useState } from "react";
import "./editDogPopup.css";

const EditDogPopup = ({ dog, onClose, onSave }) => {
  const [name, setName] = useState(dog.name);
  const [image, setImage] = useState(dog.image);
  const [county, setCounty] = useState(dog.county);

  const handleSave = () => {
    const updatedDog = { ...dog, name, image, county };
    onSave(updatedDog);
  };

  return (
    <div className="edit-dog-popup">
      <div className="popup-content">
        <h2>Edit Dog</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          County:
          <input
            type="text"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
          />
        </label>
        <div className="popup-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditDogPopup;