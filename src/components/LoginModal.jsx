import { useState, useEffect } from "react";
import "../styles/modal.css";
import { registerUser, loginUser } from "../services/authService";

const LoginModal = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialTab = "login",
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setLoginData({ email: "", password: "" });
      setRegisterData({ name: "", email: "", password: "" });
      setError("");
      setSuccess("");
    }
  }, [isOpen, initialTab]);

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleRegisterChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await loginUser(loginData);

      if (response.data.success) {
        setLoading(false);
        setSuccess("✅ Login Successfully!");

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // 🔥 NAVBAR UPDATE
        window.dispatchEvent(new Event("userChanged"));

        setTimeout(() => {
          setSuccess("");
          onClose();
          if (onLoginSuccess) onLoginSuccess(response.data.user);
        }, 1500);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Invalid Email or Password");
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await registerUser(registerData);

      if (response.data.success) {
        setLoading(false);
        setSuccess("🎉 Registration Successful!");

        setTimeout(() => {
          setSuccess("");
          setActiveTab("login");
        }, 1500);
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Registration Failed. Try again.",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
        <span className="close-x" onClick={onClose}>
          &times;
        </span>

        <div className="auth-tabs">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        <div className="auth-container">
          {success && <div className="status-popup success-bg">{success}</div>}
          {error && <div className="status-popup error-bg">{error}</div>}

          <h2 className="auth-title">
            {activeTab === "login" ? "Login" : "Register"}
          </h2>

          {/* 🔥 AUTOFILL BLOCK TRICK */}
          <form
            autoComplete="off"
            onSubmit={
              activeTab === "login" ? handleLoginSubmit : handleRegisterSubmit
            }
          >
            {/* Hidden fields to block autofill */}
            <input type="text" style={{ display: "none" }} />
            <input type="password" style={{ display: "none" }} />

            {activeTab === "register" ? (
              <>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                    autoComplete="new-password"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                    autoComplete="new-password"
                  />
                </div>

                <div className="checkbox-row">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
              </>
            )}

            <button
              type="submit"
              className="submit-yellow-btn"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : activeTab === "login"
                  ? "Login"
                  : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
