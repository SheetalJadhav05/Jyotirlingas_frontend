import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BlogPostPage = () => {
  const [post, setPost] = useState({ title: "", content: "", location: "" });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  // ✅ IMAGE HANDLE FIX
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ SUBMIT TO DATABASE (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !currentUser) {
      setFeedback("❌ Please login first to submit a post.");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    if (!post.title || !post.content || !post.location) {
      setFeedback("⚠️ Please complete all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("location", post.location);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    setFeedback("Wait... Submitting to...");

    try {
      // 3. Backend API Call
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback("✅ Blog submitted successfully!");
        setPost({ title: "", content: "", location: "" });
        setImageFile(null);
        setPreview("");

        setTimeout(() => navigate("/blog"), 2000);
      } else {
        setFeedback("❌ Error: " + (data.message || "Failed to post"));
      }
    } catch (err) {
      console.error(err);
      setFeedback("❌ Server Connection Failed! Check if backend is running.");
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="blog-post-page"
        style={{ padding: "2rem", maxWidth: "750px", margin: "auto" }}
      >
        <h1>Post a New Blog</h1>
        <p>Complete the form and submit your temple story to the website.</p>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Blog title"
            required
          />

          <input
            value={post.location}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            placeholder="Location (e.g. Gujarat, India)"
            required
          />

          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder="Blog content"
            rows={8}
            required
          ></textarea>

          <label style={{ display: "block", marginBottom: "10px" }}>
            Upload Temple Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          {preview && (
            <div style={{ marginTop: "15px" }}>
              <p>Image Preview:</p>
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
          )}

          <button
            className="read-btn"
            type="submit"
            style={{ marginTop: "20px" }}
          >
            Submit Blog
          </button>
        </form>

        {feedback && (
          <p
            style={{
              marginTop: "15px",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: feedback.includes("✅") ? "#e6fffa" : "#fff5f5",
              color: feedback.includes("✅") ? "#2c7a7b" : "#c53030",
              border: feedback.includes("✅")
                ? "1px solid #b2f5ea"
                : "1px solid #feb2b2",
            }}
          >
            {feedback}
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default BlogPostPage;
