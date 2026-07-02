import { useRef, useState, useEffect } from "react";
import { services } from "../../data/content";
import "./PressCube.css";

const FACE_GRADIENTS = [
  "linear-gradient(135deg, var(--accent), var(--gold))",
  "linear-gradient(135deg, var(--gold), var(--accent-dim))",
  "linear-gradient(135deg, var(--accent-dim), #4a1f10)",
  "linear-gradient(135deg, var(--accent), var(--accent-dim))",
  "linear-gradient(135deg, var(--gold), var(--accent))",
  "linear-gradient(135deg, var(--accent-dim), var(--gold))",
];

// Project images with local paths
const projectImages = [
  { 
    id: 1, 
    src: "/images/brand-identity.jpg", 
    title: "Branding & Identity",
    subtitle: "Complete Brand Solutions",
    category: "Branding",
    color: "#e8542e"
  },
  { 
    id: 2, 
    src: "/images/digital-design.jpg", 
    title: "Graphic Design",
    subtitle: "Creative Design Solutions",
    category: "Design",
    color: "#c9a24b"
  },
  { 
    id: 3, 
    src: "/images/print-materials.jpg", 
    title: "Print Production",
    subtitle: "Quality Printing Services",
    category: "Print",
    color: "#2d2d2d"
  },
  { 
    id: 4, 
    src: "/images/hoarding-signage.jpg", 
    title: "Outdoor Advertising",
    subtitle: "Maximum Visibility",
    category: "Advertising",
    color: "#e8542e"
  },
  { 
    id: 5, 
    src: "/images/web-ui.jpg", 
    title: "Web Design",
    subtitle: "Digital Presence",
    category: "Web",
    color: "#c9a24b"
  },
  { 
    id: 6, 
    src: "/images/packaging-design.jpg", 
    title: "Interior Branding",
    subtitle: "Physical Branding",
    category: "Interior",
    color: "#2d2d2d"
  },
];

