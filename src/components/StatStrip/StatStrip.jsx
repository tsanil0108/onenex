import { useRef, useState, useEffect } from "react";
import Reveal from "../Reveal/Reveal";
import "./StatStrip.css";

export default function StatStrip({ stats }) {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const stripRef = useRef(null);

  // Animate numbers counting up
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (stripRef.current) {
      observer.observe(stripRef.current);
    }

    return () => {
      if (stripRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const startTime = Date.now();

    const animateCounts = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const newCounts = stats.map((s) => {
        const target = parseInt(s.value.replace(/[^0-9]/g, ''));
        if (isNaN(target)) return s.value;
        const current = Math.round(target * easeOut);
        return s.value.includes('+') ? `${current}+` : `${current}`;
      });

      setCounts(newCounts);

      if (progress < 1) {
        requestAnimationFrame(animateCounts);
      }
    };

    animateCounts();
  }, [isVisible, stats]);

  return (
    <div className="stat-strip" ref={stripRef}>
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="stat-strip__item-wrapper">
          <div className="stat-strip__item">
            <div className="stat-strip__value-wrapper">
              <span className="stat-strip__value">{counts[i] || s.value}</span>
              {s.icon && <span className="stat-strip__icon">{s.icon}</span>}
            </div>
            <span className="stat-strip__label">{s.label}</span>
            <div className="stat-strip__bar">
              <div className="stat-strip__bar-fill" style={{ 
                width: isVisible ? '100%' : '0%',
                transitionDelay: `${i * 0.15}s`
              }}></div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}