import React from "react";

const AdminSidebar = ({ active, onSelect, onLogout, menuItems }) => {
  const items = menuItems || [
    { key: "home", label: "Home" },
    { key: "jyotirlingas", label: "Jyotirlingas" },
    { key: "postBlog", label: "Post Blog" },
    { key: "gallery", label: "Gallery" },
    { key: "contact", label: "Contact Us" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">Admin Panel</div>
      <ul className="admin-menu">
        {items.map((item) => (
          <li
            key={item.key}
            className={active === item.key ? "active" : ""}
            onClick={() => onSelect(item.key)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <button className="admin-logout-btn" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
