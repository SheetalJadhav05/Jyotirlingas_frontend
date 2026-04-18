import { useEffect, useRef } from "react";

const About = () => {
  const highlightsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 },
    );

    highlightsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title unified-heading">
          About the 12 Jyotirlingas
        </h2>
        <p className="about-text">
          The 12 Jyotirlingas are the most sacred shrines dedicated to Lord
          Shiva in Hinduism.
        </p>
        <p className="about-text">
          According to legend, Shiva manifested himself as a radiant pillar of
          light (Jyoti) at these twelve locations to demonstrate his
          omnipresence and eternal nature.
        </p>
        <p className="about-text">
          Each Jyotirlinga is believed to be a representation of the divine
          power and is revered by millions of devotees seeking spiritual
          enlightenment and divine blessings.
        </p>
        <p className="about-text">
          These sacred shrines are spread across different regions of India,
          representing the geographical and cultural diversity of Hindu
          pilgrimage traditions.
        </p>
        <div className="about-highlights">
          <div
            ref={(el) => (highlightsRef.current[0] = el)}
            className="highlight-card"
          >
            <h3>🌟 12 Sacred Shrines</h3>
            <p>Located across India representing divine manifestations</p>
          </div>
          <div
            ref={(el) => (highlightsRef.current[1] = el)}
            className="highlight-card"
          >
            <h3>🙏 Spiritual Significance</h3>
            <p>Each shrine holds unique stories and ancient traditions</p>
          </div>
          <div
            ref={(el) => (highlightsRef.current[2] = el)}
            className="highlight-card"
          >
            <h3>🕉️ Divine Pilgrimage</h3>
            <p>A sacred journey through the holiest temples of Shiva</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
