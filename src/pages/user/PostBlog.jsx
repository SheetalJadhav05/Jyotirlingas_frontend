import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "./UserLayout";

const PostBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("location", location);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(
        "https://jyotirlingas-backend.vercel.app/api/blogs",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Blog Posted Successfully!");
        navigate("/blog");
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      alert("❌ Server issue. Check if backend is running.");
    }
  };

  return (
    <UserLayout>
      <div style={{ padding: "2rem" }}>
        <h2>Post a New Blog</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            placeholder="Temple Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location (e.g. Gujarat, India)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <textarea
            placeholder="Detailed description..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            required
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <button type="submit" className="read-btn">
            Submit Post
          </button>
        </form>
      </div>
    </UserLayout>
  );
};

export default PostBlog;
