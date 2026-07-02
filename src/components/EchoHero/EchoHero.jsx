import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Reveal from "../Reveal/Reveal";
import "./EchoHero.css";

export default function EchoHero() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/brand-identity.jpg";
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <section className="echo-hero" ref={heroRef}>
      <div className="echo-hero__glow" aria-hidden="true" />

      <div className="container echo-hero__head">
        <Reveal animation="fade" duration={0.9}>
          <p className="echo-hero__label">Digital Marketing &amp; Creative Studio</p>
        </Reveal>

        <Reveal animation="slide-up" delay={0.1} duration={0.9}>
          <h1 className="echo-hero__title">
            <span className="echo-hero__line echo-hero__line--1">
              We <em>Design</em> &amp; <em>Print</em>
            </span>
            <span className="echo-hero__line echo-hero__line--2">
              For <em>Your</em> Brand
            </span>
          </h1>
        </Reveal>
      </div>

      <Reveal animation="scale" delay={0.25} duration={1} className="echo-hero__image-wrap">
        <div className={`echo-hero__image ${loaded ? "echo-hero__image--loaded" : ""}`}>
          <img src="/images/brand-identity.jpg" alt="OneNex Studio creative team at work" />
          <div className="echo-hero__image-overlay" />
        </div>
      </Reveal>

      <div className="container echo-hero__footer">
        <Reveal animation="slide-up" delay={0.4}>
          <p className="echo-hero__desc">
            From the first sketch of a logo to the hoarding above your street — OneNex designs
            and produces every layer of your brand under one roof in Thane, Mumbai.
          </p>
        </Reveal>
        <Reveal animation="slide-up" delay={0.5}>
          <NavLink to="/contact" className="echo-hero__cta">
            Work With Us
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
