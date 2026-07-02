import Scene3D from "../Scene3D/Scene3D";
import Reveal from "../Reveal/Reveal";
import "./PageHeader.css";

const SHAPES = ["knot", "ico", "octa", "dodeca", "torus"];

export default function PageHeader({ eyebrow, title, subtitle, shape }) {
  // Pick a shape deterministically from the title so each page keeps the
  // same shape on every visit, without every page needing to pass one.
  const resolvedShape =
    shape || SHAPES[(title?.length || 0) % SHAPES.length];

  // Pick a color based on the shape
  const getColor = (shape) => {
    const colors = {
      knot: "#e8542e",
      ico: "#c9a24b",
      octa: "#2d2d2d",
      dodeca: "#e8542e",
      torus: "#c9a24b",
    };
    return colors[shape] || "#e8542e";
  };

  const getWireColor = (shape) => {
    const colors = {
      knot: "#a9762b",
      ico: "#8a7a4a",
      octa: "#666",
      dodeca: "#a9762b",
      torus: "#8a7a4a",
    };
    return colors[shape] || "#a9762b";
  };

  return (
    <header className="page-header">
      <div className="container page-header__inner">
        <Reveal as="div" className="page-header__content" animation="fade-up" duration={0.8}>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="page-header__title">{title}</h1>
          {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
        </Reveal>
        <Reveal as="div" className="page-header__scene" animation="scale" delay={0.15}>
          <Scene3D 
            shape={resolvedShape} 
            size={190} 
            scrollFactor={1.4}
            color={getColor(resolvedShape)}
            wireColor={getWireColor(resolvedShape)}
            float={true}
          />
        </Reveal>
      </div>
      <div className="page-header__grid" aria-hidden="true" />
    </header>
  );
}