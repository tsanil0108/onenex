import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Reveal from "../Reveal/Reveal";
import Scene3D from "../Scene3D/Scene3D";
import "./CTASection.css";

export default function CTASection({
  eyebrow = "Start a project",
  title = "Have a brand that needs shape?",
  subtitle = "Tell us what you're building — we'll reply within one business day.",
  linkTo = "/contact",
  linkLabel = "Get a Quote",
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section className="cta-section">
      <div className="container">
        <Reveal className="cta-section__wrapper">
          <div 
            className="cta-section__box"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              '--mouse-x': mousePosition.x,
              '--mouse-y': mousePosition.y,
            }}
          >
            {/* Animated Background Particles */}
            <div className="cta-section__particles">
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="cta-section__particle"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    animationDuration: `${p.speed}s`,
                    animationDelay: `${p.delay}s`,
                    opacity: p.opacity,
                  }}
                />
              ))}
            </div>

            {/* 3D Floating Elements */}
            <div className="cta-section__floating-elements">
              <div className="cta-section__float-emoji cta-section__float-emoji--1">✨</div>
              <div className="cta-section__float-emoji cta-section__float-emoji--2">🎨</div>
              <div className="cta-section__float-emoji cta-section__float-emoji--3">🚀</div>
              <div className="cta-section__float-emoji cta-section__float-emoji--4">💡</div>
              <div className="cta-section__float-emoji cta-section__float-emoji--5">🌟</div>
            </div>

            {/* Real Three.js shape, drives off page scroll */}
            <div className="cta-section__scene" aria-hidden="true">
              <Scene3D shape="torus" size={170} color="#a9762b" wireColor="#e8542e" scrollFactor={1.6} />
            </div>

            {/* 3D Stamp */}
            <div className="cta-section__stamp-wrapper">
              <div 
                className="cta-section__stamp"
                style={{
                  transform: isHovered 
                    ? `translateY(-50%) perspective(600px) rotateX(${20 + mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale(1.1)`
                    : `translateY(-50%) perspective(600px) rotateX(20deg) rotateY(0deg) scale(1)`
                }}
              >
                <div className="cta-section__stamp-inner">
                  <span>OK</span>
                  <div className="cta-section__stamp-ring"></div>
                  <div className="cta-section__stamp-ring cta-section__stamp-ring--2"></div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div 
              className="cta-section__content"
              style={{
                transform: isHovered 
                  ? `translateX(${mousePosition.x * 5}px) translateY(${mousePosition.y * 3}px)`
                  : 'translateX(0) translateY(0)'
              }}
            >
              <span className="eyebrow cta-section__eyebrow">{eyebrow}</span>
              <h2 className="cta-section__title">
                {title.split(' ').map((word, i) => (
                  <span 
                    key={i}
                    className="cta-section__word"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {word}
                  </span>
                ))}
              </h2>
              <p className="cta-section__subtitle">{subtitle}</p>
              
              <div className="cta-section__actions">
                <NavLink to={linkTo} className="cta-section__link cta-section__link--primary">
                  <span>{linkLabel}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </NavLink>
                <NavLink to="/services" className="cta-section__link cta-section__link--secondary">
                  Explore Services
                </NavLink>
              </div>

              {/* Trust Badges */}
              <div className="cta-section__badges">
                <span className="cta-section__badge">
                  <span className="cta-section__badge-icon">✓</span>
                  Free Consultation
                </span>
                <span className="cta-section__badge">
                  <span className="cta-section__badge-icon">✓</span>
                  No Obligation
                </span>
                <span className="cta-section__badge">
                  <span className="cta-section__badge-icon">✓</span>
                  24hr Response
                </span>
              </div>
            </div>

            {/* Animated Border */}
            <div className="cta-section__border-glow"></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}