import { useRef, useState, useEffect } from "react";
import "./GalleryTile.css";

export default function GalleryTile({ item, index = 0 }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x: px, y: py });
    el.style.setProperty("--rx", `${py * -15}deg`);
    el.style.setProperty("--ry", `${px * 18}deg`);
    el.style.setProperty("--glow-x", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--glow-y", `${(py + 0.5) * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleEnter = () => {
    setIsHovered(true);
  };

  useEffect(() => {
    const img = new Image();
    img.src = item.image;
    img.onload = () => setIsLoaded(true);
  }, [item.image]);

  return (
    <figure
      className={`gallery-tile ${isHovered ? 'gallery-tile--hovered' : ''} ${isLoaded ? 'gallery-tile--loaded' : ''}`}
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ '--index': index }}
    >
      <div className="gallery-tile__inner">
        {/* Image with loading placeholder */}
        <div className="gallery-tile__image-wrapper">
          <img 
            src={item.image} 
            alt={item.title} 
            loading="lazy"
            className="gallery-tile__image"
          />
          {!isLoaded && (
            <div className="gallery-tile__placeholder">
              <span className="gallery-tile__loader"></span>
            </div>
          )}
        </div>

        {/* Overlay gradient */}
        <div className="gallery-tile__overlay">
          <div className="gallery-tile__overlay-glow"></div>
        </div>

        {/* Caption with animations */}
        <figcaption className="gallery-tile__caption">
          <div className="gallery-tile__caption-content">
            <div className="gallery-tile__header">
              <span className="gallery-tile__tag">{item.tag}</span>
              <span className="gallery-tile__number">#{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="gallery-tile__title">{item.title}</h3>
            <div className="gallery-tile__actions">
              <span className="gallery-tile__view">View Project</span>
              <span className="gallery-tile__arrow">→</span>
            </div>
          </div>
        </figcaption>

        {/* Decorative corners */}
        <div className="gallery-tile__corner gallery-tile__corner--tl"></div>
        <div className="gallery-tile__corner gallery-tile__corner--tr"></div>
        <div className="gallery-tile__corner gallery-tile__corner--bl"></div>
        <div className="gallery-tile__corner gallery-tile__corner--br"></div>

        {/* Shine effect */}
        <div className="gallery-tile__shine"></div>
      </div>
    </figure>
  );
}