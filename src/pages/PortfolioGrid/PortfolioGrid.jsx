import { useState } from "react";
import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import "./PortfolioGrid.css";

const projects = [
  { id: 1, title: "Brand Identity", category: "Branding", image: "/images/brand-identity.jpg" },
  { id: 2, title: "Packaging Design", category: "Packaging", image: "/images/packaging-design.jpg" },
  { id: 3, title: "Social Campaign", category: "Social", image: "/images/digital-design.jpg" },
  { id: 4, title: "Print Materials", category: "Print", image: "/images/print-materials.jpg" },
  { id: 5, title: "Web Design", category: "Web", image: "/images/web-ui.jpg" },
  { id: 6, title: "Hoarding Design", category: "Advertising", image: "/images/hoarding-signage.jpg" },
  { id: 7, title: "Interior Design", category: "Interior", image: "/images/brand-identity.jpg" },
  { id: 8, title: "Motion Graphics", category: "Motion", image: "/images/digital-design.jpg" },
  { id: 9, title: "UI/UX Design", category: "Web", image: "/images/web-ui.jpg" },
];

const categories = ["All", "Branding", "Packaging", "Social", "Print", "Web", "Advertising", "Interior", "Motion"];

export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <>
      <Seo title="Portfolio Grid" description="Grid portfolio layout" path="/portfolio-grid" />
      <PageHeader eyebrow="Portfolio" title="Grid Showcase" subtitle="Browse our work by category" />

      <section className="section">
        <div className="container">
          <div className="pg-filters">
            {categories.map((cat) => (
              <button key={cat} className={`pg-filter ${filter === cat ? "pg-filter--active" : ""}`} onClick={() => setFilter(cat)}>
                {cat}
              </button>
            ))}
          </div>

          <div className="pg-grid">
            {filteredProjects.map((project) => (
              <Reveal key={project.id} animation="scale" className="pg-item">
                <div 
                  className={`pg-card ${hoveredId === project.id ? "pg-card--hovered" : ""}`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <img src={project.image} alt={project.title} />
                  <div className="pg-card__overlay">
                    <h4 className="pg-card__title">{project.title}</h4>
                    <span className="pg-card__category">{project.category}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="See more" title="Explore our full portfolio" subtitle="We have more projects to show you" />
    </>
  );
}