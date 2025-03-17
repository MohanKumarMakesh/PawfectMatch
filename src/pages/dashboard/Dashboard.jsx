import React, { useState, useEffect } from "react";
import "./dashboard.css";
import AdoptPopup from "../../components/AdoptPopup/AdoptPopup";
import AddDog from "../../components/AddDog/AddDog"; // Import the new component
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [searchBreed, setSearchBreed] = useState("");
  const [searchCounty, setSearchCounty] = useState("");
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [showAdoptPopup, setShowAdoptPopup] = useState(false);
  const [showAddDogPopup, setShowAddDogPopup] = useState(false); // State for the add dog popup
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchDogs = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/dogs/`);
      const data = await response.json();
      setFilteredDogs(data);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/dogs/`);
        const data = await response.json();
        const filtered = data.filter(
          (dog) =>
            (searchBreed === "" || dog.breed === searchBreed) &&
            (searchCounty === "" || dog.county === searchCounty)
        );
        setFilteredDogs(filtered);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };

    fetchDogs();
  }, [searchBreed, searchCounty]);

  const handleAdoptClick = () => {
    setShowAdoptPopup(true);
  };

  const handleCloseAdoptPopup = () => {
    setShowAdoptPopup(false);
  };

  const handleAddDogClick = () => {
    setShowAddDogPopup(true);
  };

  const handleCloseAddDogPopup = () => {
    setShowAddDogPopup(false);
  };

  const handleDogsUpdate = (updatedDogs) => {
    setFilteredDogs(updatedDogs);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Find a PawfectMatch here</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <p>Adopt a dog which you love the most</p>
      <div className="search-bar">
        <select
          onChange={(e) => setSearchBreed(e.target.value)}
          value={searchBreed}
        >
          <option value="">All Breed</option>
          <option value="Labrador">Labrador</option>
          <option value="Beagle">Beagle</option>
          <option value="German Shepherd">German Shepherd</option>
          <option value="Bulldog">Bulldog</option>
        </select>
        <select
          onChange={(e) => setSearchCounty(e.target.value)}
          value={searchCounty}
        >
          <option value="">All County</option>
          <option value="Dublin">Dublin</option>
          <option value="Cork">Cork</option>
          <option value="Galway">Galway</option>
          <option value="Limerick">Limerick</option>
        </select>
      </div>
      <div className="adopt-card-container">
        {filteredDogs.map((dog, index) => (
          <div className="card" key={index}>
            <img src={dog.image} alt={dog.name} />
            <h3>{dog.name}</h3>
            <p>Breed: {dog.breed}</p>
            <p>County: {dog.county}</p>
            <button onClick={handleAdoptClick}>Adopt</button>
          </div>
        ))}
      </div>
      {showAdoptPopup && <AdoptPopup onClose={handleCloseAdoptPopup} />}
      {showAddDogPopup && (
        <AddDog
          onClose={handleCloseAddDogPopup}
          onDogsUpdate={handleDogsUpdate}
        />
      )}
      <button className="add-dog-button" onClick={handleAddDogClick}>
        +
      </button>
    </div>
  );
};

export default Dashboard;
