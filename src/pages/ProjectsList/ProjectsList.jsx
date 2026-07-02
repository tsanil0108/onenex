import { useState } from "react";
import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import "./ProjectsList.css";

const projects = [
  { id: 1, title: "Brand Identity for Tech Startup", client: "NexTech", year: "2024", status: "Completed", color: "#e8542e" },
  { id: 2, title: "Packaging Design for Organic Food", client: "GreenVibes", year: "2024", status: "Completed", color: "#c9a24b" },
  { id: 3, title: "Website Redesign for E-commerce", client: "ShopWave", year: "2023", status: "In Progress", color: "#2d2d2d" },
  { id: 4, title: "Social Media Campaign for Fashion", client: "StyleHub", year: "2023", status: "Completed", color: "#e8542e" },
  { id: 5, title: "Print Materials for Conference", client: "Innovate2023", year: "2023", status: "Completed", color: "#c9a24b" },
  { id: 6, title: "Motion Graphics for Product Launch", client: "LaunchPad", year: "2024", status: "In Progress", color: "#2d2d2d" },
];

export default function ProjectsList() {
  const [activeId, setActiveId] = useState(null);

  return (
    <>
      <Seo
        title="Projects List — Our Recent Work"
        description="A complete list of our design and branding projects."
        path="/projects-list"
      />

      <PageHeader
        eyebrow="Projects"
        title="Our recent work"
        subtitle="A complete list of projects we've delivered for our clients."
      />

      <section className="section">
        <div className="container">
          <div className="pl-list">
            <div className="pl-header">
              <span>Project</span>
              <span>Client</span>
              <span>Year</span>
              <span>Status</span>
            </div>
            {projects.map((project) => (
              <Reveal key={project.id} animation="slide-up">
                <div 
                  className={`pl-item ${activeId === project.id ? 'pl-item--active' : ''}`}
                  onMouseEnter={() => setActiveId(project.id)}
                  onMouseLeave={() => setActiveId(null)}
                >
                  <span className="pl-item__title">{project.title}</span>
                  <span className="pl-item__client">{project.client}</span>
                  <span className="pl-item__year">{project.year}</span>
                  <span 
                    className="pl-item__status"
                    style={{ '--color': project.color }}
                  >
                    {project.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Work with us"
        title="Let's add your project to the list"
        subtitle="We're always looking for exciting new projects to work on."
      />
    </>
  );
}