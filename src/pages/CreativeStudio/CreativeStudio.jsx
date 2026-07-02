import { useState } from "react";
import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import "./CreativeStudio.css";

const projects = [
  {
    id: 1,
    title: "Brand Identity Design",
    category: "Branding",
    color: "#e8542e",
    icon: "✦",
    year: "2025",
    desc: "A complete visual identity system — logo, type, and color built to hold up everywhere.",
    image:
      "https://images.unsplash.com/photo-1758843415051-34a01dfcc227?fm=jpg&q=70&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Packaging Design",
    category: "Packaging",
    color: "#c9a24b",
    icon: "◆",
    year: "2025",
    desc: "Shelf-ready packaging that carries the brand story from box to unboxing.",
    image:
      "https://images.unsplash.com/photo-1678189481940-59df65baf945?fm=jpg&q=70&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Website Design",
    category: "Web",
    color: "#2d2d2d",
    icon: "●",
    year: "2024",
    desc: "A fast, accessible site design tuned for conversion without losing personality.",
    image:
      "https://images.unsplash.com/photo-1764170347100-36f930110fb7?fm=jpg&q=70&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Social Media Graphics",
    category: "Social",
    color: "#e8542e",
    icon: "▲",
    year: "2025",
    desc: "A flexible template system so every post feels on-brand, even at speed.",
    image:
      "https://images.unsplash.com/photo-1768522712177-e7a8cb038916?fm=jpg&q=70&w=1200&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Print Materials",
    category: "Print",
    color: "#c9a24b",
    icon: "■",
    year: "2024",
    desc: "Brochures, business cards, and collateral designed to feel as good as they look.",
    image:
      "https://images.unsplash.com/photo-1687463220919-ea73c7d5a3ac?fm=jpg&q=70&w=1200&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Motion Graphics",
    category: "Motion",
    color: "#2d2d2d",
    icon: "▶",
    year: "2025",
    desc: "Short-form animation and motion identity work built for social and product launches.",
    image:
      "https://images.unsplash.com/photo-1742679697291-affd3365ebe4?fm=jpg&q=70&w=1200&auto=format&fit=crop"
  }
];

export default function CreativeStudio() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <Seo
        title="Creative Studio — Design & Innovation"
        description="Explore our creative studio work including branding, packaging, web design, and more."
        path="/creative-studio"
      />

      <PageHeader
        eyebrow="Creative Studio"
        title="Design that stands out"
        subtitle="Every project is crafted with creativity, precision, and purpose."
      />

      <section className="section">
        <div className="container">
          <div className="cs-grid">
            {projects.map((project, index) => (
              <div className={`cs-tile cs-tile--${index + 1}`} key={project.id}>
                <Reveal delay={index * 0.05} animation="scale">
                  <article
                    className={`cs-card ${
                      hoveredIndex === index ? "cs-card--hovered" : ""
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ "--color": project.color }}
                  >
                    <img
                      className="cs-card__img"
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className="cs-card__scrim"></div>

                    <span className="cs-card__year">{project.year}</span>
                    <span className="cs-card__icon">{project.icon}</span>

                    <div className="cs-card__label">
                      <span className="cs-card__category">{project.category}</span>
                      <h3 className="cs-card__title">{project.title}</h3>

                      <div className="cs-card__hover-copy">
                        <p>{project.desc}</p>
                        <span className="cs-card__view">
                          View project <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Start a project"
        title="Let's create something amazing"
        subtitle="From concept to completion, we bring your ideas to life."
      />
    </>
  );
}