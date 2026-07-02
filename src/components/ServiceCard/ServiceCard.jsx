import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./ServiceCard.css";

export default function ServiceCard({ service }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setRotation({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div 
      className="service-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
    >
      <div 
        className={`service-card__inner ${isHovered ? 'service-card__inner--hovered' : ''}`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="service-card__glare"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
        <div className="service-card__image">
          <img src={service.image} alt={service.title} loading="lazy" />
          <div className="service-card__code">{service.code}</div>
          <div className="service-card__overlay">
            <span className="service-card__explore">Explore →</span>
          </div>
        </div>
        
        <div className="service-card__content">
          <h3 className="service-card__title">{service.title}</h3>
          <p className="service-card__short">{service.short}</p>
          <div className="service-card__points">
            {service.points.map((point, i) => (
              <span key={i} className="service-card__point">{point}</span>
            ))}
          </div>
          <NavLink to={`/services/${service.id}`} className="service-card__link">
            Learn More →
          </NavLink>
        </div>
      </div>
    </div>
  );
}