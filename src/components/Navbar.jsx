import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const Navbar = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === "/home" || path === "/") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname === path;
  };

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setCurrentUser(stored ? JSON.parse(stored) : null);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/home");
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/home" className="logo" onClick={closeMenu}>
          <span className="logo-icon" role="img" aria-label="temple">
            🛕
          </span>
          <span className="logo-text">Jyotirlingas</span>
        </Link>

        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link
              to="/home"
              className={`nav-link ${isActive("/home") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link ${isActive("/about") ? "active" : ""}`}
              onClick={closeMenu}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/jyotirlingas"
              className={`nav-link ${isActive("/jyotirlingas") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Jyotirlingas
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              className={`nav-link ${isActive("/gallery") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className={`nav-link ${isActive("/blog") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/post-blog"
              className={`nav-link ${isActive("/dashboard/post-blog") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Post Blog
            </Link>
          </li>
          <li>
            <Link
              to="/map"
              className={`nav-link ${isActive("/map") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Map
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`nav-link ${isActive("/contact") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="auth-btns">
          {currentUser ? (
            <>
              <button
                className="login-btn"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
              <button
                className="login-btn"
                style={{ backgroundColor: "#e44" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="login-btn"
              onClick={() => {
                const isHome =
                  location.pathname === "/" || location.pathname === "/home";
                if (isHome && onLoginClick) {
                  onLoginClick();
                } else {
                  navigate("/login");
                }
              }}
            >
              Login
            </button>
          )}
        </div>

        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
