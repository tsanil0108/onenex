import { useState } from "react";
import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import "./PortfolioMetroSlide.css";

const projects = [
  { id: 1, title: "Brand Identity", category: "Branding", image: "/images/brand-identity.jpg", size: "large" },
  { id: 2, title: "Packaging Design", category: "Packaging", image: "/images/packaging-design.jpg", size: "small" },
  { id: 3, title: "Social Campaign", category: "Social", image: "/images/digital-design.jpg", size: "small" },
  { id: 4, title: "Print Materials", category: "Print", image: "/images/print-materials.jpg", size: "medium" },
  { id: 5, title: "Web Design", category: "Web", image: "/images/web-ui.jpg", size: "medium" },
  { id: 6, title: "Hoarding Design", category: "Advertising", image: "/images/hoarding-signage.jpg", size: "large" },
  { id: 7, title: "Interior Design", category: "Interior", image: "/images/brand-identity.jpg", size: "small" },
  { id: 8, title: "Motion Graphics", category: "Motion", image: "/images/digital-design.jpg", size: "medium" },
];

export default function PortfolioMetroSlide() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      <Seo title="Portfolio Metro Slide" description="Metro style portfolio with slide effect" path="/portfolio-metro-slide" />
      <PageHeader eyebrow="Portfolio" title="Metro Grid" subtitle="A dynamic metro-style portfolio showcase" />

      <section className="section">
        <div className="container">
          <div className="pms-grid">
            {projects.map((project) => (
              <Reveal key={project.id} animation="scale" className={`pms-item pms-item--${project.size}`}>
                <div 
                  className={`pms-card ${hoveredId === project.id ? "pms-card--hovered" : ""}`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <img src={project.image} alt={project.title} />
                  <div className="pms-card__overlay">
                    <span className="pms-card__category">{project.category}</span>
                    <h3 className="pms-card__title">{project.title}</h3>
                    <span className="pms-card__arrow">→</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="See more" title="Explore our portfolio" subtitle="Every project tells a unique story" />
    </>
  );
}