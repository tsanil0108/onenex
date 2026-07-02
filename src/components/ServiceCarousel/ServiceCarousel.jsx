import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Reveal from "../Reveal/Reveal";
import "./ServiceCarousel.css";

export default function ServiceCarousel({ services }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const visible = 4;
  const maxIndex = Math.max(0, services.length - visible);

  const scrollTo = (index) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setActiveIndex(clamped);
    if (trackRef.current) {
      const card = trackRef.current.querySelector(".service-carousel__card");
      if (card) {
        const gap = 24;
        const offset = clamped * (card.offsetWidth + gap);
        trackRef.current.style.transform = `translateX(-${offset}px)`;
      }
    }
  };

  return (
    <section className="service-carousel">
      <div className="container">
        <Reveal className="service-carousel__head">
          <span className="echo-eyebrow">Main directions</span>
          <div className="service-carousel__head-row">
            <h2 className="service-carousel__title">Services</h2>
            <div className="service-carousel__nav">
              <button
                type="button"
                className="service-carousel__arrow"
                onClick={() => scrollTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous services"
              >
                ‹
              </button>
              <button
                type="button"
                className="service-carousel__arrow"
                onClick={() => scrollTo(activeIndex + 1)}
                disabled={activeIndex >= maxIndex}
                aria-label="Next services"
              >
                ›
              </button>
            </div>
          </div>
          <p className="service-carousel__desc">
            Every service feeds the next — a logo becomes a business card, a business card
            informs a hoarding, a hoarding informs a website.
          </p>
        </Reveal>
      </div>

      <div className="service-carousel__track-wrap">
        <div className="service-carousel__track" ref={trackRef}>
          {services.map((service) => (
            <article key={service.id} className="service-carousel__card">
              <NavLink to={`/services/${service.id}`} className="service-carousel__card-link">
                <div className="service-carousel__card-image">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
                <div className="service-carousel__card-body">
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <span className="service-carousel__read">Read more</span>
                </div>
              </NavLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
