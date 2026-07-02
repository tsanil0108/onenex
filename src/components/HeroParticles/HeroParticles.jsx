import { useEffect, useRef } from "react";
import "./HeroParticles.css";

const SHAPES = [
  { type: "cube", size: 28, x: 12, y: 18, z: -80, delay: 0, speed: 14 },
  { type: "ring", size: 44, x: 78, y: 12, z: -120, delay: 1.2, speed: 18 },
  { type: "pyramid", size: 22, x: 88, y: 62, z: -60, delay: 0.6, speed: 12 },
  { type: "cube", size: 18, x: 6, y: 72, z: -100, delay: 2, speed: 16 },
  { type: "ring", size: 32, x: 42, y: 8, z: -140, delay: 0.3, speed: 20 },
  { type: "pyramid", size: 16, x: 58, y: 82, z: -70, delay: 1.8, speed: 11 },
  { type: "cube", size: 14, x: 92, y: 38, z: -90, delay: 0.9, speed: 15 },
  { type: "ring", size: 24, x: 22, y: 48, z: -110, delay: 2.4, speed: 13 },
];

export default function HeroParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      container.style.setProperty("--mouse-x", `${px * 30}px`);
      container.style.setProperty("--mouse-y", `${py * 20}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hero-particles" ref={containerRef} aria-hidden="true">
      <div className="hero-particles__scene">
        {SHAPES.map((shape, i) => (
          <div
            key={i}
            className={`hero-particles__shape hero-particles__shape--${shape.type}`}
            style={{
              "--size": `${shape.size}px`,
              "--x": `${shape.x}%`,
              "--y": `${shape.y}%`,
              "--z": `${shape.z}px`,
              "--delay": `${shape.delay}s`,
              "--speed": `${shape.speed}s`,
            }}
          />
        ))}
      </div>
      <div className="hero-particles__glow hero-particles__glow--1" />
      <div className="hero-particles__glow hero-particles__glow--2" />
    </div>
  );
}
