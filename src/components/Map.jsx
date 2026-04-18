import { useState } from "react";
import jyotirlingasVideo from "../assets/jyotirlingas.mp4";
import "../styles/map.css";

const Map = () => {
  const [selectedPlace, setSelectedPlace] = useState({
    name: "All of India",
    query: "India",
  });

  const places = [
    { name: "Somnath", query: "Somnath temple Gujarat" },
    { name: "Mallikarjuna", query: "Mallikarjuna temple Srisailam" },
    { name: "Mahakaleshwar", query: "Mahakaleshwar temple Ujjain" },
    { name: "Omkareshwar", query: "Omkareshwar temple" },
    { name: "Kedarnath", query: "Kedarnath temple" },
    { name: "Bhimashankar", query: "Bhimashankar temple" },
    { name: "Kashi Vishwanath", query: "Kashi Vishwanath temple" },
    { name: "Trimbakeshwar", query: "Trimbakeshwar temple" },
    { name: "Vaidyanath", query: "Vaidyanath temple" },
    { name: "Nageshwar", query: "Nageshwar temple" },
    { name: "Rameshwaram", query: "Rameshwaram temple" },
    { name: "Grishneshwar", query: "Grishneshwar temple" },
  ];

  return (
    <section className="map-section">
      {/* 🔥 HEADER */}
      <div className="map-header">
        <h2 className="unified-heading">Sacred Geography</h2>
        <p>Explore the location of all 12 sacred Jyotirlingas across India</p>
      </div>

      {/* 🔥 MAIN LAYOUT */}
      <div className="full-layout">
        {/* LEFT PANEL */}
        <div className="left-panel">
          {/* LIST */}
          <div className="map-list">
            <h3>Jyotirlinga Locations</h3>

            {places.map((item) => (
              <button
                key={item.name}
                className={`map-link-btn ${
                  selectedPlace.name === item.name ? "active" : ""
                }`}
                onClick={() => setSelectedPlace(item)}
              >
                📍 {item.name}
              </button>
            ))}
          </div>

          {/* MAP */}
          <div className="map-frame-wrapper">
            <iframe
              title="map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                selectedPlace.query,
              )}&z=6&output=embed`}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* RIGHT VIDEO PANEL */}
        <div className="video-panel">
          <video src={jyotirlingasVideo} autoPlay loop muted></video>
        </div>
      </div>
    </section>
  );
};

export default Map;
