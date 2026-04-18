import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("user");

    const params = new URLSearchParams(window.location.search);
    if (params.get("session") === "expired") {
      setMessage("Session expired. Please login with your new password.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const res = await loginUser({ email, password });

      console.log("LOGIN RESPONSE:", res.data); // 🔥 DEBUG

      const token = res?.data?.token;
      const user = res?.data?.user;

      if (!token || !user) {
        setMessage("Invalid email or password");
        return;
      }

      localStorage.clear();

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUserType(user.isAdmin ? "Admin" : "User");
      setShowSuccessPopup(true);

      setTimeout(() => {
        if (user.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 2000);
    } catch (error) {
      console.error("LOGIN ERROR:", error); // 🔥 DEBUG

      if (error.response) {
        setMessage(error.response.data.message || "Login failed");
      } else {
        setMessage("Server not responding");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {message && (
          <div
            className={`alert ${message.includes("success") ? "alert-success" : "alert-error"}`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
          <input
            type="text"
            name="username"
            autoComplete="username"
            style={{ display: "none" }}
            tabIndex={-1}
          />
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            style={{ display: "none" }}
            tabIndex={-1}
          />

          <input
            type="email"
            name="loginEmail"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
            spellCheck="false"
            autoCapitalize="none"
          />

          <input
            type="password"
            name="loginPassword"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            spellCheck="false"
            autoCapitalize="none"
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="back-home-row">
            <button
              type="button"
              className="back-home-btn"
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </button>
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-popup-content">
            <span className="icon">🎉</span>
            <h3>Login Successful!</h3>
            <p>
              Welcome back! You have successfully logged in to your account.
            </p>
            <span className="account-type">{userType} Account</span>
            <p
              style={{ fontSize: "14px", color: "#6b7280", marginTop: "15px" }}
            >
              Redirecting you to your dashboard...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
