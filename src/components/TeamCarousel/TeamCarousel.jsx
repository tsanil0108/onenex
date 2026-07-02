import { useRef } from "react";
import { NavLink } from "react-router-dom";
import Reveal from "../Reveal/Reveal";
import "./TeamCarousel.css";

export default function TeamCarousel({ team }) {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="team-carousel">
      <div className="container">
        <Reveal className="team-carousel__head">
          <span className="echo-eyebrow">Design Agency</span>
          <div className="team-carousel__head-row">
            <h2 className="team-carousel__title">
              Create A Unique Brand Identity With Our Counsel &amp; Novel Approach.
            </h2>
            <div className="team-carousel__nav">
              <button type="button" className="team-carousel__arrow" onClick={() => scroll(-1)} aria-label="Previous">‹</button>
              <button type="button" className="team-carousel__arrow" onClick={() => scroll(1)} aria-label="Next">›</button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="team-carousel__track" ref={trackRef}>
        {team.map((member) => (
          <article key={member.name} className="team-carousel__card">
            <div className="team-carousel__photo">
              <img src={member.photo} alt={member.name} loading="lazy" />
            </div>
            <div className="team-carousel__info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="container team-carousel__footer">
        <Reveal>
          <NavLink to="/team" className="team-carousel__link">Meet the Full Team →</NavLink>
        </Reveal>
      </div>
    </section>
  );
}
