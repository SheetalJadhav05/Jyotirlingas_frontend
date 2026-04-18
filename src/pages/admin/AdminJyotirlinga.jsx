import { useState, useEffect } from "react";
import {
  getJyotirlingas,
  createJyotirlinga,
  deleteJyotirlinga,
  updateJyotirlinga,
} from "../../services/jyotirlingaService";
import "../../styles/admin.css";

const AdminJyotirlinga = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    state: "",
    description: "",
    significance: "",
    bestTime: "",
    howToReach: "",
    nearbyAttractions: "",
    image: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getJyotirlingas();
    setData(res.data.data);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key !== "image" || form[key]) {
        formData.append(key, form[key]);
      }
    });

    if (editId) {
      await updateJyotirlinga(editId, formData);
    } else {
      await createJyotirlinga(formData);
    }

    fetchData();

    setForm({
      name: "",
      location: "",
      state: "",
      description: "",
      significance: "",
      bestTime: "",
      howToReach: "",
      nearbyAttractions: "",
      image: null,
    });

    setEditId(null);
  };

  const deleteItem = async (id) => {
    await deleteJyotirlinga(id);
    fetchData();
  };

  const editItem = (item) => {
    setEditId(item._id);
    setForm({
      name: item.name,
      location: item.location,
      state: item.state,
      description: item.description,
      significance: item.significance,
      bestTime: item.bestTime,
      howToReach: item.howToReach || "",
      nearbyAttractions: item.nearbyAttractions || "",
      image: null, // Keep as null for editing, will only append if user selects new image
    });
  };

  return (
    <div className="jyotirlinga-container">
      <div className="jyotirlinga-header">
        <h1>🕉️ Manage Jyotirlingas</h1>
        <p>Discover and manage the sacred twelve Jyotirlingas of India</p>
      </div>

      {/* FORM */}
      <div className="jyotirlinga-form-section">
        <h2>✨ Add/Edit Jyotirlinga</h2>

        <form className="jyotirlinga-form-grid" onSubmit={addItem}>
          <div className="jyotirlinga-form-group">
            <label htmlFor="name">🏛️ Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter jyotirlinga name"
              required
            />
          </div>
          <div className="jyotirlinga-form-group">
            <label htmlFor="location">📍 Location</label>
            <input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />
          </div>
          <div className="jyotirlinga-form-group">
            <label htmlFor="state">🇮🇳 State</label>
            <input
              id="state"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />
          </div>

          <div className="jyotirlinga-form-group">
            <label htmlFor="bestTime">🗓️ Best Time to Visit</label>
            <input
              id="bestTime"
              name="bestTime"
              value={form.bestTime}
              onChange={handleChange}
              placeholder="e.g., October to March"
            />
          </div>

          <div className="jyotirlinga-form-group">
            <label htmlFor="description">� Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief description of the jyotirlinga"
              rows="3"
            />
          </div>

          <div className="jyotirlinga-form-group">
            <label htmlFor="significance">🙏 Spiritual Significance</label>
            <textarea
              id="significance"
              name="significance"
              value={form.significance}
              onChange={handleChange}
              placeholder="Spiritual importance and significance"
              rows="3"
            />
          </div>

          <div className="jyotirlinga-form-group">
            <label htmlFor="howToReach">🗺️ How to Reach</label>
            <textarea
              id="howToReach"
              name="howToReach"
              value={form.howToReach}
              onChange={handleChange}
              placeholder="Directions and transportation options"
              rows="3"
            />
          </div>

          <div className="jyotirlinga-form-group">
            <label htmlFor="nearbyAttractions">🎡 Nearby Attractions</label>
            <textarea
              id="nearbyAttractions"
              name="nearbyAttractions"
              value={form.nearbyAttractions}
              onChange={handleChange}
              placeholder="Nearby places of interest"
              rows="3"
            />
          </div>

          <div className="jyotirlinga-form-group">
            <label htmlFor="image">🖼️ Image</label>
            <input
              id="image"
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
          </div>

          <button type="submit" className="jyotirlinga-submit-btn">
            {editId ? "🔄 Update Jyotirlinga" : "➕ Add Jyotirlinga"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="jyotirlinga-table-section">
        <h2>📋 Jyotirlinga List</h2>

        {data.length === 0 ? (
          <div className="jyotirlinga-empty-state">
            <h3>🕉️ No Jyotirlingas Found</h3>
            <p>Add your first jyotirlinga using the form above</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="jyotirlinga-table">
              <thead>
                <tr>
                  <th>🖼️ Image</th>
                  <th>🏛️ Name</th>
                  <th>📍 Location</th>
                  <th>🇮🇳 State</th>
                  <th>🗓️ Best Time</th>
                  <th>⚙️ Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((i) => (
                  <tr key={i._id}>
                    <td>
                      {i.image ? (
                        <img
                          src={`http://localhost:5000${i.image}`}
                          alt={i.name}
                          style={{ maxWidth: "80px", height: "auto" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            background: "#e8d4b0",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "2rem",
                          }}
                        >
                          🕉️
                        </div>
                      )}
                    </td>

                    <td style={{ fontWeight: "600", color: "#5b2e08" }}>
                      {i.name}
                    </td>
                    <td>{i.location}</td>
                    <td>{i.state}</td>
                    <td>{i.bestTime || "Not specified"}</td>

                    <td className="jyotirlinga-actions">
                      <button
                        className="admin-edit-btn"
                        onClick={() => editItem(i)}
                        title="Edit this jyotirlinga"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="admin-delete-btn"
                        onClick={() => deleteItem(i._id)}
                        title="Delete this jyotirlinga"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJyotirlinga;
