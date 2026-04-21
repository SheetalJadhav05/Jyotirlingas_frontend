import { useState, useEffect } from "react";
import api from "../../services/api";

const AdminBlog = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", location: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
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
      const res = await api.get("/blogs");
      setData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching blogs", err);
      alert("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.location) {
      alert("Please fill all fields");
      return;
    }

    if (!editId && !image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("location", form.location);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      let newData;

      if (editId) {
        const res = await api.put(`/blogs/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        newData = data.map((i) => (i._id === editId ? res.data.data : i));
        setSuccessMsg("✅ Blog updated successfully!");
        setEditId(null);
      } else {
        const res = await api.post("/blogs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        newData = [res.data.data, ...data];
        setSuccessMsg("✅ Blog added successfully!");
      }

      setData(newData);
      setForm({ title: "", content: "", location: "" });
      setImage(null);
    } catch (err) {
      console.error("Error saving blog", err);
      alert("Error saving blog");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      setLoading(true);
      await api.delete(`/blogs/${id}`);
      setData(data.filter((i) => i._id !== id));
      setSuccessMsg("✅ Blog deleted successfully!");
    } catch (err) {
      console.error("Error deleting blog", err);
      alert("Error deleting blog");
    } finally {
      setLoading(false);
    }
  };

  const editItem = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title,
      content: item.content,
      location: item.location,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ title: "", content: "", location: "" });
    setImage(null);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.content &&
        item.content.toLowerCase().includes(searchTerm.toLowerCase())),
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
            <h2 style={{ color: "#5b2e08", margin: 0 }}>📝 Temple Blogs</h2>
            <p style={{ color: "#666", marginTop: "0.5rem", marginBottom: 0 }}>
              Total: <strong>{data.length}</strong> blogs published
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
          {editId ? "✏️ Edit Blog Post" : "➕ Post New Temple Blog"}
        </h3>

        <form className="admin-form" onSubmit={addItem}>
          <input
            placeholder="Temple Name (Title)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            disabled={loading}
            required
          />

          <input
            placeholder="Location (e.g., Madhya Pradesh)"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            disabled={loading}
            required
          />

          <textarea
            placeholder="Detailed History/Story"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            disabled={loading}
            required
            rows={5}
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
              🖼️ Temple Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              disabled={loading}
              required={!editId}
              style={{
                width: "100%",
                padding: "0.5rem",
                cursor: "pointer",
              }}
            />
            {image && (
              <p
                style={{
                  marginTop: "0.5rem",
                  color: "#22c55e",
                  fontSize: "0.9rem",
                }}
              >
                ✅ {image.name}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="submit" disabled={loading} style={{ flex: 1 }}>
              {loading
                ? "Processing..."
                : editId
                  ? "💾 Update Blog"
                  : "➕ Add Blog"}
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
          placeholder="🔍 Search by title, location, or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search"
          style={{ width: "100%", boxSizing: "border-box" }}
        />
      </div>

      {/* Table Card */}
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
              ? "No blogs found. Start by adding your first temple blog! 📝"
              : "No results found. Try different search terms."}
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr style={{ background: "#f9f5f0" }}>
                  <th style={{ fontWeight: "700", color: "#5b2e08" }}>Image</th>
                  <th style={{ fontWeight: "700", color: "#5b2e08" }}>
                    Title & Location
                  </th>
                  <th style={{ fontWeight: "700", color: "#5b2e08" }}>
                    Author
                  </th>
                  <th style={{ fontWeight: "700", color: "#5b2e08" }}>Date</th>
                  <th style={{ fontWeight: "700", color: "#5b2e08" }}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((i) => (
                  <tr key={i._id}>
                    <td>
                      <img
                        src={`https://jyotirlingas-backend.vercel.app/${i.image}`}
                        alt="temple"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "2px solid #e8d4b0",
                        }}
                      />
                    </td>
                    <td>
                      <strong style={{ color: "#5b2e08" }}>{i.title}</strong>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "#d97706",
                          marginTop: "0.3rem",
                        }}
                      >
                        📍 {i.location}
                      </div>
                    </td>
                    <td
                      style={{
                        fontSize: "0.9rem",
                        color: "#444",
                        fontWeight: "500",
                      }}
                    >
                      {i.userId ? i.userId.name : "Admin"}
                    </td>
                    <td style={{ fontSize: "0.85rem", color: "#666" }}>
                      {new Date(i.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.4rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          className="admin-edit-btn"
                          onClick={() => editItem(i)}
                          disabled={loading}
                          title="Edit this blog"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="admin-delete-btn"
                          onClick={() => deleteItem(i._id)}
                          disabled={loading}
                          title="Delete this blog"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && data.length > 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#999",
              marginTop: "1rem",
              fontSize: "0.9rem",
            }}
          >
            Showing {filteredData.length} of {data.length} blogs
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
