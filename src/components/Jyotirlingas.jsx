import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/jyotirlingas.css";

const Jyotirlingas = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://jyotirlingas-backend.vercel.app/api/jyotirlingas",
        );
        setData(res.data.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ FILTER
  const filtered = data.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.location.toLowerCase().includes(search.toLowerCase()) ||
      i.state.toLowerCase().includes(search.toLowerCase()),
  );

  const visible = showAll ? filtered : filtered.slice(0, 6);

  const closeModal = () => {
    setSelected(null);
    document.body.classList.remove("modal-open");
  };

  return (
    <>
      <div className="main-container">
        <h1 className="page-title page-heading unified-heading">
          12 Sacred Jyotirlingas
        </h1>
        <p className="page-subtitle">
          Explore the divine pilgrimage sites of Lord Shiva
        </p>

        {/* SEARCH */}
        <div className="search-container">
          <input
            className="search-input"
            placeholder="🔍 Search by name, location, or state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* LOADING */}
        {loading && <p className="loading-text">Loading Jyotirlingas...</p>}

        {/* CARDS */}
        <div className="jyotirlingas-grid">
          {visible.map((j) => (
            <div key={j._id} className="jyotirlinga-card">
              <div className="card-img-container">
                <img
                  src={`http://localhost:5000${j.image}`}
                  alt={j.name}
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/400x250")
                  }
                />
              </div>

              <div className="card-body">
                <h3>{j.name}</h3>
                <p>
                  📍 {j.location}, {j.state}
                </p>

                <p>
                  {j.description ? j.description.substring(0, 80) + "..." : ""}
                </p>

                <button
                  className="btn"
                  onClick={() => {
                    setSelected(j);
                    document.body.classList.add("modal-open");
                  }}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* NO DATA */}
        {!loading && filtered.length === 0 && (
          <div className="no-data-container">
            <p className="no-data">😔 No Jyotirlingas found</p>
            <p className="no-data-hint">Try adjusting your search terms</p>
          </div>
        )}

        {/* VIEW MORE BUTTON */}
        {!loading && filtered.length > 6 && (
          <div className="view-more-container">
            <button
              className="btn-view-more"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "📍 Show Less" : "📍 View All Jyotirlingas"}
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-header">
              <h2 className="modal-title">🕉️ {selected.name}</h2>
            </div>

            <img
              src={`http://localhost:5000${selected.image}`}
              className="modal-img"
              alt={selected.name}
            />

            <div className="modal-info">
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div className="info-content">
                  <p className="info-label">Location</p>
                  <p className="info-value">{selected.location}</p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">🏛️</span>
                <div className="info-content">
                  <p className="info-label">State</p>
                  <p className="info-value">{selected.state}</p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">📅</span>
                <div className="info-content">
                  <p className="info-label">Best Time to Visit</p>
                  <p className="info-value">{selected.bestTime}</p>
                </div>
              </div>
            </div>

            <div className="modal-divider"></div>

            <div className="modal-section">
              <div className="section-header">
                <span className="section-icon">📖</span>
                <h3 className="section-title">Description</h3>
              </div>
              <p className="section-content">{selected.description}</p>
            </div>

            <div className="modal-section">
              <div className="section-header">
                <span className="section-icon">✨</span>
                <h3 className="section-title">Spiritual Significance</h3>
              </div>
              <p className="section-content">{selected.significance}</p>
            </div>

            <div className="modal-section">
              <div className="section-header">
                <span className="section-icon">🗺️</span>
                <h3 className="section-title">How to Reach</h3>
              </div>
              <p className="section-content" style={{ whiteSpace: "pre-line" }}>
                {selected.howToReach || "Information not available"}
              </p>
            </div>

            <div className="modal-section">
              <div className="section-header">
                <span className="section-icon">🎡</span>
                <h3 className="section-title">Nearby Attractions</h3>
              </div>
              <p className="section-content" style={{ whiteSpace: "pre-line" }}>
                {selected.nearbyAttractions || "Information not available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Jyotirlingas;