export default function PressCube({ mode = "scroller" }) {
  const wrapRef = useRef(null);
  const scrollerRef = useRef(null);
  const rafRef = useRef(null);
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [rotation, setRotation] = useState(0);

  const handleMove = (e) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      wrap.style.setProperty("--tilt-x", `${py * -10}deg`);
      wrap.style.setProperty("--tilt-y", `${px * 16}deg`);
    });
  };

  const handleLeave = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.style.setProperty("--tilt-x", "0deg");
    wrap.style.setProperty("--tilt-y", "0deg");
  };

  const faces = services.slice(0, 6);

  // Handle image load
  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  // Auto-scroll with smooth animation
  useEffect(() => {
    if (isPaused) return;
    
    let startTime = Date.now();
    const animate = () => {
      if (isPaused) return;
      const elapsed = (Date.now() - startTime) / 1000;
      const angle = (elapsed * 12) % 360; // 12 degrees per second = 30 seconds per full rotation
      
      if (scrollerRef.current) {
        const track = scrollerRef.current;
        track.style.transform = `rotateY(${angle}deg)`;
        const newIndex = Math.floor((angle % 360) / 60);
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, currentIndex]);

  // Image Scroller Mode
  const renderScroller = () => {
    return (
      <div className="pcube__scroller">
        <div className="pcube__scroller-glow" aria-hidden="true" />
        <div className="pcube__scroller-reflection" aria-hidden="true" />
        <div className="pcube__scroller-track" ref={scrollerRef}>
          {projectImages.map((img, index) => {
            const angle = (index / projectImages.length) * 360;
            return (
              <div
                key={img.id}
                className={`pcube__scroller-card ${currentIndex === index ? 'pcube__scroller-card--active' : ''}`}
                style={{
                  "--i": index,
                  "--n": projectImages.length,
                  transform: `rotateY(${angle}deg) translateZ(220px)`,
                  background: img.color,
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => {
                  const track = scrollerRef.current;
                  if (track) {
                    const targetAngle = -(index * 60);
                    track.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    track.style.transform = `rotateY(${targetAngle}deg)`;
                    setCurrentIndex(index);
                    setTimeout(() => {
                      if (track) {
                        track.style.transition = '';
                      }
                    }, 800);
                  }
                }}
              >
                <div className="pcube__scroller-image">
                  <img 
                    src={img.src} 
                    alt={img.title}
                    className="pcube__scroller-img"
                    onLoad={() => handleImageLoad(img.id)}
                    loading="lazy"
                  />
                  {!loadedImages[img.id] && (
                    <div className="pcube__scroller-placeholder">
                      <span className="pcube__scroller-icon">📐</span>
                    </div>
                  )}
                  <div className="pcube__scroller-category">{img.category}</div>
                </div>
                <div className="pcube__scroller-info">
                  <div className="pcube__scroller-info-content">
                    <h4>{img.title}</h4>
                    <p className="pcube__scroller-subtitle">{img.subtitle}</p>
                  </div>
                  <span className="pcube__scroller-badge">VIEW PROJECT →</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pcube__scroller-controls">
          <button 
            className="pcube__scroller-btn pcube__scroller-btn--prev"
            onClick={() => {
              const track = scrollerRef.current;
              if (track) {
                setIsPaused(true);
                const newIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
                const targetAngle = -(newIndex * 60);
                track.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                track.style.transform = `rotateY(${targetAngle}deg)`;
                setCurrentIndex(newIndex);
                setTimeout(() => {
                  setIsPaused(false);
                  if (track) {
                    track.style.transition = '';
                  }
                }, 800);
              }
            }}
            aria-label="Previous project"
          >
            ‹
          </button>
          <div className="pcube__scroller-dots">
            {projectImages.map((_, i) => (
              <span 
                key={i} 
                className={`pcube__scroller-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  const track = scrollerRef.current;
                  if (track) {
                    setIsPaused(true);
                    const targetAngle = -(i * 60);
                    track.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    track.style.transform = `rotateY(${targetAngle}deg)`;
                    setCurrentIndex(i);
                    setTimeout(() => {
                      setIsPaused(false);
                      if (track) {
                        track.style.transition = '';
                      }
                    }, 800);
                  }
                }}
              />
            ))}
          </div>
          <button 
            className="pcube__scroller-btn pcube__scroller-btn--next"
            onClick={() => {
              const track = scrollerRef.current;
              if (track) {
                setIsPaused(true);
                const newIndex = (currentIndex + 1) % projectImages.length;
                const targetAngle = -(newIndex * 60);
                track.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                track.style.transform = `rotateY(${targetAngle}deg)`;
                setCurrentIndex(newIndex);
                setTimeout(() => {
                  setIsPaused(false);
                  if (track) {
                    track.style.transition = '';
                  }
                }, 800);
              }
            }}
            aria-label="Next project"
          >
            ›
          </button>
        </div>
        <p className="pcube__scroller-hint">Hover to pause · Click to explore</p>
      </div>
    );
  };

  // Original Drum Mode
  const renderDrum = () => {
    return (
      <>
        <div className="pcube__medallion">
          <div className="pcube__coin-glow" />
          <div className="pcube__coin">
            <div className="pcube__coin-face pcube__coin-face--front">
              <img src="/favicon.svg" alt="OneNex Studio" className="pcube__logo" />
            </div>
            <div className="pcube__coin-face pcube__coin-face--back">
              <span className="pcube__coin-word">One</span>
              <span className="pcube__coin-word pcube__coin-word--accent">Nex</span>
            </div>
            <div className="pcube__coin-edge" />
          </div>
        </div>

        <div className="pcube__rod" />

        <div className="pcube__drum">
          {faces.map((s, i) => (
            <div
              key={s.id}
              className="pcube__face"
              style={{
                "--i": i,
                "--n": faces.length,
                "--face-grad": FACE_GRADIENTS[i % FACE_GRADIENTS.length],
              }}
            >
              <span className="pcube__face-bar">{s.title.charAt(0)}</span>
              <span className="pcube__face-code">{s.code}</span>
              <span className="pcube__face-title">{s.title}</span>
              <span className="pcube__face-short">{s.short}</span>
            </div>
          ))}
        </div>

        <div className="pcube__shadow" />
      </>
    );
  };

  return (
    <div
      className={`pcube ${mode === 'scroller' ? 'pcube--scroller' : ''}`}
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-hidden="true"
    >
      <div className="pcube__tilt">
        <div className={`pcube__float ${mode === 'scroller' ? 'pcube__float--scroller' : ''}`}>
          {mode === 'scroller' ? renderScroller() : renderDrum()}
        </div>
      </div>
    </div>
  );
}