import React, { useState } from "react";
import "./addDog.css";
import DOMPurify from "dompurify";

const AddDog = ({ onClose, onDogsUpdate, userId }) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [county, setCounty] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize inputs
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedBreed = DOMPurify.sanitize(breed);
    const sanitizedCounty = DOMPurify.sanitize(county);

    // Validate dog name length
    if (sanitizedName.length > 10) {
      alert("Dog name should not be more than 10 characters");
      return;
    }

    const formData = new FormData();
    formData.append("name", sanitizedName);
    formData.append("breed", sanitizedBreed);
    formData.append("county", sanitizedCounty);
    formData.append("image", image);
    formData.append("user", userId);

    // Debugging: Log all form data entries
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    setIsUploading(true);

    try {
      const response = await fetch(`${baseUrl}/api/dogs/add/`, {
        mode: 'no-cors',
        method: "POST",
        body: formData, // Pass FormData directly
      });

      if (response.ok) {
        const updatedDogs = await response.json();
        onDogsUpdate(updatedDogs); // Update the dogs list in the parent component
        onClose();
      } else {
        console.error("Error adding dog:", await response.text());
      }
    } catch (error) {
      console.error("Error adding dog:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="add-dog-modal">
      <div className="add-dog-modal-content">
        <span className="add-dog-close" onClick={onClose}>
          &times;
        </span>
        <h2>Add a Dog</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Dog Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={10}
            required
          />
          <select
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          >
            <option value="">Select Breed</option>
            <option value="Labrador">Labrador</option>
            <option value="Beagle">Beagle</option>
            <option value="German Shepherd">German Shepherd</option>
            <option value="Bulldog">Bulldog</option>
          </select>
          <select
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            required
          >
            <option value="">Select County</option>
            <option value="Dublin">Dublin</option>
            <option value="Cork">Cork</option>
            <option value="Galway">Galway</option>
            <option value="Limerick">Limerick</option>
          </select>
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload your dog's photo
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />
          <button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Add Dog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDog;
