import { useEffect, useState, useRef } from "react";
import "./TestimonialSlider.css";

export default function TestimonialSlider({ testimonials }) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const trackRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const handleNext = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setIndex((i) => (i + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleDotClick = (i) => {
    if (isAnimating || i === index) return;
    setDirection(i > index ? 1 : -1);
    setIsAnimating(true);
    setIndex(i);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      handleNext();
    } else if (touchEndX - touchStartX > 50) {
      handlePrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, isAnimating]);

  return (
    <div 
      className="testi"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="testi__container">
        <div 
          className="testi__track"
          ref={trackRef}
          style={{ 
            transform: `translateX(-${index * 100}%)`,
            transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`
          }}
        >
          {testimonials.map((t, i) => (
            <div 
              className={`testi__item ${i === index ? 'testi__item--active' : ''}`}
              key={t.author}
            >
              <div className="testi__item-content">
                {/* Avatar with animation */}
                {t.avatar && (
                  <div className="testi__avatar-wrapper">
                    <img 
                      src={t.avatar} 
                      alt={t.author} 
                      className="testi__avatar"
                      loading="lazy"
                    />
                    <div className="testi__avatar-ring"></div>
                  </div>
                )}
                
                {/* Quote with animation */}
                <div className="testi__quote-wrapper">
                  <span className="testi__quote-icon">"</span>
                  <p className="testi__quote">&ldquo;{t.quote}&rdquo;</p>
                </div>
                
                {/* Author info with animation */}
                <footer className="testi__footer">
                  <div className="testi__author-info">
                    <strong className="testi__author">{t.author}</strong>
                    {t.role && <span className="testi__role">{t.role}</span>}
                    {t.company && <span className="testi__company">{t.company}</span>}
                  </div>
                  {t.rating && (
                    <div className="testi__rating">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`testi__star ${i < t.rating ? 'testi__star--filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="testi__controls">
        <button 
          className="testi__nav testi__nav--prev"
          onClick={handlePrev}
          aria-label="Previous testimonial"
          disabled={isAnimating}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="testi__dots">
          {testimonials.map((t, i) => (
            <button
              key={t.author}
              className={`testi__dot ${i === index ? "testi__dot--active" : ""}`}
              onClick={() => handleDotClick(i)}
              aria-label={`Show testimonial ${i + 1}`}
            >
              <span className="testi__dot-progress"></span>
            </button>
          ))}
        </div>

        <button 
          className="testi__nav testi__nav--next"
          onClick={handleNext}
          aria-label="Next testimonial"
          disabled={isAnimating}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}