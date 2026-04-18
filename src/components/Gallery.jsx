import { useState, useEffect } from "react";
import api from "../services/api";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get("/gallery");
        setGalleryImages(res.data.data || []);
      } catch (err) {
        console.error("Gallery Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  if (loading)
    return <div className="gallery-loader">Loading Divine Gallery...</div>;

  return (
    <div className="gallery-main-wrapper">
      <div className="gallery-header">
        <h2 className="section-title unified-heading">🖼️ Divine Gallery</h2>
        <p>Explore stunning moments from our sacred pilgrimages</p>
        <div className="underline"></div>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((imageObj, index) => (
          <div
            key={imageObj._id}
            className="gallery-item-card"
            onClick={() => setCurrentIndex(index)}
          >
            <div className="image-box">
              <img
                src={`http://localhost:5000/uploads/${imageObj.image}`}
                alt={imageObj.title}
              />
              <div className="hover-overlay">
                <span>View Full Size</span>
              </div>
            </div>
            <div className="title-box">
              <h3>{imageObj.title}</h3>
              <p className="card-meta">Sacred pilgrimage moment</p>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX POPUP SLIDER */}
      {currentIndex !== null && (
        <div className="lightbox-modal" onClick={() => setCurrentIndex(null)}>
          <button className="close-lightbox">✕</button>

          <button className="slide-btn left" onClick={prevImage}>
            ❮
          </button>

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`http://localhost:5000/uploads/${galleryImages[currentIndex].image}`}
              alt={galleryImages[currentIndex].title}
            />
            <div className="lightbox-caption">
              <h4>{galleryImages[currentIndex].title}</h4>
              <p className="lightbox-meta">
                {currentIndex + 1} of {galleryImages.length} sacred images
              </p>
            </div>
          </div>

          <button className="slide-btn right" onClick={nextImage}>
            ❯
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
