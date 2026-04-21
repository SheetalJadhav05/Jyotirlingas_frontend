import { useEffect, useState, useCallback } from "react";
import UserLayout from "./UserLayout";
import "../../styles/user.css";

const ManagePost = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState(""); // ✅ New state
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState({
    show: false,
    message: "",
    type: "",
  });

  const fetchBlogs = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);

    setLoading(true);
    try {
      const res = await fetch(
        "https://jyotirlingas-backend.vercel.app/api/blogs/my-blogs",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("location", location);
    if (image) formData.append("image", image);

    const url = editId
      ? `https://jyotirlingas-backend.vercel.app/api/blogs/${editId}`
      : "https://jyotirlingas-backend.vercel.app/api/blogs";

    setSubmitting(true);
    try {
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        setSuccessModal({
          show: true,
          message: editId
            ? "Your spiritual post has been updated successfully! ✨"
            : "Your spiritual post has been created successfully! 🕉️",
          type: "success",
        });
        resetForm();
        fetchBlogs();
      }
    } catch (err) {
      alert("Error saving post");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setLocation("");
    setImage(null);
    setEditId(null);
  };

  const editBlog = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setLocation(blog.location || ""); // ✅ Set location for edit
    setEditId(blog._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://jyotirlingas-backend.vercel.app/api/blogs/${blogId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        setSuccessModal({
          show: true,
          message: "Your spiritual post has been deleted successfully! 🗑️",
          type: "delete",
        });
        fetchBlogs();
      }
    } catch (err) {
      alert("Error deleting post");
    }
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <UserLayout>
      <div className="manage-posts-container">
        {/* Enhanced Header */}
        <div className="manage-posts-header">
          <h2>📝 Manage Your Spiritual Posts</h2>
          <p>
            Share your experiences and knowledge about the divine Jyotirlingas
          </p>
        </div>

        {/* Enhanced Form Card */}
        <div className="manage-form-card">
          <h3 className="manage-form-title">
            {editId ? "✏️ Edit Your Post" : "✨ Create New Post"}
          </h3>
          <form className="manage-form" onSubmit={handleSubmit}>
            <div className="manage-form-group">
              <label htmlFor="title">Temple Name</label>
              <input
                id="title"
                type="text"
                placeholder="e.g. Somnath Temple"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="manage-form-group">
              <label htmlFor="location">📍 Location</label>
              <input
                id="location"
                type="text"
                placeholder="e.g. Gujarat, India"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="manage-form-group full-width">
              <label htmlFor="content">📖 Story & History</label>
              <textarea
                id="content"
                placeholder="Share the divine story, history, and significance of this Jyotirlinga..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={6}
              />
            </div>
            <div className="manage-form-group full-width">
              <div className="file-upload-group">
                <div className="file-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="file-input"
                    id="image-upload"
                  />
                  <div className="file-upload-text">Upload Temple Image</div>
                  <div className="file-upload-subtext">
                    Click to browse or drag and drop
                  </div>
                </div>
                {image && (
                  <div className="selected-file">📎 Selected: {image.name}</div>
                )}
              </div>
            </div>
            <div className="manage-form-group full-width">
              <button
                type="submit"
                className="manage-submit-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <div className="spinner"></div>
                    {editId ? "Updating..." : "Posting..."}
                  </>
                ) : (
                  <>{editId ? "✏️ Update Post" : "📝 Post Blog"}</>
                )}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="cancel-btn"
                >
                  ❌ Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Enhanced Search */}
        <div className="manage-search-container">
          <div className="search-icon">🔍</div>
          <input
            className="manage-search"
            placeholder="Search your posts by temple name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Enhanced Table */}
        <div className="manage-table-card">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <div className="loading-text">
                Loading your spiritual posts...
              </div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3 className="empty-title">No Posts Yet</h3>
              <p className="empty-description">
                Start sharing your knowledge about the divine Jyotirlingas with
                the community.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="create-first-btn"
              >
                ✏️ Create Your First Post
              </button>
            </div>
          ) : (
            <table className="manage-table">
              <thead>
                <tr>
                  <th>🖼️ Image</th>
                  <th>🏛️ Temple Info</th>
                  <th>⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      <div className="table-image-container">
                        <img
                          src={`https://jyotirlingas-backend.vercel.app/${blog.image}`}
                          alt={blog.title}
                          className="table-image"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/70x70?text=No+Image")
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="temple-info">
                        <div className="temple-title">{blog.title}</div>
                        <div className="temple-location">
                          📍 {blog.location}
                        </div>
                        <div className="temple-date">
                          📅{" "}
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        className="manage-edit-btn"
                        onClick={() => editBlog(blog)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="manage-delete-btn"
                        onClick={() => deleteBlog(blog._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Success Modal */}
        {successModal.show && (
          <div
            className="success-modal-overlay"
            onClick={() =>
              setSuccessModal({ show: false, message: "", type: "" })
            }
          >
            <div className="success-modal" onClick={(e) => e.stopPropagation()}>
              <div className="success-modal-icon">
                {successModal.type === "delete" ? "🗑️" : "✨"}
              </div>
              <h3 className="success-modal-title">
                {successModal.type === "delete" ? "Post Deleted!" : "Success!"}
              </h3>
              <p className="success-modal-message">{successModal.message}</p>
              <button
                className="success-modal-btn"
                onClick={() =>
                  setSuccessModal({ show: false, message: "", type: "" })
                }
              >
                Continue ✋
              </button>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default ManagePost;
