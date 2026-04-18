import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "./UserLayout";
import "../../styles/user.css";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);
  }, []);

  const handleQuickAction = (route) => {
    navigate(route);
  };

  return (
    <UserLayout>
      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-title">
              Welcome back, {user?.name || "Devotee"}! 🙏
            </h1>
            <p className="welcome-subtitle">
              Continue your spiritual journey with the divine Jyotirlingas
            </p>
            <div className="welcome-stats">
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Jyotirlingas</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Blessings</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1</span>
                <span className="stat-label">Journey</span>
              </div>
            </div>
          </div>
          <div className="welcome-image">
            <div className="spiritual-icon">🕉️</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <div className="action-card">
              <div className="action-icon">📍</div>
              <h3>Explore Jyotirlingas</h3>
              <p>Discover the sacred 12 Jyotirlingas</p>
              <button
                className="action-btn"
                onClick={() => handleQuickAction("/jyotirlingas")}
              >
                Explore Now
              </button>
            </div>
            <div className="action-card">
              <div className="action-icon">📰</div>
              <h3>Read Blogs</h3>
              <p>Spiritual insights and stories</p>
              <button
                className="action-btn"
                onClick={() => handleQuickAction("/blog")}
              >
                Read More
              </button>
            </div>
            <div className="action-card">
              <div className="action-icon">🖼️</div>
              <h3>View Gallery</h3>
              <p>Beautiful temple images</p>
              <button
                className="action-btn"
                onClick={() => handleQuickAction("/gallery")}
              >
                View Gallery
              </button>
            </div>
            <div className="action-card">
              <div className="action-icon">📞</div>
              <h3>Contact Us</h3>
              <p>Get in touch with us</p>
              <button
                className="action-btn"
                onClick={() => handleQuickAction("/contact")}
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Spiritual Quote */}
        <div className="spiritual-quote">
          <div className="quote-content">
            <blockquote>
              "The Jyotirlingas are the twelve supreme manifestations of Lord
              Shiva, representing the infinite light that dispels darkness and
              ignorance."
            </blockquote>
            <cite>— Ancient Hindu Scriptures</cite>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">🔥</div>
              <div className="activity-content">
                <h4>Welcome to your spiritual journey!</h4>
                <p>
                  You logged in successfully. May Lord Shiva bless your path.
                </p>
                <span className="activity-time">Just now</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📚</div>
              <div className="activity-content">
                <h4>Explore the Jyotirlingas</h4>
                <p>
                  Learn about the 12 sacred Jyotirlingas and their significance.
                </p>
                <span className="activity-time">Today</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">🔔</div>
              <div className="activity-content">
                <h4>Account Created</h4>
                <p>
                  Your spiritual journey begins here. Welcome to our community!
                </p>
                <span className="activity-time">Recently</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
