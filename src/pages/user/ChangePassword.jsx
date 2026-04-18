import { useState } from "react";
import UserLayout from "./UserLayout";
import { changePassword } from "../../services/authService";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [successModal, setSuccessModal] = useState({
    show: false,
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Client-side validation
    if (
      !formData.oldPassword.trim() ||
      !formData.newPassword.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setMessageType("error");
      setMessage("All fields are required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessageType("error");
      setMessage("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessageType("error");
      setMessage("New password must be at least 6 characters");
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      setMessageType("error");
      setMessage("New password must be different from current password");
      return;
    }

    setLoading(true);

    try {
      const response = await changePassword({
        oldPassword: formData.oldPassword.trim(),
        newPassword: formData.newPassword.trim(),
      });

      if (response.data.success) {
        setSuccessModal({
          show: true,
          message:
            "Your password has been changed successfully! 🔐 You will be logged out in a few seconds.",
          type: "success",
        });
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        // Auto logout after 3 seconds - Clear ALL storage
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("currentUser");
          localStorage.removeItem("user");
          localStorage.clear();
          // Force page reload to clear any cached data
          window.location.href = "/login?session=expired";
        }, 3000);
      }
    } catch (error) {
      setMessageType("error");
      const errorMsg = error.response?.data?.message || error.message;
      setMessage(errorMsg || "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="change-password-container">
        <h1>Change Your Password</h1>
        <p className="subtitle">
          Update your password to keep your account secure
        </p>

        {message && (
          <div className={`alert alert-${messageType}`}>
            {messageType === "success" ? "✓" : "✕"} {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="password-form">
          <div className="form-group">
            <label htmlFor="oldPassword">Current Password *</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              placeholder="Enter your current password"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password *</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password (minimum 6 characters)"
              value={formData.newPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <small>Must be at least 6 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <>
                <span className="spinner"></span> Updating...
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </form>

        <div className="info-box">
          <p>
            <strong>ℹ️ Important:</strong> When you change your password, only
            your account's password is updated. Make sure you're logged in with
            the correct account (user or admin). After changing password, you'll
            be logged out and need to login again with your new password.
          </p>
        </div>

        <div className="security-tips">
          <h3>Password Security Tips:</h3>
          <ul>
            <li>Use a mix of uppercase and lowercase letters</li>
            <li>Include numbers and special characters</li>
            <li>Avoid using personal information</li>
            <li>Never share your password with anyone</li>
          </ul>
        </div>
      </div>

      {/* Success Modal */}
      {successModal.show && (
        <div
          className="success-modal-overlay"
          onClick={() =>
            setSuccessModal({ show: false, message: "", type: "" })
          }
        >
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-modal-icon">🔐</div>
            <h3 className="success-modal-title">Password Changed!</h3>
            <p className="success-modal-message">{successModal.message}</p>
            <div className="success-modal-timer">
              <div className="timer-spinner"></div>
              <span>Redirecting to login...</span>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
};

export default ChangePassword;
