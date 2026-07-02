import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { brand, services } from "../../data/content";
import "./Navbar.css";

// All navigation links organized
const navLinks = [
  {
    to: "/",
    label: "Home",
    dropdown: [
      { to: "/digital-marketing", label: "Digital Marketing" },
      { to: "/creative-studio", label: "Creative Studio" },
      { to: "/portfolio-stacked", label: "Portfolio Stacked" },
      { to: "/online-store", label: "Online Store" },
      { to: "/projects-list", label: "Projects List" },
      { to: "/video-slider", label: "Video Slider" },
      { to: "/horizontal-scroll", label: "Horizontal Scroll" },
    ],
  },
  {
    to: "/portfolio-grid",
    label: "Portfolio",
    dropdown: [
      { to: "/portfolio-list-large", label: "Portfolio List Large" },
      { to: "/portfolio-metro-slide", label: "Portfolio Metro Slide" },
      { to: "/portfolio-overlay", label: "Portfolio Overlay" },
      { to: "/portfolio-fullscreen", label: "Portfolio Fullscreen" },
      { to: "/portfolio-grid", label: "Portfolio Grid" },
      { to: "/portfolio-single/1", label: "Single Portfolio" },
    ],
  },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

const dropdownIcons = {
  "digital-marketing": "📈",
  "creative-studio": "🎨",
  portfolio: "📁",
  "portfolio-stacked": "📚",
  "online-store": "🛒",
  "projects-list": "📋",
  "video-slider": "🎬",
  "horizontal-scroll": "📜",
  "portfolio-list-large": "📋",
  "portfolio-metro-slide": "🎯",
  "portfolio-overlay": "✨",
  "portfolio-fullscreen": "🖼️",
  "portfolio-grid": "📊",
  "portfolio-single": "📄",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Single source of truth for which dropdown is open: "home" | "portfolio" | "services" | null
  const [activeDropdown, setActiveDropdown] = useState(null);

  const homeDropdownRef = useRef(null);
  const portfolioDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);

  // Each dropdown gets its OWN close-timer so hovering one never cancels another's close
  const homeTimeoutRef = useRef(null);
  const portfolioTimeoutRef = useRef(null);
  const servicesTimeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Click outside handler (covers all three dropdowns in one listener)
  useEffect(() => {
    const handleClickOutside = (e) => {
      const insideHome = homeDropdownRef.current?.contains(e.target);
      const insidePortfolio = portfolioDropdownRef.current?.contains(e.target);
      const insideServices = servicesDropdownRef.current?.contains(e.target);
      if (!insideHome && !insidePortfolio && !insideServices) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clear all pending close-timers so a fresh hover never gets undone by a stale one
  const clearAllTimeouts = () => {
    clearTimeout(homeTimeoutRef.current);
    clearTimeout(portfolioTimeoutRef.current);
    clearTimeout(servicesTimeoutRef.current);
  };

  const openDropdown = (name) => {
    clearAllTimeouts();
    setActiveDropdown(name);
  };

  const scheduleClose = (name, ref) => {
    ref.current = setTimeout(() => {
      // Only close if this dropdown is still the active one
      setActiveDropdown((current) => (current === name ? null : current));
    }, 200);
  };

  const handleHomeEnter = () => openDropdown("home");
  const handleHomeLeave = () => scheduleClose("home", homeTimeoutRef);

  const handlePortfolioEnter = () => openDropdown("portfolio");
  const handlePortfolioLeave = () => scheduleClose("portfolio", portfolioTimeoutRef);

  const handleServicesEnter = () => openDropdown("services");
  const handleServicesLeave = () => scheduleClose("services", servicesTimeoutRef);

  const handleLinkClick = () => {
    clearAllTimeouts();
    setActiveDropdown(null);
    setOpen(false);
  };

  const serviceIcons = {
    branding: "✦",
    "graphic-design": "◆",
    print: "■",
    advertising: "▲",
    web: "●",
    interior: "◈",
  };

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner container">
        <NavLink to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true">
            <span className="nav__mark-face nav__mark-face--front">N</span>
            <span className="nav__mark-face nav__mark-face--side" />
          </span>
          <span className="nav__brand-text">{brand.name}</span>
        </NavLink>

        <nav className="nav__links" aria-label="Primary">
          {/* Home Dropdown */}
          <div
            className="nav__dropdown-wrapper"
            ref={homeDropdownRef}
            onMouseEnter={handleHomeEnter}
            onMouseLeave={handleHomeLeave}
          >
            <div className={`nav__link nav__link--dropdown ${activeDropdown === "home" ? "nav__link--active" : ""}`}>
              <NavLink to="/" className="nav__link-text" onClick={handleLinkClick}>
                Home
              </NavLink>
              <button
                type="button"
                className="nav__dropdown-toggle"
                aria-label="Toggle Home menu"
                aria-expanded={activeDropdown === "home"}
                onClick={() => setActiveDropdown((cur) => (cur === "home" ? null : "home"))}
              >
                <span className={`nav__dropdown-arrow ${activeDropdown === "home" ? "nav__dropdown-arrow--open" : ""}`}>
                  ▾
                </span>
              </button>
            </div>
            <div className={`nav__dropdown nav__dropdown--home ${activeDropdown === "home" ? "nav__dropdown--open" : ""}`}>
              <div className="nav__dropdown-grid">
                {navLinks[0].dropdown.map((item) => (
                  <NavLink key={item.to} to={item.to} className="nav__dropdown-item" onClick={handleLinkClick}>
                    <span className="nav__dropdown-item-icon">{dropdownIcons[item.to.split("/")[1]] || "•"}</span>
                    <span className="nav__dropdown-item-title">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Dropdown */}
          <div
            className="nav__dropdown-wrapper"
            ref={portfolioDropdownRef}
            onMouseEnter={handlePortfolioEnter}
            onMouseLeave={handlePortfolioLeave}
          >
            <div className={`nav__link nav__link--dropdown ${activeDropdown === "portfolio" ? "nav__link--active" : ""}`}>
              <NavLink to="/portfolio-grid" className="nav__link-text" onClick={handleLinkClick}>
                Portfolio
              </NavLink>
              <button
                type="button"
                className="nav__dropdown-toggle"
                aria-label="Toggle Portfolio menu"
                aria-expanded={activeDropdown === "portfolio"}
                onClick={() => setActiveDropdown((cur) => (cur === "portfolio" ? null : "portfolio"))}
              >
                <span className={`nav__dropdown-arrow ${activeDropdown === "portfolio" ? "nav__dropdown-arrow--open" : ""}`}>
                  ▾
                </span>
              </button>
            </div>
            <div className={`nav__dropdown nav__dropdown--portfolio ${activeDropdown === "portfolio" ? "nav__dropdown--open" : ""}`}>
              <div className="nav__dropdown-grid">
                {navLinks[1].dropdown.map((item) => (
                  <NavLink key={item.to} to={item.to} className="nav__dropdown-item" onClick={handleLinkClick}>
                    <span className="nav__dropdown-item-icon">{dropdownIcons[item.to.split("/")[1]] || "•"}</span>
                    <span className="nav__dropdown-item-title">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Services Dropdown */}
          <div
            className="nav__dropdown-wrapper"
            ref={servicesDropdownRef}
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            <div className={`nav__link nav__link--dropdown ${activeDropdown === "services" ? "nav__link--active" : ""}`}>
              <NavLink to="/services" className="nav__link-text" onClick={handleLinkClick}>
                Services
              </NavLink>
              <button
                type="button"
                className="nav__dropdown-toggle"
                aria-label="Toggle Services menu"
                aria-expanded={activeDropdown === "services"}
                onClick={() => setActiveDropdown((cur) => (cur === "services" ? null : "services"))}
              >
                <span className={`nav__dropdown-arrow ${activeDropdown === "services" ? "nav__dropdown-arrow--open" : ""}`}>
                  ▾
                </span>
              </button>
            </div>
            <div className={`nav__dropdown nav__dropdown--services ${activeDropdown === "services" ? "nav__dropdown--open" : ""}`}>
              <div className="nav__dropdown-grid">
                {services.map((service) => (
                  <NavLink key={service.id} to={`/services/${service.id}`} className="nav__dropdown-item" onClick={handleLinkClick}>
                    <span className="nav__dropdown-item-icon">{serviceIcons[service.id] || "✦"}</span>
                    <span className="nav__dropdown-item-title">{service.title}</span>
                  </NavLink>
                ))}
              </div>
              <div className="nav__dropdown-footer">
                <NavLink to="/services" className="nav__dropdown-view-all" onClick={handleLinkClick}>
                  View All Services →
                </NavLink>
              </div>
            </div>
          </div>

          {/* Remaining plain links: About, Team, Contact only */}
          {navLinks.slice(3).map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav__link ${isActive ? "nav__link--active" : ""}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/contact" className="nav__cta">Work With Us</NavLink>

        <button className={`nav__burger ${open ? "nav__burger--open" : ""}`} onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`nav__mobile ${open ? "nav__mobile--open" : ""}`}>
        <NavLink to="/" className="nav__mobile-link" onClick={() => setOpen(false)}>Home</NavLink>
        <div className="nav__mobile-pages">
          <span className="nav__mobile-pages-title">Explore</span>
          {navLinks[0].dropdown.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav__mobile-link nav__mobile-link--sub" onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav__mobile-pages">
          <span className="nav__mobile-pages-title">Portfolio</span>
          {navLinks[1].dropdown.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav__mobile-link nav__mobile-link--sub" onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav__mobile-services">
          <span className="nav__mobile-services-title">Services</span>
          {services.map((service) => (
            <NavLink key={service.id} to={`/services/${service.id}`} className="nav__mobile-service" onClick={() => setOpen(false)}>
              <span className="nav__mobile-service-icon">{serviceIcons[service.id] || "✦"}</span>
              <span className="nav__mobile-service-name">{service.title}</span>
            </NavLink>
          ))}
          <NavLink to="/services" className="nav__mobile-link nav__mobile-link--view-all" onClick={() => setOpen(false)}>
            View All Services →
          </NavLink>
        </div>

        {navLinks.slice(3).map((l) => (
          <NavLink key={l.to} to={l.to} className="nav__mobile-link" onClick={() => setOpen(false)}>
            {l.label}
          </NavLink>
        ))}

        <NavLink to="/contact" className="nav__mobile-link nav__mobile-link--cta" onClick={() => setOpen(false)}>
          Get a Quote
        </NavLink>
      </div>
    </header>
  );
}