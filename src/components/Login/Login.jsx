import React, { useState } from "react";
import DOMPurify from "dompurify";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../../firebaseConfig.js"; // Ensure Firebase is initialized

const baseUrl = import.meta.env.VITE_BASE_URL;
const env = import.meta.env.VITE_ENV;

const Login = ({ onClose, onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@(gmail\.com|outlook\.com|yahoo\.com)$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const handleLogin = async (e) => {
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

    // Prevent XSS by sanitizing inputs
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    // Firebase login
    const auth = getAuth();
    try {
      if (env === "development") {
        // Bypass login validation in development mode
        localStorage.setItem("access_token", "dev_access_token");
        localStorage.setItem("refresh_token", "dev_refresh_token");
        onClose();
        navigate("/dashboard");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          sanitizedEmail,
          sanitizedPassword
        );
        const idToken = await userCredential.user.getIdToken();
        const response = await fetch(`${baseUrl}/api/user/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("access_token", data.tokens.access);
          localStorage.setItem("refresh_token", data.tokens.refresh);
          onClose();
          navigate("/dashboard");
        } else {
          throw new Error(data.error || "Login failed");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      if (env === "development") {
        // Bypass login validation in development mode
        localStorage.setItem("access_token", "dev_access_token");
        localStorage.setItem("refresh_token", "dev_refresh_token");
        onClose();
        navigate("/dashboard");
      } else {
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();
        const response = await fetch(`${baseUrl}/api/user/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("access_token", data.tokens.access);
          localStorage.setItem("refresh_token", data.tokens.refresh);
          onClose();
          navigate("/dashboard");
        } else {
          throw new Error(data.error || "Login with Google failed");
        }
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      setError("Failed to log in with Google. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Log In</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit">Log In</button>
        </form>
        <button className="google-login" onClick={handleGoogleLogin}>
          Log in with Google
        </button>
        <p className="signup-link">
          Don't have an account?{" "}
          <a href="#signup" onClick={onSignup}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
