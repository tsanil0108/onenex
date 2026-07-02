import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to top with proper browser support
    const scrollToTop = () => {
      try {
        // Modern browsers
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } catch (error) {
        // Fallback for older browsers
        window.scrollTo(0, 0);
      }
    };

    // Use requestAnimationFrame for smoother animation
    if ('requestAnimationFrame' in window) {
      requestAnimationFrame(() => {
        scrollToTop();
      });
    } else {
      scrollToTop();
    }

    // Cleanup function
    return () => {
      // Cancel any ongoing scroll animations
      if ('cancelAnimationFrame' in window) {
        // No need to cancel as we're using scrollTo directly
      }
    };
  }, [pathname]);

  return null;
}