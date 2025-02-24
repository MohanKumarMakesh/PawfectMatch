import React, { useState } from "react";
import DOMPurify from "dompurify";
import "./signup.css";

const Signup = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@(gmail\.com|outlook\.com|yahoo\.com)$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!validateEmail(email)) {
      setError("Email must be a valid Gmail, Outlook, or Yahoo address");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and contain both letters and numbers"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Prevent XSS by sanitizing inputs
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    // Handle sign-up logic here (e.g., send data to the server)
    console.log("Sanitized Email:", sanitizedEmail);
    console.log("Sanitized Password:", sanitizedPassword);

    // Close the modal after successful sign-up
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <a href="#login" onClick={onLogin}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
