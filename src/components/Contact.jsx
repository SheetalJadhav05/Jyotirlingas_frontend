import { useState } from "react";
import { sendContact } from "../services/contactService";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendContact(formData);

      alert("Message sent successfully ✅");

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.log("SEND ERROR:", err);
      alert("Failed to send message ❌");
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="contact-main-title unified-heading">CONTACT US</h2>
        <p className="contact-subtitle">
          Connect with us on your sacred journey to the 12 divine jyotirlingas
        </p>

        <div className="contact-container">
          <form onSubmit={handleSubmit}>
            <div className="contact-form-group">
              <label htmlFor="name" className="contact-label">
                👤 Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="contact-input"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="email" className="contact-label">
                📧 Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="contact-input"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="message" className="contact-label">
                💬 Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Share your thoughts, questions, or feedback..."
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="contact-textarea"
              ></textarea>
            </div>

            <button type="submit" className="contact-submit-btn">
              🚀 Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
