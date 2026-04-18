import { useState, useEffect, useRef } from "react";
import { searchJyotirlinga, getAllJyotirlingas } from "../data/jyotirlingaData";

import MahadevImage from "../assets/images/Mahadev.jpg";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== "") {
      setFilteredResults(searchJyotirlinga(value));
      setShowDropdown(true);
    } else {
      setFilteredResults([]);
      setShowDropdown(false);
    }
  };

  const handleItemClick = (item) => {
    setShowDropdown(false);
    setSelectedItem(item);
  };

  const handleShowAll = () => {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setFilteredResults(getAllJyotirlingas());
      setShowDropdown(true);
    }
  };

  const handleInputFocus = () => {
    if (searchTerm.trim() === "") {
      setFilteredResults(getAllJyotirlingas());
    }
    setShowDropdown(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <>
      <section className="hero">
        <img src={MahadevImage} alt="Mahadev" className="hero-bg-image" />
        <div className="hero-content">
          <h1 className="hero-title">THE DIVINE TRAIL</h1>

          <p className="hero-subtitle">
            A Sacred Pilgrimage to the 12 Eternal Lights of Shiva
          </p>

          <div className="search-container" ref={searchRef}>
            <div className="search-box">
              <span>🔍</span>

              <input
                type="text"
                placeholder="Search Jyotirlinga..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
              />

              <button type="button" onClick={handleShowAll}>
                {showDropdown ? "▲" : "▼"}
              </button>

              {showDropdown && (
                <ul className="jyotirlinga-list">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                      <li key={item.id} onClick={() => handleItemClick(item)}>
                        {item.name} - {item.state}
                      </li>
                    ))
                  ) : (
                    <li>No results found</li>
                  )}
                </ul>
              )}
            </div>
          </div>

          <p className="hero-cta">Explore 12 sacred shrines across India</p>
        </div>
      </section>

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="close-btn"
              onClick={() => setSelectedItem(null)}
            >
              ✖
            </button>

            <h2>{selectedItem.name}</h2>

            <img src={selectedItem.image} alt={selectedItem.name} />

            <p>
              <strong>Location:</strong> {selectedItem.location}
            </p>
            <p>
              <strong>State:</strong> {selectedItem.state}
            </p>
            <p>
              <strong>Best Time:</strong> {selectedItem.bestTime}
            </p>
            <p>
              <strong>Significance:</strong> {selectedItem.significance}
            </p>

            <p>{selectedItem.fullDesc}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
