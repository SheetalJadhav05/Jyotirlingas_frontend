import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/admin.css";

// Components
import AdminJyotirlinga from "./AdminJyotirlinga";
import AdminGallery from "./AdminGallery";
import AdminBlog from "./AdminBlog";
import AdminContact from "./AdminContact";

// Services
import { getBlogs } from "../../services/blogService";
import { getGallery } from "../../services/galleryService";
import { getContacts } from "../../services/contactService";

const AdminDashboard = () => {
  const [active, setActive] = useState("home");
  const [counts, setCounts] = useState({ blogs: 0, gallery: 0, messages: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!user || !token || !user?.isAdmin) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const results = await Promise.allSettled([
          getBlogs(),
          getGallery(),
          getContacts(),
        ]);
        setCounts({
          blogs:
            results[0].status === "fulfilled"
              ? results[0].value.data?.data?.length || 0
              : 0,
          gallery:
            results[1].status === "fulfilled"
              ? results[1].value.data?.data?.length || 0
              : 0,
          messages:
            results[2].status === "fulfilled"
              ? results[2].value.data?.data?.length || 0
              : 0,
        });
      } catch (error) {
        console.error("Stats Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      {/* Sidebar ko wahi props mil rahe hain */}
      <AdminSidebar active={active} onSelect={setActive} onLogout={logout} />

      <main className="admin-main">
        {/* Is class name ko check karein aapki CSS mein kya hai */}
        <h1 className="admin-page-title">Admin Dashboard</h1>

        {active === "home" && (
          <div>
            {/* WELCOME CARD - Original Class Names */}
            <div className="admin-card">
              <div className="welcome-header">
                <div>
                  <h2>Welcome Admin 👋</h2>
                  <p style={{ color: "#666", marginTop: "0.5rem" }}>
                    Manage your content and track updates from your dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* STATS GRID - Original Class Names */}
            <div className="admin-card-grid">
              <div className="stat-card">
                <div
                  className="stat-icon"
                  style={{ backgroundColor: "#fef3c7" }}
                >
                  🗂️
                </div>
                <h3>Blogs</h3>
                <p className="stat-number">{loading ? "..." : counts.blogs}</p>
                <button
                  className="stat-btn"
                  onClick={() => setActive("postBlog")}
                >
                  Manage
                </button>
              </div>

              <div className="stat-card">
                <div
                  className="stat-icon"
                  style={{ backgroundColor: "#dbeafe" }}
                >
                  🖼️
                </div>
                <h3>Gallery</h3>
                <p className="stat-number">
                  {loading ? "..." : counts.gallery}
                </p>
                <button
                  className="stat-btn"
                  onClick={() => setActive("gallery")}
                >
                  Manage
                </button>
              </div>

              <div className="stat-card">
                <div
                  className="stat-icon"
                  style={{ backgroundColor: "#fecaca" }}
                >
                  💬
                </div>
                <h3>Messages</h3>
                <p className="stat-number">
                  {loading ? "..." : counts.messages}
                </p>
                <button
                  className="stat-btn"
                  onClick={() => setActive("contact")}
                >
                  View
                </button>
              </div>
            </div>

            {/* QUICK ACTIONS - Original Styles */}
            <div className="admin-card">
              <h3 style={{ marginBottom: "1rem", color: "#5b2e08" }}>
                Quick Actions
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "0.8rem",
                }}
              >
                <button
                  className="quick-action-btn"
                  onClick={() => setActive("postBlog")}
                >
                  📝 Write Blog
                </button>
                <button
                  className="quick-action-btn"
                  onClick={() => setActive("gallery")}
                >
                  📸 Add Gallery
                </button>
                <button
                  className="quick-action-btn"
                  onClick={() => setActive("contact")}
                >
                  📧 View Messages
                </button>
                <button
                  className="quick-action-btn"
                  onClick={() => setActive("jyotirlingas")}
                >
                  🏛️ Jyotirlingas
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Pages */}
        {active === "jyotirlingas" && <AdminJyotirlinga />}
        {active === "postBlog" && <AdminBlog />}
        {active === "gallery" && <AdminGallery />}
        {active === "contact" && <AdminContact />}
      </main>
    </div>
  );
};

export default AdminDashboard;
