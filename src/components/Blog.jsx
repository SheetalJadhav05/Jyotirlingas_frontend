import { useState, useEffect } from "react";
import axios from "axios";
import somnathImg from "../assets/images/somnath.webp";
import kedarnathImg from "../assets/images/kedarnath-dham.webp";
import mahakalImg from "../assets/images/Mahakal.jpg";
import omkareshwarImg from "../assets/images/omkareshwar-jyotirlinga.jpg";

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [dbBlogs, setDbBlogs] = useState([]);

  const staticBlogs = [
    {
      id: "s1",
      title: "Somnath Jyotirlinga Temple",
      location: "Gujarat",
      image: somnathImg,
      shortDesc:
        "Somnath Jyotirlinga located in Gujarat is believed to be the first...",
      fullDesc: "Full details about Somnath...",
    },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        if (res.data.success) {
          setDbBlogs(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const allBlogs = [
    ...dbBlogs.map((b) => ({
      id: b._id,
      title: b.title,
      location: b.location || "Pilgrimage Site",
      image: b.image ? `http://localhost:5000/${b.image}` : mahakalImg,
      shortDesc: b.content.substring(0, 100) + "...",
      fullDesc: b.content,
    })),
  ];

  return (
    <section className="blog-section">
      <h2 className="blog-heading unified-heading">LATEST BLOGS</h2>
      <div className="blog-container">
        {allBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img src={blog.image} alt={blog.title} />
            <h3>{blog.title}</h3>
            <div className="blog-meta">📍 {blog.location}</div>
            <p>{blog.shortDesc}</p>
            <button onClick={() => setSelectedBlog(blog)} className="read-btn">
              Read More
            </button>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <div className="blog-post-modal">
          <div className="blog-modal-content">
            <div className="blog-modal-header">
              <div>
                <h2>{selectedBlog.title}</h2>
                <p className="blog-modal-meta">📍 {selectedBlog.location}</p>
              </div>
              <button
                className="read-btn close-modal"
                onClick={() => setSelectedBlog(null)}
              >
                Close
              </button>
            </div>

            <div className="blog-modal-image">
              <img src={selectedBlog.image} alt={selectedBlog.title} />
            </div>

            <div className="blog-modal-text">
              <p>{selectedBlog.fullDesc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
