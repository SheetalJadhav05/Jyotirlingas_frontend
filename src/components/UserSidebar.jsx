import { Link, useLocation } from "react-router-dom";
import "../styles/user.css";

const UserSidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">🕉️</span>
          <span className="logo-text">Divine Journey</span>
        </div>
        <p className="sidebar-subtitle">User Panel</p>
      </div>

      <ul className="sidebar-menu">
        <li className={location.pathname === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard">
            <span className="menu-icon">🏠</span>
            <span className="menu-text">Home</span>
          </Link>
        </li>

        <li
          className={
            location.pathname === "/dashboard/manage-post" ? "active" : ""
          }
        >
          <Link to="/dashboard/manage-post">
            <span className="menu-icon">📝</span>
            <span className="menu-text">Manage Posts</span>
          </Link>
        </li>

        <li
          className={
            location.pathname === "/dashboard/change-password" ? "active" : ""
          }
        >
          <Link to="/dashboard/change-password">
            <span className="menu-icon">🔒</span>
            <span className="menu-text">Change Password</span>
          </Link>
        </li>

        <li className="menu-divider"></li>

        <li className={location.pathname === "/jyotirlingas" ? "active" : ""}>
          <Link to="/jyotirlingas">
            <span className="menu-icon">📍</span>
            <span className="menu-text">Explore Jyotirlingas</span>
          </Link>
        </li>

        <li className={location.pathname === "/blog" ? "active" : ""}>
          <Link to="/blog">
            <span className="menu-icon">📰</span>
            <span className="menu-text">Read Blogs</span>
          </Link>
        </li>

        <li className={location.pathname === "/gallery" ? "active" : ""}>
          <Link to="/gallery">
            <span className="menu-icon">🖼️</span>
            <span className="menu-text">View Gallery</span>
          </Link>
        </li>

        <li className={location.pathname === "/contact" ? "active" : ""}>
          <Link to="/contact">
            <span className="menu-icon">📞</span>
            <span className="menu-text">Contact Us</span>
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <span className="user-name">
              {JSON.parse(localStorage.getItem("user"))?.name || "User"}
            </span>
            <span className="user-role">Devotee</span>
          </div>
          <button
            className="logout-btn-compact"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("currentUser");
              localStorage.removeItem("user");
              localStorage.clear();
              window.location.href = "/login";
            }}
            title="Logout"
          >
            <span className="logout-icon">🚪</span>
          </button>
        </div>
      </div>

      {/* Mobile Logout Button */}
      <button
        className="mobile-logout"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("currentUser");
          localStorage.removeItem("user");
          localStorage.clear();
          window.location.href = "/login";
        }}
        title="Logout"
      >
        <span className="logout-icon">🚪</span>
      </button>
    </div>
  );
};

export default UserSidebar;
