import React, { useRef } from "react";
import { useSwipeable } from "react-swipeable";
import "./about.css";
import teamImage from "../../assets/dog-love.jpg"; // Adjust the path to your image
import missionImage from "../../assets/dog-run.jpg"; // Adjust the path to your image
import dogCare from "../../assets/dog-care.jpg"; // Adjust the path to your image
import dogVet from "../../assets/dog-vet.jpg"; // Adjust the path to your image

const About = () => {
  const cardContainerRef = useRef(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      cardContainerRef.current.scrollBy({
        left: cardContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    },
    onSwipedRight: () => {
      cardContainerRef.current.scrollBy({
        left: -cardContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="about-container" id="about">
      <h1>About PawfectMatch</h1>
      <div className="card-container" ref={cardContainerRef} {...handlers}>
        <div className="card">
          <img src={teamImage} alt="Our Team" className="card-image" />
          <div className="card-content">
            <h2>Our Team</h2>
            <p>
              Our dedicated team is passionate about animal welfare and works
              tirelessly to connect pets with loving homes. We are here to
              support you throughout the adoption process.
            </p>
          </div>
        </div>
        <div className="card">
          <img src={missionImage} alt="Our Mission" className="card-image" />
          <div className="card-content">
            <h2>Our Mission</h2>
            <p>
              At PawfectMatch, our mission is to ensure every pet finds a
              forever home. We collaborate with shelters and rescue
              organizations to bring you a wide selection of pets in need of
              adoption.
            </p>
          </div>
        </div>
        <div className="card">
          <img src={dogVet} alt="Veterinary Care" className="card-image" />
          <div className="card-content">
            <h2>Veterinary Care</h2>
            <p>
              We prioritize the health and well-being of every pet. Our
              veterinary care team provides regular check-ups, vaccinations, and
              medical treatments to ensure that all pets are healthy and ready
              for adoption.
            </p>
          </div>
        </div>
        <div className="card">
          <img src={dogCare} alt="Dog Care" className="card-image" />
          <div className="card-content">
            <h2>Dog Care</h2>
            <p>
              Our comprehensive dog care program includes grooming, training,
              and socialization. We ensure that every dog is well-cared for and
              prepared to join their new family with confidence and joy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
