import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal/Reveal";
import "./EchoStats.css";

export default function EchoStats({ stats }) {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts(stats.map((s) => {
        const target = parseInt(s.value.replace(/[^0-9]/g, ""), 10);
        if (isNaN(target)) return s.value;
        const current = Math.round(target * ease);
        return s.value.includes("+") ? `${current}+` : `${current}`;
      }));
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [visible, stats]);

  return (
    <section className="echo-stats" ref={ref}>
      <div className="container echo-stats__grid">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="echo-stats__item">
            <span className="echo-stats__value">{counts[i] || s.value}</span>
            <span className="echo-stats__label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
