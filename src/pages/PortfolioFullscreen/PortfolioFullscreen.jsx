import { useState } from "react";
import Seo from "../../components/Seo/Seo";
import CTASection from "../../components/CTASection/CTASection";
import "./PortfolioFullscreen.css";

const projects = [
  { id: 1, title: "Brand Identity Design", category: "Branding", image: "/images/brand-identity.jpg" },
  { id: 2, title: "Packaging Design", category: "Packaging", image: "/images/packaging-design.jpg" },
  { id: 3, title: "Social Campaign", category: "Social", image: "/images/digital-design.jpg" },
  { id: 4, title: "Print Materials", category: "Print", image: "/images/print-materials.jpg" },
  { id: 5, title: "Web Design", category: "Web", image: "/images/web-ui.jpg" },
];

export default function PortfolioFullscreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <>
      <Seo title="Portfolio Fullscreen" description="Fullscreen portfolio showcase" path="/portfolio-fullscreen" />
      
      <section className="pfs-hero">
        <div className="pfs-slider" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {projects.map((project) => (
            <div key={project.id} className="pfs-slide">
              <div className="pfs-slide__bg" style={{ backgroundImage: `url(${project.image})` }} />
              <div className="pfs-slide__overlay">
                <div className="pfs-slide__content">
                  <span className="pfs-slide__category">{project.category}</span>
                  <h1 className="pfs-slide__title">{project.title}</h1>
                  <span className="pfs-slide__arrow">↓</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="pfs-btn pfs-btn--prev" onClick={prevSlide}>‹</button>
        <button className="pfs-btn pfs-btn--next" onClick={nextSlide}>›</button>
        
        <div className="pfs-dots">
          {projects.map((_, i) => (
            <button key={i} className={`pfs-dot ${i === activeIndex ? "pfs-dot--active" : ""}`} onClick={() => setActiveIndex(i)} />
          ))}
        </div>
      </section>

      <CTASection eyebrow="Experience" title="Fullscreen portfolio" subtitle="Immersive showcase of our best work" />
    </>
  );
}