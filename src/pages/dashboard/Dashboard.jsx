import { useState, useEffect } from "react";
import "./dashboard.css";
import AdoptPopup from "../../components/AdoptPopup/AdoptPopup";
import EditDogPopup from "../../components/EditDogPopup/EditDogPopup";
import AddDog from "../../components/AddDog/AddDog"; // Import the new component
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import the delete icon

const Dashboard = () => {
  const [searchBreed, setSearchBreed] = useState("");
  const [searchCounty, setSearchCounty] = useState("");
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [showAdoptPopup, setShowAdoptPopup] = useState(false);
  const [showAddDogPopup, setShowAddDogPopup] = useState(false); // State for the add dog popup
  const [currentUserId, setCurrentUserId] = useState(null); // State for the current user ID
  const [editingDog, setEditingDog] = useState(null); // State for the dog being edited
  const [showEditPopup, setShowEditPopup] = useState(false); // State for the edit popup
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
    // Fetch the current user ID from local storage or an API
    const userId = localStorage.getItem("user_id");
    setCurrentUserId(userId);

    fetchDogs();
  }, []);

  const handleEditDog = (dog) => {
    setEditingDog(dog); // Set the dog being edited
    setShowEditPopup(true); // Show the edit popup
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
    setEditingDog(null); // Clear the editing dog state
  };

  const handleSaveEdit = async (updatedDog) => {
    try {
      await fetch(`${baseUrl}/api/dogs/${updatedDog.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDog),
      });
      fetchDogs(); // Refresh the dog list after saving
      handleCloseEditPopup(); // Close the edit popup
    } catch (error) {
      console.error("Error updating dog:", error);
    }
  };
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
    localStorage.removeItem("user_id");
    navigate("/");
  };

  const handleDeleteDog = async (dogId) => {
    try {
      await fetch(`${baseUrl}/api/dogs/delete/${dogId}/`, {
        method: "DELETE",
        
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      fetchDogs(); // Refresh the dog list after deletion
    } catch (error) {
      console.error("Error deleting dog:", error);
    }
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

          < div className="card" key={index} >
            <img src={dog.image} alt={dog.name} />
            <h3>{dog.name}</h3>
            <p>Breed: {dog.breed}</p>
            <p>County: {dog.county}</p>
            <button onClick={handleAdoptClick}>Adopt</button>
            {dog.userId === currentUserId && (
              <>
                <button
                  className="edit-button"
                  onClick={() => handleEditDog(dog)}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteDog(dog.id)}
                >
                  <FaTrash />
                </button>
              </>
            {String(dog.user) === String(currentUserId) && ( // Ensure both are strings
              <button
                className="delete-button"
                onClick={() => handleDeleteDog(dog.id)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
      {showEditPopup && editingDog && (
        <EditDogPopup
          dog={editingDog}
          onClose={handleCloseEditPopup}
          onSave={handleSaveEdit}
        />
      )}
      {showAdoptPopup && <AdoptPopup onClose={handleCloseAdoptPopup} />}
      {
        showAddDogPopup && (
          <AddDog
            onClose={handleCloseAddDogPopup}
            onDogsUpdate={handleDogsUpdate}
            userId={currentUserId}
          />
        )
      }
      <button className="add-dog-button" onClick={handleAddDogClick}>
        +
      </button>
    </div >
  );
};

export default Dashboard;
