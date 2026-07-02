import { useState } from "react";
import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import "./PortfolioListLarge.css";

const projects = [
  { id: 1, title: "Brand Identity Design", category: "Branding", image: "/images/brand-identity.jpg", desc: "Complete brand identity for a tech startup" },
  { id: 2, title: "Packaging Design", category: "Packaging", image: "/images/packaging-design.jpg", desc: "Premium packaging for organic products" },
  { id: 3, title: "Social Media Campaign", category: "Social", image: "/images/digital-design.jpg", desc: "Instagram campaign for fashion brand" },
  { id: 4, title: "Print Materials", category: "Print", image: "/images/print-materials.jpg", desc: "Business cards, brochures, and more" },
  { id: 5, title: "Web Design", category: "Web", image: "/images/web-ui.jpg", desc: "Modern responsive website design" },
  { id: 6, title: "Hoarding Design", category: "Advertising", image: "/images/hoarding-signage.jpg", desc: "Large format outdoor advertising" },
];

export default function PortfolioListLarge() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      <Seo title="Portfolio List Large" description="Large portfolio list view" path="/portfolio-list-large" />
      <PageHeader eyebrow="Portfolio" title="Our Work in Detail" subtitle="A comprehensive view of our design projects" />

      <section className="section">
        <div className="container">
          <div className="pll-grid">
            {projects.map((project) => (
              <Reveal key={project.id} animation="slide-up">
                <div 
                  className={`pll-item ${hoveredId === project.id ? "pll-item--hovered" : ""}`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="pll-item__image">
                    <img src={project.image} alt={project.title} />
                    <div className="pll-item__overlay">
                      <span className="pll-item__category">{project.category}</span>
                    </div>
                  </div>
                  <div className="pll-item__content">
                    <h3 className="pll-item__title">{project.title}</h3>
                    <p className="pll-item__desc">{project.desc}</p>
                    <span className="pll-item__arrow">View Project →</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Have a project?" title="Let's work together" subtitle="Share your vision and let's bring it to life." />
    </>
  );
}