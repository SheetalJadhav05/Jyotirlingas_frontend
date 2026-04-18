import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/about.css";
import "./styles/jyotirlingas.css";
import "./styles/blog.css";
import "./styles/gallery.css";
import "./styles/map.css";
import "./styles/contact.css";
import "./styles/login.css";
import "./styles/register.css";
import "./styles/admin.css";
import "./styles/footer.css";
import "./styles/modal.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
