import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <About />
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Link
          to="/"
          style={{
            color: "#d4af37",
            textDecoration: "none",
            fontSize: "1.1rem",
          }}
        >
          ← Back to Home
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
