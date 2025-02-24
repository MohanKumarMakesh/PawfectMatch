import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onSignup={() => setShowSignup(true)}
              onLogin={() => setShowLogin(true)}
            />
          }
        />
        {/* Add more routes here */}
      </Routes>
      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}
    </Router>
  );
}

export default App;
