import { useState } from "react";
import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import "./PortfolioStacked.css";

const items = [
  { id: 1, title: "Brand Identity", category: "Branding", year: "2024", color: "#e8542e" },
  { id: 2, title: "Packaging Design", category: "Packaging", year: "2024", color: "#c9a24b" },
  { id: 3, title: "Website Redesign", category: "Web", year: "2023", color: "#2d2d2d" },
  { id: 4, title: "Social Campaign", category: "Social", year: "2023", color: "#e8542e" },
  { id: 5, title: "Print Collateral", category: "Print", year: "2022", color: "#c9a24b" },
  { id: 6, title: "Motion Graphics", category: "Motion", year: "2022", color: "#2d2d2d" },
];

export default function PortfolioStacked() {
  const [activeId, setActiveId] = useState(null);

  return (
    <>
      <Seo
        title="Portfolio Stacked — Our Best Work"
        description="A curated collection of our best design and branding projects."
        path="/portfolio-stacked"
      />

      <PageHeader
        eyebrow="Portfolio"
        title="Our best work, stacked"
        subtitle="A curated collection of projects that showcase our creative capabilities."
      />

      <section className="section">
        <div className="container">
          <div className="ps-grid">
            {items.map((item) => (
              <Reveal key={item.id} animation="slide-up">
                <div 
                  className={`ps-item ${activeId === item.id ? 'ps-item--active' : ''}`}
                  onMouseEnter={() => setActiveId(item.id)}
                  onMouseLeave={() => setActiveId(null)}
                  style={{ '--color': item.color }}
                >
                  <div className="ps-item__number">0{item.id}</div>
                  <div className="ps-item__content">
                    <h3 className="ps-item__title">{item.title}</h3>
                    <span className="ps-item__category">{item.category}</span>
                    <span className="ps-item__year">{item.year}</span>
                  </div>
                  <div className="ps-item__arrow">→</div>
                  <div className="ps-item__bar"></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="View all work"
        title="See more of what we do"
        subtitle="Every project tells a story. Let's tell yours."
      />
    </>
  );
}