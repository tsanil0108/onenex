import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./ServicesIndex.css";

export default function ServicesIndex({ services }) {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [previewY, setPreviewY] = useState(0);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setPreviewY(y);
  };

  return (
    <div
      className="services-index"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(null)}
    >
      <span className="services-index__reg" aria-hidden="true" />

      {services.map((service) => (
        <NavLink
          to={`/services/${service.id}`}
          key={service.id}
          className={`services-index__row ${hovered?.id === service.id ? "services-index__row--active" : ""}`}
          onMouseEnter={() => setHovered(service)}
        >
          <span className="services-index__num">{service.code}</span>
          <h3 className="services-index__title">{service.title}</h3>
          <p className="services-index__desc">{service.short}</p>
          <span className="services-index__arrow" aria-hidden="true">→</span>
        </NavLink>
      ))}

      <div
        className={`services-index__preview ${hovered ? "services-index__preview--visible" : ""}`}
        style={{ top: previewY }}
        aria-hidden="true"
      >
        {services.map((service) => (
          <img
            key={service.id}
            src={service.image}
            alt=""
            loading="lazy"
            className={hovered?.id === service.id ? "is-visible" : ""}
          />
        ))}
      </div>
    </div>
  );
}