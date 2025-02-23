import React from "react";
import "./contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="contact-container" id="contact">
      <div className="contact-content">
        <div className="contact-social">
          <h2>Follow Us</h2>
          <ul>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} className="social-icon" />{" "}
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} className="social-icon" />{" "}
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className="social-icon" />{" "}
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="info-icon" />{" "}
            pawfectmatch@trust.com
          </p>
          <p>1234 Fake Street, Dublin, Ireland</p>
        </div>
        <div className="useful-links">
          <h2>Useful Links</h2>
          <ul>
            <li>
              <a
                href="https://www.petfinder.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Petfinder
              </a>
            </li>
            <li>
              <a
                href="https://www.aspca.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                ASPCA
              </a>
            </li>
            <li>
              <a
                href="https://www.humanesociety.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Humane Society
              </a>
            </li>
          </ul>
        </div>
      </div>
      <footer className="contact-footer">
        <p>&copy; 2025 PawfectMatch. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
