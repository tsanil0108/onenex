import { useRef, useState, useEffect } from "react";
import "./PressStack.css";

const CARDS = [
  { 
    label: "Logo", 
    tag: "Identity", 
    rot: -10, 
    x: -120, 
    y: -30, 
    z: 40, 
    color: "var(--accent)",
    icon: "✦",
    description: "Brand Identity"
  },
  { 
    label: "Card", 
    tag: "Print", 
    rot: 4, 
    x: 40, 
    y: -60, 
    z: 90, 
    color: "var(--gold)",
    icon: "📇",
    description: "Business Cards"
  },
  { 
    label: "Pack", 
    tag: "Design", 
    rot: -3, 
    x: 130, 
    y: 40, 
    z: 20, 
    color: "var(--paper)",
    icon: "📦",
    description: "Packaging"
  },
  { 
    label: "Site", 
    tag: "Web", 
    rot: 12, 
    x: -60, 
    y: 70, 
    z: 60, 
    color: "var(--accent-dim)",
    icon: "🌐",
    description: "Web Design"
  },
];

export default function PressStack() {
  const wrapRef = useRef(null);
  const rafRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFloating, setIsFloating] = useState(true);

  const handleMove = (e) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    setMousePosition({ x: px, y: py });

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      wrap.style.setProperty("--tilt-x", `${py * -16}deg`);
      wrap.style.setProperty("--tilt-y", `${px * 20}deg`);
      wrap.style.setProperty("--glow-x", `${px * 100}%`);
      wrap.style.setProperty("--glow-y", `${py * 100}%`);
    });
  };

  const handleLeave = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.style.setProperty("--tilt-x", `0deg`);
    wrap.style.setProperty("--tilt-y", `0deg`);
    setMousePosition({ x: 0, y: 0 });
    setHoveredIndex(null);
  };

  const handleCardHover = (index) => {
    setHoveredIndex(index);
    setIsFloating(false);
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
    setIsFloating(true);
  };

  return (
    <div
      className="press"
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-hidden="true"
    >
      <div className="press__stage">
        {/* Background glow */}
        <div className="press__glow" />
        
        {/* Floating particles */}
        <div className="press__particles">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="press__particle"
              style={{
                '--delay': `${i * 0.5}s`,
                '--size': `${Math.random() * 4 + 2}px`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--duration': `${Math.random() * 4 + 3}s`,
              }}
            />
          ))}
        </div>

        {/* Cards */}
        {CARDS.map((c, i) => (
          <div
            key={c.label}
            className={`press__card ${hoveredIndex === i ? 'press__card--hovered' : ''} ${hoveredIndex !== null && hoveredIndex !== i ? 'press__card--dimmed' : ''}`}
            style={{
              "--rot": `${c.rot}deg`,
              "--x": `${c.x}px`,
              "--y": `${c.y}px`,
              "--z": `${c.z}px`,
              "--delay": `${i * 0.12 + 0.2}s`,
              "--face": c.color,
              "--card-index": i,
            }}
            onMouseEnter={() => handleCardHover(i)}
            onMouseLeave={handleCardLeave}
          >
            <div className="press__card-inner">
              <div className="press__card-header">
                <span className="press__card-icon">{c.icon}</span>
                <span className="press__card-tag">{c.tag}</span>
              </div>
              
              <div className="press__card-body">
                <span className="press__card-label">{c.label}</span>
                <span className="press__card-description">{c.description}</span>
              </div>
              
              <div className="press__card-footer">
                <span className="press__card-arrow">→</span>
              </div>
            </div>
            
            {/* Card glow effect */}
            <div className="press__card-glow" />
            
            {/* Corner decorations */}
            <div className="press__card-corner press__card-corner--tl" />
            <div className="press__card-corner press__card-corner--tr" />
            <div className="press__card-corner press__card-corner--bl" />
            <div className="press__card-corner press__card-corner--br" />
          </div>
        ))}
        
        {/* Base plate */}
        <div className="press__plate">
          <div className="press__plate-ring" />
          <div className="press__plate-ring press__plate-ring--2" />
        </div>
        
        {/* Center label */}
        <div className="press__center">
          <span className="press__center-text">OneNex</span>
          <span className="press__center-sub">Studio</span>
        </div>
      </div>
    </div>
  );
}