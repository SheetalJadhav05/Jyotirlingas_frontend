import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Blog from "../components/Blog";
import Gallery from "../components/Gallery";
import Map from "../components/Map";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("login");

  console.log("Home component mounted. Modal state:", isLoginModalOpen);

  return (
    <>
      <Navbar
        onLoginClick={() => {
          setModalTab("login");
          setIsLoginModalOpen(true);
        }}
        onRegisterClick={() => {
          setModalTab("register");
          setIsLoginModalOpen(true);
        }}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        initialTab={modalTab}
        onClose={() => {
          console.log("Home: Setting login modal to false");
          setIsLoginModalOpen(false);
        }}
      />
      <Hero />
      <About />
      <Blog />
      <Gallery />
      <Map />
      <Contact />
      <Footer />
    </>
  );
};
export default Home;
