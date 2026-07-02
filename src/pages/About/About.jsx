import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import StatStrip from "../../components/StatStrip/StatStrip";
import ProcessSteps from "../../components/ProcessSteps/ProcessSteps";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import { stats, process } from "../../data/content";
import "./About.css";

export default function About() {
  return (
    <>
      <Seo
        title="About Us — Our Studio & Process"
        description="OneNex Studio is a branding and print studio based in Thane, Mumbai. Learn about our story, our process and why design and production live under one roof."
        path="/about"
      />

      <PageHeader
        eyebrow="About OneNex"
        title="A design studio that also runs the press"
        subtitle="We started OneNex because good design too often died in translation between the designer and the printer. So we became both."
      />

      <section className="section">
        <div className="container about__grid">
          <Reveal className="about__lead">
            <span className="eyebrow">Our story</span>
            <h2>Design and production, one conversation</h2>
            <p>
              OneNex was founded in Thane on a simple frustration: a beautifully
              designed logo would arrive at the printer and come out looking nothing
              like the file. So we built a studio where the same team designs the
              brand and runs the press that prints it.
            </p>
            <p>
              Today that means a client can walk in with an idea and walk out with a
              finished identity — logo, cards, packaging, signage and a website —
              produced by people who never had to hand the file to someone else.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="about__panel">
            <h3>What guides the work</h3>
            <ul className="about__values">
              <li>
                <strong>Consistency first.</strong> A brand should look like one
                decision, not six separate vendors.
              </li>
              <li>
                <strong>No hand-offs.</strong> The person who designs it understands
                how it will be produced.
              </li>
              <li>
                <strong>Plain conversations.</strong> We explain choices in terms of
                your business, not design jargon.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <StatStrip stats={stats} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Process</span>
            <h2>How a project moves through our studio</h2>
          </Reveal>
          <ProcessSteps steps={process} />
        </div>
      </section>

      <CTASection
        eyebrow="Work with us"
        title="Bring us the problem you're trying to solve."
        subtitle="We'll tell you honestly whether design, print or both will fix it."
      />
    </>
  );
}
