import { NavLink } from "react-router-dom";
import Reveal from "../Reveal/Reveal";
import "./PortfolioShowcase.css";

export default function PortfolioShowcase({ items }) {
  return (
    <section className="portfolio-showcase">
      <div className="container">
        <Reveal className="portfolio-showcase__head">
          <span className="echo-eyebrow">Our work</span>
          <h2 className="portfolio-showcase__title">Selected Projects</h2>
        </Reveal>
      </div>

      <div className="portfolio-showcase__grid">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.06} className={`portfolio-showcase__item portfolio-showcase__item--${(i % 3) + 1}`}>
            <NavLink to="/portfolio-grid" className="portfolio-showcase__link">
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="portfolio-showcase__overlay">
                <span className="portfolio-showcase__tag">{item.tag}</span>
                <h3>{item.title}</h3>
              </div>
            </NavLink>
          </Reveal>
        ))}
      </div>

      <div className="container portfolio-showcase__footer">
        <Reveal>
          <NavLink to="/portfolio-grid" className="portfolio-showcase__view-all">
            View All Projects →
          </NavLink>
        </Reveal>
      </div>
    </section>
  );
}
