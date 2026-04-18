import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

const BlogPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    if (currentUser) {
      if (currentUser?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/blog-post");
      }
    } else {
      setIsAuthOpen(true);
    }
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthOpen(false);
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    if (currentUser?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/blog-post");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "2rem" }}>
        <Blog />
      </div>

      <div
        className="view-more-wrapper"
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <button className="read-btn" onClick={handleViewMoreClick}>
          Post Blog
        </button>
      </div>

      <LoginModal
        isOpen={isAuthOpen}
        onClose={handleCloseAuth}
        onLoginSuccess={handleLoginSuccess}
      />

      <Footer />
    </>
  );
};

export default BlogPage;
