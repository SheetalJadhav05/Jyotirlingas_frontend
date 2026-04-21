import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Branding */}
        <div className="footer-section">
          <h2 className="footer-logo">Jyotirlingas Journey</h2>
          <p className="footer-tagline">
            A devotional space to explore the 12 sacred Jyotirlingas and the
            heritage of Lord Shiva.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/jyotirlingas">Jyotirlingas</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Connect</h3>
          <ul className="footer-links">
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <a href="#">Login / Register</a>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2026 @ Jyotirlingas Journey. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
