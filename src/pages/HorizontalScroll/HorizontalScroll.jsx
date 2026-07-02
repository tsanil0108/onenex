import { useRef, useEffect, useState } from "react";
import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import "./HorizontalScroll.css";

const items = [
  { id: 1, title: "Brand Identity", color: "#e8542e", icon: "✦", desc: "Complete brand solutions" },
  { id: 2, title: "Graphic Design", color: "#c9a24b", icon: "◆", desc: "Creative design work" },
  { id: 3, title: "Print Production", color: "#2d2d2d", icon: "■", desc: "Quality printing" },
  { id: 4, title: "Web Design", color: "#e8542e", icon: "●", desc: "Modern websites" },
  { id: 5, title: "Packaging", color: "#c9a24b", icon: "▲", desc: "Sustainable packaging" },
  { id: 6, title: "Advertising", color: "#2d2d2d", icon: "◈", desc: "Outdoor advertising" },
  { id: 7, title: "Interior", color: "#e8542e", icon: "✦", desc: "Interior branding" },
];

export default function HorizontalScroll() {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
    };

    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <>
      <Seo title="Horizontal Scroll" description="Horizontal scrolling showcase" path="/horizontal-scroll" />
      <PageHeader eyebrow="Explore" title="Horizontal Scroll" subtitle="Scroll horizontally to explore our work" />

      <section className="section hs-section">
        <Reveal as="div" className="hs-wrapper" animation="fade-up">
          <div className="hs-track" ref={scrollRef}>
            {items.map((item) => (
              <div key={item.id} className="hs-item" style={{ '--color': item.color }}>
                <div className="hs-item__icon">{item.icon}</div>
                <h3 className="hs-item__title">{item.title}</h3>
                <p className="hs-item__desc">{item.desc}</p>
                <span className="hs-item__number">0{item.id}</span>
              </div>
            ))}
          </div>
          
          <div className="hs-progress">
            <div className="hs-progress__bar" style={{ width: `${scrollProgress * 100}%` }} />
          </div>
          
          <div className="hs-hint">
            <span>← Scroll horizontally →</span>
          </div>
        </Reveal>
      </section>

      <CTASection eyebrow="Explore more" title="Discover our full portfolio" subtitle="We have more to show you" />
    </>
  );
}