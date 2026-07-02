import { NavLink } from "react-router-dom";
import Reveal from "../Reveal/Reveal";
import "./AboutShowcase.css";

const features = [
  { num: "01", title: "Endless Possibilities", desc: "Six disciplines under one roof — branding, print, web and more." },
  { num: "02", title: "Creative Design", desc: "Every piece designed in-house, from logo sketch to final print run." },
];

export default function AboutShowcase() {
  return (
    <section className="about-showcase">
      <div className="container about-showcase__grid">
        <Reveal className="about-showcase__visual">
          <div className="about-showcase__image">
            <img src="/images/digital-design.jpg" alt="OneNex design studio" loading="lazy" />
          </div>
          <div className="about-showcase__badge">
            <span className="about-showcase__badge-label">Creating Brand Identity</span>
            <span className="about-showcase__badge-tag">corporate service</span>
          </div>
        </Reveal>

        <div className="about-showcase__content">
          <Reveal>
            <span className="echo-eyebrow">About Us</span>
            <h2 className="about-showcase__title">
              We Design &amp; <em>Create</em> Style
            </h2>
            <p className="about-showcase__desc">
              We appreciate your trust greatly! Our clients choose us because we design,
              print and deliver every layer of their brand from one studio in Thane.
            </p>
          </Reveal>

          <div className="about-showcase__features">
            {features.map((f, i) => (
              <Reveal key={f.num} delay={i * 0.1} className="about-showcase__feature">
                <span className="about-showcase__feature-num">{f.num}.</span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <NavLink to="/about" className="about-showcase__link">
              About Us →
            </NavLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
