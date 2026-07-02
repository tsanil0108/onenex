import { useState } from "react";
import { NavLink } from "react-router-dom";
import Reveal from "../Reveal/Reveal";
import "./AwardsSection.css";

export default function AwardsSection({ awards }) {
  const [active, setActive] = useState(0);

  return (
    <section className="awards">
      <div className="container awards__grid">
        <Reveal className="awards__intro">
          <span className="echo-eyebrow">Our Achievements</span>
          <h2 className="awards__title">Awards</h2>
          <p className="awards__desc">
            Our area of practice is quite wide: design, graphics, branding, print and web.
            We know exactly how to make your project unique, fresh, and profitable.
          </p>
          <NavLink to="/about" className="awards__link">Read More →</NavLink>
        </Reveal>

        <div className="awards__list">
          {awards.map((award, i) => (
            <Reveal key={award.year} delay={i * 0.08}>
              <button
                type="button"
                className={`awards__item ${active === i ? "awards__item--active" : ""}`}
                onClick={() => setActive(i)}
              >
                <div className="awards__item-head">
                  <h3>{award.title}</h3>
                  <span className="awards__year">{award.year}</span>
                </div>
                <div className="awards__item-body">
                  <span className="awards__category">{award.category}</span>
                  <p>{award.detail}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
