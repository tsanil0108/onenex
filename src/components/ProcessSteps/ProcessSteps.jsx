import { useRef, useState, useEffect } from "react";
import "./ProcessSteps.css";

export default function ProcessSteps({ steps }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const stepRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    if (!stepRefs.current[index]) return;
    const rect = stepRefs.current[index].getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setActiveIndex(null);
  };

  return (
    <div className="process-steps" ref={containerRef}>
      {steps.map((step, index) => (
        <div 
          key={step.step}
          ref={el => stepRefs.current[index] = el}
          className={`process-step ${activeIndex === index ? 'process-step--active' : ''}`}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseLeave={handleMouseLeave}
          style={{ 
            '--delay': index * 0.1,
            '--mouse-x': mousePosition.x,
            '--mouse-y': mousePosition.y,
          }}
        >
          {/* 3D Tilt effect layer */}
          <div className="process-step__tilt">
            {/* Number with animated ring */}
            <div className="process-step__number">
              <div className="process-step__number-ring">
                <span>0{index + 1}</span>
              </div>
              <div className="process-step__line">
                <div className="process-step__line-fill"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="process-step__content">
              <h3 className="process-step__title">
                {step.step}
                <span className="process-step__title-dot">.</span>
              </h3>
              <p className="process-step__detail">{step.detail}</p>
              
              {/* Animated icon */}
              <div className="process-step__icon-wrapper">
                <div className="process-step__icon">
                  <svg viewBox="0 0 24 24" width="28" height="28">
                    <circle cx="12" cy="12" r="10" className="process-step__circle" />
                    <polyline points="12 6 12 12 16 14" className="process-step__arrow" />
                  </svg>
                </div>
                <span className="process-step__step-label">Step {index + 1}</span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="process-step__glow" />
            <div className="process-step__corner process-step__corner--tl" />
            <div className="process-step__corner process-step__corner--tr" />
            <div className="process-step__corner process-step__corner--bl" />
            <div className="process-step__corner process-step__corner--br" />
            
            {/* Progress indicator */}
            <div className="process-step__progress">
              <div 
                className="process-step__progress-bar" 
                style={{ 
                  width: activeIndex === index ? '100%' : '0%',
                  transitionDelay: '0.2s'
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}