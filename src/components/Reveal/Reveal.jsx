import { useEffect, useRef, useState } from "react";
import "./Reveal.css";

/**
 * Wraps children and animates them into view once they cross into the viewport.
 * 
 * @param {string} animation - Animation type: 'fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'flip', 'rotate', 'blur', 'glow'
 * @param {number} delay - Delay in seconds before animation starts
 * @param {string} as - HTML element to render as (div, span, section, etc.)
 * @param {string} className - Additional CSS classes
 * @param {number} threshold - Intersection observer threshold (0-1)
 * @param {boolean} once - Whether to animate only once
 * @param {string} easing - Custom easing function
 * @param {number} duration - Animation duration in seconds
 * @param {number} distance - Distance for slide animations in pixels
 */
export default function Reveal({ 
  children, 
  delay = 0, 
  as = "div", 
  className = "",
  animation = "slide-up",
  threshold = 0.15,
  once = true,
  easing = "cubic-bezier(0.34, 1.56, 0.64, 1)",
  duration = 0.7,
  distance = 30,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const Tag = as;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setHasAnimated(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once && hasAnimated) {
          // For repeating animations
          setVisible(false);
        }
      },
      { threshold }
    );
    
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once, hasAnimated]);

  // Reset animation if not once
  useEffect(() => {
    if (!once && !visible) {
      setHasAnimated(false);
    }
  }, [once, visible]);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${animation} ${visible ? "reveal--visible" : ""} ${className}`}
      style={{ 
        "--delay": `${delay}s`,
        "--duration": `${duration}s`,
        "--easing": easing,
        "--distance": `${distance}px`,
      }}
    >
      {children}
    </Tag>
  );
}