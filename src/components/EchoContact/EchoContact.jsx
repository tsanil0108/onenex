import { NavLink } from "react-router-dom";
import Reveal from "../Reveal/Reveal";
import { brand } from "../../data/content";
import "./EchoContact.css";

export default function EchoContact() {
  return (
    <section className="echo-contact">
      <div className="container echo-contact__grid">
        <Reveal className="echo-contact__copy">
          <span className="echo-eyebrow">Contact Us</span>
          <h2 className="echo-contact__title">Have Questions?</h2>
          <p className="echo-contact__desc">
            Tell us what you're building — we'll reply within one business day.
            From a logo refresh to a full brand rollout, we're ready to help.
          </p>
          <div className="echo-contact__details">
            <p>{brand.address}</p>
            <a href={`tel:${brand.phone}`}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="echo-contact__cta-box">
          <h3>Ready to start?</h3>
          <p>Get a free consultation and quote for your next project.</p>
          <NavLink to="/contact" className="echo-contact__btn">
            Get In Touch
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </NavLink>
        </Reveal>
      </div>
    </section>
  );
}
