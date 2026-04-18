import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../../services/contactService";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await getContacts();
      const data = res.data.data || [];
      setContacts(data);
      setAllContacts(data);
    } catch (err) {
      console.log(err);
      alert("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = allContacts.filter(
      (c) =>
        c.name.toLowerCase().includes(value.toLowerCase()) ||
        c.email.toLowerCase().includes(value.toLowerCase()),
    );
    setContacts(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    try {
      setLoading(true);
      await deleteContact(id);
      setContacts(contacts.filter((c) => c._id !== id));
      setAllContacts(allContacts.filter((c) => c._id !== id));
      setSuccessMsg("✅ Message deleted successfully!");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading && allContacts.length === 0) {
    return (
      <div className="admin-card">
        <p style={{ textAlign: "center", color: "#d97706", fontWeight: "600" }}>
          ⏳ Loading messages...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-page-title">Manage Contact Messages</h1>

      {/* Success Message */}
      {successMsg && (
        <div
          style={{
            background: "#dcfce7",
            border: "2px solid #22c55e",
            color: "#166534",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {successMsg}
        </div>
      )}

      {/* Header Card */}
      <div className="admin-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ color: "#5b2e08", margin: 0 }}>💬 Contact Messages</h2>
            <p style={{ color: "#666", marginTop: "0.5rem", marginBottom: 0 }}>
              Total: <strong>{allContacts.length}</strong> messages received
            </p>
          </div>
          <button
            className="admin-refresh-btn"
            onClick={fetchContacts}
            disabled={loading}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Search Card */}
      <div className="admin-card">
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="admin-search"
          style={{ width: "100%", boxSizing: "border-box" }}
        />
      </div>

      {/* Messages Card */}
      <div className="admin-card">
        {contacts.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#999",
              padding: "2rem",
              fontStyle: "italic",
            }}
          >
            {allContacts.length === 0
              ? "No messages found. 💬"
              : "No results found. Try different search terms."}
          </p>
        ) : (
          <div>
            {/* Messages List */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {contacts.map((c) => (
                <div
                  key={c._id}
                  style={{
                    border: "2px solid #e8d4b0",
                    borderRadius: "12px",
                    padding: "1rem",
                    background: "#fff",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#d97706";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0, 0, 0, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e8d4b0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setExpandedId(expandedId === c._id ? null : c._id)
                    }
                  >
                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          margin: 0,
                          color: "#5b2e08",
                          fontSize: "1.1rem",
                        }}
                      >
                        {c.name}
                      </h4>
                      <p
                        style={{
                          margin: "0.3rem 0 0 0",
                          color: "#d97706",
                          fontSize: "0.9rem",
                        }}
                      >
                        📧 {c.email}
                      </p>
                      <p
                        style={{
                          margin: "0.3rem 0 0 0",
                          color: "#999",
                          fontSize: "0.8rem",
                        }}
                      >
                        📅 {new Date(c.createdAt).toLocaleDateString()} at{" "}
                        {new Date(c.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <span
                      style={{
                        color: "#d97706",
                        fontSize: "1.2rem",
                        fontWeight: "700",
                      }}
                    >
                      {expandedId === c._id ? "▼" : "▶"}
                    </span>
                  </div>

                  {/* Message Preview */}
                  <p
                    style={{
                      margin: "0.8rem 0 0 0",
                      color: "#555",
                      fontSize: "0.95rem",
                      lineHeight: "1.5",
                      display: expandedId === c._id ? "block" : "none",
                      maxHeight: "200px",
                      overflow: "auto",
                    }}
                  >
                    {c.message}
                  </p>

                  {/* Actions */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: expandedId === c._id ? "1rem" : "0.5rem",
                      paddingTop: "0.8rem",
                      borderTop:
                        expandedId === c._id ? "1px solid #e8d4b0" : "none",
                    }}
                  >
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDelete(c._id)}
                      disabled={loading}
                      style={{ flex: 1 }}
                      title="Delete this message"
                    >
                      🗑️ Delete
                    </button>
                    <button
                      className="admin-copy-btn"
                      onClick={() => {
                        // Copy to clipboard
                        const text = `Name: ${c.name}\nEmail: ${c.email}\nMessage: ${c.message}`;
                        navigator.clipboard.writeText(text);
                        setSuccessMsg("✅ Message copied to clipboard!");
                      }}
                      title="Copy message to clipboard"
                    >
                      📋 Copy
                    </button>
                    <a
                      href={`mailto:${c.email}`}
                      className="admin-reply-btn"
                      title="Reply to this email"
                    >
                      ✉️ Reply
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Count Info */}
            {!loading && allContacts.length > 0 && (
              <p
                style={{
                  textAlign: "center",
                  color: "#999",
                  marginTop: "1.5rem",
                  fontSize: "0.9rem",
                }}
              >
                Showing {contacts.length} of {allContacts.length} messages
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContact;
