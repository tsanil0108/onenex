import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Seo from "../../components/Seo/Seo";
import PressCube from "../../components/PressCube/PressCube";
import StatStrip from "../../components/StatStrip/StatStrip";
import ProcessSteps from "../../components/ProcessSteps/ProcessSteps";
import TestimonialSlider from "../../components/TestimonialSlider/TestimonialSlider";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import ServicesIndex from "../../components/ServicesIndex/ServicesIndex";
import { services, stats, process, testimonials, heroImage } from "../../data/content";
import "./Home.css";

const SPECS = [
  "OFFSET LITHO", "DIGITAL PRINT", "SCREEN PRINT", "PANTONE MATCHED",
  "300GSM ART CARD", "SPOT UV", "DIE CUT", "FOIL STAMP",
  "CMYK / RGB", "EST. 2014", "THANE, MUMBAI",
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const currentHero = heroRef.current;
    if (!currentHero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(currentHero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Seo
        title="Branding, Print & Design Studio in Thane, Mumbai"
        description="OneNex Studio designs and prints brands from the ground up — logos, packaging, hoardings, banners and websites, all produced in-house in Thane, Mumbai."
        path="/"
      />

      {/* ================= HERO — signage panel ================= */}
      <section className="hero" ref={heroRef}>
        <span className="hero__bolt hero__bolt--tl" aria-hidden="true" />
        <span className="hero__bolt hero__bolt--tr" aria-hidden="true" />
        <span className="hero__bolt hero__bolt--bl" aria-hidden="true" />
        <span className="hero__bolt hero__bolt--br" aria-hidden="true" />

        <div className="hero__bg" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
        <div className="hero__bg-scrim" aria-hidden="true" />
        <div className="hero__halftone" aria-hidden="true" />

        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="hero__plate">SITE NO. 04-A — THANE, MH</span>

            <h1 className="hero__title">
              <span className="hero__line" style={{ "--i": 0 }}>
                <span>We Build</span>
              </span>
              <span className="hero__line" style={{ "--i": 1 }}>
                <span>Brands That</span>
              </span>
              <span className="hero__line" style={{ "--i": 2 }}>
                <span className="hero__title-mark">Stand Out.</span>
              </span>
            </h1>

            <p className="hero__subtitle">
              From the first sketch of a logo to the hoarding above your street, OneNex
              designs and produces every layer of your brand under one roof.
            </p>

            <div className="hero__actions">
              <NavLink to="/contact" className="hero__cta-primary">
                <span>Start Your Project</span>
                <span className="hero__cta-arrow" aria-hidden="true">→</span>
              </NavLink>
              <NavLink to="/services" className="hero__cta-secondary">
                View Portfolio
              </NavLink>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__visual-frame">
              {isVisible ? (
                <PressCube mode="scroller" />
              ) : (
                <div className="hero__visual-placeholder">
                  <span className="hero__visual-loading" />
                </div>
              )}
            </div>
            <span className="hero__visual-caption">FIG. 01 — ROTATE TO PREVIEW</span>
          </div>
        </div>
      </section>

      {/* ================= HAZARD DIVIDER ================= */}
      <div className="hazard" role="presentation" />

      {/* ================= SPEC TICKER ================= */}
      <div className="spec-ticker" aria-hidden="true">
        <div className="spec-ticker__track">
          {[...SPECS, ...SPECS].map((spec, i) => (
            <span className="spec-ticker__item" key={i}>
              {spec}
              <span className="spec-ticker__dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ================= STATS ================= */}
      <section className="section section--tight">
        <div className="container">
          <StatStrip stats={stats} />
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head--split">
            <div>
              <span className="eyebrow eyebrow--tag">What we do</span>
              <h2>Six disciplines, one consistent brand</h2>
            </div>
            <p>
              Every service feeds the next — a logo becomes a business card, a business
              card informs a hoarding, a hoarding informs a website.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ServicesIndex services={services} />
          </Reveal>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="section section--alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--tag">How we work</span>
            <h2>A straight line from brief to delivery</h2>
          </Reveal>
          <ProcessSteps steps={process} />
        </div>
      </section>

      {/* ================= TESTIMONIALS (dark stage) ================= */}
      <section className="section home-testimonials">
        <span className="hero__bolt home-testimonials__bolt" aria-hidden="true" />
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow eyebrow--tag eyebrow--on-dark">Client feedback</span>
            <h2>What it's like to work with us</h2>
          </Reveal>
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      <CTASection />
    </>
  );
}