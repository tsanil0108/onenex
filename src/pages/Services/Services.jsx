import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import { services } from "../../data/content";
import "./Services.css";

export default function Services() {
  return (
    <>
      <Seo
        title="Services — Branding, Print, Web & Signage"
        description="Explore OneNex Studio's services: branding and identity, graphic design, print production, outdoor advertising, web design and interior branding."
        path="/services"
      />

      <PageHeader
        eyebrow="Services"
        title="Every layer of your brand, produced in-house"
        subtitle="Design and production live under the same roof, so nothing gets lost in translation between a concept and the finished print or page."
      />

      <section className="section">
        <div className="container">
          <div className="services-page__grid">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Not sure where to start"
        title="Tell us the problem, not the service."
        subtitle="Describe what you need and we'll map it to the right mix of design and print."
      />
    </>
  );
}