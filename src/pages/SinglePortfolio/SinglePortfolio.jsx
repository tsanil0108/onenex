import { useParams, NavLink } from "react-router-dom";
import Seo from "../../components/Seo/Seo";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import "./SinglePortfolio.css";

const projectData = {
  1: { title: "Brand Identity Design", category: "Branding", image: "/images/brand-identity.jpg", desc: "Complete brand identity for a tech startup", client: "NexTech", year: "2024", fullDesc: "We created a comprehensive brand identity system including logo, color palette, typography, and brand guidelines. The project involved extensive research and multiple iterations to capture the innovative spirit of the client." },
  2: { title: "Packaging Design", category: "Packaging", image: "/images/packaging-design.jpg", desc: "Premium packaging for organic products", client: "GreenVibes", year: "2024", fullDesc: "Designed sustainable packaging for a premium organic food brand. The packaging uses eco-friendly materials with a modern design that communicates freshness and quality." },
  3: { title: "Social Campaign", category: "Social", image: "/images/digital-design.jpg", desc: "Instagram campaign for fashion brand", client: "StyleHub", year: "2023", fullDesc: "Created a cohesive social media campaign for a fashion brand. The campaign included custom illustrations, animations, and a consistent visual language across all platforms." },
};

export default function SinglePortfolio() {
  const { id } = useParams();
  const project = projectData[id];

  if (!project) {
    return (
      <div className="sp-notfound">
        <h1>Project not found</h1>
        <NavLink to="/portfolio-grid">Back to Portfolio</NavLink>
      </div>
    );
  }

  return (
    <>
      <Seo title={project.title} description={project.desc} path={`/portfolio-single/${id}`} />
      
      <section className="sp-hero" style={{ backgroundImage: `url(${project.image})` }}>
        <div className="sp-hero__overlay">
          <Reveal as="div" className="container sp-hero__content" animation="fade-up">
            <span className="sp-hero__category">{project.category}</span>
            <h1 className="sp-hero__title">{project.title}</h1>
            <p className="sp-hero__desc">{project.desc}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sp-grid">
            <Reveal as="div" className="sp-info" animation="slide-right">
              <h3 className="sp-info__title">Project Details</h3>
              <div className="sp-info__item">
                <span className="sp-info__label">Client</span>
                <span className="sp-info__value">{project.client}</span>
              </div>
              <div className="sp-info__item">
                <span className="sp-info__label">Year</span>
                <span className="sp-info__value">{project.year}</span>
              </div>
              <div className="sp-info__item">
                <span className="sp-info__label">Category</span>
                <span className="sp-info__value">{project.category}</span>
              </div>
            </Reveal>
            <Reveal as="div" className="sp-desc" animation="slide-left" delay={0.1}>
              <p>{project.fullDesc}</p>
              <NavLink to="/portfolio-grid" className="sp-back">← Back to Portfolio</NavLink>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection eyebrow="Interested?" title="Let's work together" subtitle="We'd love to create something amazing for you" />
    </>
  );
}