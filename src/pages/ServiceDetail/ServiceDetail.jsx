import { useEffect, useRef, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import Seo from "../../components/Seo/Seo";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import { services } from "../../data/content";
import "./ServiceDetail.css";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [activePoint, setActivePoint] = useState(null);

  useEffect(() => {
    // Find the service by id
    const found = services.find(s => s.id === id);
    if (found) {
      setService(found);
      setLoading(false);
    } else {
      // If service not found, redirect to 404 or services page
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // If loading or service not found, show 404
  if (loading) {
    return (
      <div className="service-detail-loading">
        <div className="service-detail-loading__spinner"></div>
        <p>Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="service-detail-notfound">
        <div className="service-detail-notfound__content">
          <span className="service-detail-notfound__code">404</span>
          <h1 className="service-detail-notfound__title">This page didn't make it off the press.</h1>
          <p className="service-detail-notfound__text">
            The page you're looking for has been moved or doesn't exist.
          </p>
          <NavLink to="/services" className="service-detail-notfound__button">
            Back to Services
          </NavLink>
        </div>
      </div>
    );
  }

  // Get next and previous services
  const currentIndex = services.findIndex(s => s.id === service.id);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <>
      <Seo
        title={`${service.title} — OneNex Studio`}
        description={service.detail}
        path={`/services/${service.id}`}
      />

      <section className="service-detail" ref={containerRef}>
        <div className="container">
          {/* Back Navigation */}
          <div className="service-detail__nav">
            <NavLink to="/services" className="service-detail__back">
              <span className="service-detail__back-arrow">←</span>
              All Services
            </NavLink>
            <div className="service-detail__breadcrumb">
              <span>Services</span>
              <span className="service-detail__breadcrumb-separator">/</span>
              <span className="service-detail__breadcrumb-current">{service.title}</span>
            </div>
          </div>

          {/* Hero Section */}
          <div 
            className="service-detail__hero"
            style={{
              '--mouse-x': mousePosition.x,
              '--mouse-y': mousePosition.y,
            }}
          >
            <Reveal animation="fade" className="service-detail__hero-content">
              <div className="service-detail__hero-badge">
                <span className="service-detail__hero-code">{service.code}</span>
                <span className="service-detail__hero-label">Service</span>
              </div>
              <h1 className="service-detail__hero-title">{service.title}</h1>
              <p className="service-detail__hero-description">{service.detail}</p>
              <div className="service-detail__hero-actions">
                <NavLink to="/contact" className="service-detail__hero-cta">
                  Start a Project <span className="service-detail__hero-cta-arrow">→</span>
                </NavLink>
                <NavLink to="/services" className="service-detail__hero-secondary">
                  View All Services
                </NavLink>
              </div>
            </Reveal>

            <Reveal animation="scale" className="service-detail__hero-visual">
              <div className="service-detail__hero-image-wrapper">
                <img src={service.image} alt={service.title} />
                <div className="service-detail__hero-image-glow"></div>
                <div className="service-detail__hero-image-overlay">
                  <span className="service-detail__hero-image-icon">✦</span>
                </div>
                <div className="service-detail__hero-image-corner service-detail__hero-image-corner--tl"></div>
                <div className="service-detail__hero-image-corner service-detail__hero-image-corner--tr"></div>
                <div className="service-detail__hero-image-corner service-detail__hero-image-corner--bl"></div>
                <div className="service-detail__hero-image-corner service-detail__hero-image-corner--br"></div>
              </div>
            </Reveal>
          </div>

          {/* Service Details */}
          <div className="service-detail__grid">
            {/* Points Section */}
            <Reveal animation="slide-up" className="service-detail__points-section">
              <div className="service-detail__section-head">
                <span className="service-detail__section-number">0{currentIndex + 1}</span>
                <h2 className="service-detail__section-title">What we deliver</h2>
              </div>
              <div className="service-detail__points-grid">
                {service.points.map((point, i) => (
                  <div 
                    key={i}
                    className={`service-detail__point ${activePoint === i ? 'service-detail__point--active' : ''}`}
                    onMouseEnter={() => setActivePoint(i)}
                    onMouseLeave={() => setActivePoint(null)}
                    style={{ '--delay': i * 0.1 }}
                  >
                    <div className="service-detail__point-number">
                      <span>0{i + 1}</span>
                    </div>
                    <div className="service-detail__point-content">
                      <h4 className="service-detail__point-title">{point}</h4>
                      <div className="service-detail__point-line"></div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Related Services */}
            <div className="service-detail__related">
              <Reveal animation="slide-up" className="service-detail__related-header">
                <span className="service-detail__related-eyebrow">Related</span>
                <h3 className="service-detail__related-title">Other services</h3>
              </Reveal>
              <div className="service-detail__related-grid">
                {services
                  .filter(s => s.id !== service.id)
                  .slice(0, 4)
                  .map((s) => (
                    <Reveal key={s.id} animation="fade" delay={0.1}>
                      <NavLink to={`/services/${s.id}`} className="service-detail__related-card">
                        <div className="service-detail__related-card-image">
                          <img src={s.image} alt={s.title} />
                          <div className="service-detail__related-card-overlay">
                            <span>Explore →</span>
                          </div>
                        </div>
                        <div className="service-detail__related-card-content">
                          <span className="service-detail__related-card-code">{s.code}</span>
                          <h4 className="service-detail__related-card-title">{s.title}</h4>
                          <p className="service-detail__related-card-short">{s.short}</p>
                        </div>
                      </NavLink>
                    </Reveal>
                  ))}
              </div>
            </div>
          </div>

          {/* Navigation between services */}
          <div className="service-detail__pagination">
            {prevService && (
              <NavLink to={`/services/${prevService.id}`} className="service-detail__pagination-prev">
                <span className="service-detail__pagination-arrow">←</span>
                <div className="service-detail__pagination-info">
                  <span className="service-detail__pagination-label">Previous</span>
                  <span className="service-detail__pagination-title">{prevService.title}</span>
                </div>
              </NavLink>
            )}
            {nextService && (
              <NavLink to={`/services/${nextService.id}`} className="service-detail__pagination-next">
                <div className="service-detail__pagination-info">
                  <span className="service-detail__pagination-label">Next</span>
                  <span className="service-detail__pagination-title">{nextService.title}</span>
                </div>
                <span className="service-detail__pagination-arrow">→</span>
              </NavLink>
            )}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Ready to start?"
        title={`Let's bring your ${service.title} to life`}
        subtitle="From concept to production, we do it all under one roof in Thane, Mumbai."
        linkTo="/contact"
        linkLabel="Start a Project"
      />
    </>
  );
}