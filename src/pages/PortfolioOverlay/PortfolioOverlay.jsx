import { useState } from "react";
import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import "./PortfolioOverlay.css";

const projects = [
  { id: 1, title: "Brand Identity", category: "Branding", image: "/images/brand-identity.jpg", color: "#e8542e" },
  { id: 2, title: "Packaging Design", category: "Packaging", image: "/images/packaging-design.jpg", color: "#c9a24b" },
  { id: 3, title: "Social Campaign", category: "Social", image: "/images/digital-design.jpg", color: "#2d2d2d" },
  { id: 4, title: "Print Materials", category: "Print", image: "/images/print-materials.jpg", color: "#e8542e" },
  { id: 5, title: "Web Design", category: "Web", image: "/images/web-ui.jpg", color: "#c9a24b" },
  { id: 6, title: "Hoarding Design", category: "Advertising", image: "/images/hoarding-signage.jpg", color: "#2d2d2d" },
];

export default function PortfolioOverlay() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      <Seo title="Portfolio Overlay" description="Overlay effect portfolio" path="/portfolio-overlay" />
      <PageHeader eyebrow="Portfolio" title="Overlay Showcase" subtitle="Hover to reveal project details" />

      <section className="section">
        <div className="container">
          <div className="po-grid">
            {projects.map((project) => (
              <Reveal key={project.id} animation="elastic" className="po-item">
                <div 
                  className={`po-card ${hoveredId === project.id ? "po-card--hovered" : ""}`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ '--color': project.color }}
                >
                  <img src={project.image} alt={project.title} />
                  <div className="po-card__overlay">
                    <div className="po-card__content">
                      <span className="po-card__category">{project.category}</span>
                      <h3 className="po-card__title">{project.title}</h3>
                      <span className="po-card__line"></span>
                      <span className="po-card__view">View Project →</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Inspired?" title="Let's create something together" subtitle="We'd love to work on your next project" />
    </>
  );
}