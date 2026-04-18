import { useState, useEffect } from "react";
import api from "../../services/api";

const AdminGallery = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ title: "", image: null });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/gallery");
      setData(res.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title) {
      alert("Please enter a title");
      return;
    }

    if (!editId && !form.image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    if (form.image) formData.append("image", form.image);

    try {
      setLoading(true);
      let newData;

      if (editId) {
        await api.put(`/gallery/${editId}`, formData);
        newData = data.map((i) =>
          i._id === editId ? { ...i, title: form.title } : i,
        );
        setSuccessMsg("✅ Gallery image updated successfully!");
        setEditId(null);
      } else {
        const res = await api.post("/gallery", formData);
        newData = [res.data.data, ...data];
        setSuccessMsg("✅ Gallery image added successfully!");
      }

      setData(newData);
      setForm({ title: "", image: null });
      e.target.reset();
    } catch (err) {
      console.error("Error saving:", err);
      alert("Error: " + (err.response?.data?.message || "Server Error"));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      setLoading(true);
      await api.delete(`/gallery/${id}`);
      setData(data.filter((i) => i._id !== id));
      setSuccessMsg("✅ Gallery image deleted successfully!");
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Error deleting image");
    } finally {
      setLoading(false);
    }
  };

  const editItem = (item) => {
    setEditId(item._id);
    setForm({ title: item.title, image: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ title: "", image: null });
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      {/* Success Message */}
      {successMsg && (
        <div
          style={{
            background: "#dcfce7",
            border: "2px solid #22c55e",
            color: "#166534",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {successMsg}
        </div>
      )}

      {/* Header Card */}
      <div className="admin-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ color: "#5b2e08", margin: 0 }}>🖼️ Gallery</h2>
            <p style={{ color: "#666", marginTop: "0.5rem", marginBottom: 0 }}>
              Total: <strong>{data.length}</strong> images
            </p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            style={{
              background: "#6b7280",
              color: "#fff",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="admin-card">
        <h3 style={{ color: "#5b2e08", marginTop: 0 }}>
          {editId ? "✏️ Edit Gallery Image" : "➕ Add New Image"}
        </h3>

        <form onSubmit={handleSubmit} className="admin-form">
          <input
            placeholder="Image Title (e.g., Temple Front View)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            disabled={loading}
            required
          />

          <div
            style={{
              border: "2px solid #e8d4b0",
              borderRadius: "9px",
              padding: "1rem",
            }}
          >
            <label
              style={{
                fontWeight: "600",
                color: "#5b2e08",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              🖼️ Select Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              disabled={loading}
              required={!editId}
              style={{
                width: "100%",
                padding: "0.5rem",
                cursor: "pointer",
              }}
            />
            {form.image && (
              <p
                style={{
                  marginTop: "0.5rem",
                  color: "#22c55e",
                  fontSize: "0.9rem",
                }}
              >
                ✅ {form.image.name}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="submit" disabled={loading} style={{ flex: 1 }}>
              {loading ? "Processing..." : editId ? "💾 Update" : "➕ Add"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                disabled={loading}
                style={{
                  flex: 1,
                  background: "#6b7280",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Search Card */}
      <div className="admin-card">
        <input
          type="text"
          placeholder="🔍 Search by image title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search"
          style={{ width: "100%", boxSizing: "border-box" }}
        />
      </div>

      {/* Gallery Card */}
      <div className="admin-card">
        {loading && (
          <p
            style={{ textAlign: "center", color: "#d97706", fontWeight: "600" }}
          >
            ⏳ Loading...
          </p>
        )}

        {!loading && filteredData.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#999",
              padding: "2rem",
              fontStyle: "italic",
            }}
          >
            {data.length === 0
              ? "No images found. Start by adding your first gallery image! 🖼️"
              : "No results found. Try different search terms."}
          </p>
        ) : (
          <div>
            {/* Grid View */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              {filteredData.map((item) => (
                <div key={item._id} className="admin-gallery-item">
                  {/* Image */}
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.title}
                    className="admin-gallery-image"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/200x150?text=Error";
                    }}
                  />

                  {/* Info */}
                  <div className="admin-gallery-item-info">
                    <p>{item.title}</p>
                  </div>

                  {/* Buttons */}
                  <div className="admin-gallery-actions">
                    <button
                      className="admin-edit-btn admin-action-btn"
                      onClick={() => editItem(item)}
                      disabled={loading}
                      title="Edit this image"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="admin-delete-btn admin-action-btn"
                      onClick={() => handleDelete(item._id)}
                      disabled={loading}
                      title="Delete this image"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Count Info */}
            {!loading && data.length > 0 && (
              <p
                style={{
                  textAlign: "center",
                  color: "#999",
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                Showing {filteredData.length} of {data.length} images
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
