import { useState } from "react";
import Seo from "../../components/Seo/Seo";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import "./DigitalMarketing.css";

// ---------------------------------------------------------------------
// Floating vertical icon rail — sits pinned to the right edge, like the
// cart/gallery/folder rail in the reference.
// ---------------------------------------------------------------------
function FloatingRail() {
  const items = [
    { id: "cart", icon: "🛒", label: "Get a quote" },
    { id: "gallery", icon: "🖼️", label: "Our work" },
    { id: "folder", icon: "📁", label: "Case studies" }
  ];

  return (
    <div className="dm-rail" aria-label="Quick links">
      {items.map((item) => (
        <button key={item.id} type="button" className="dm-rail__btn" title={item.label}>
          <span aria-hidden="true">{item.icon}</span>
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------
// Hero — warm gradient backdrop, bold two-line headline with a
// highlighted word, subtitle, CTA, and a full-bleed photo underneath.
// ---------------------------------------------------------------------
function DigitalMarketingHero() {
  return (
    <section className="dm-hero2">
      <FloatingRail />

      <div className="dm-hero2__gradient" aria-hidden="true"></div>

      <div className="container dm-hero2__top">
        <span className="dm-hero2__eyebrow">We Are Digital Marketing Agency</span>
        <h1 className="dm-hero2__title">
          We Grow Your <span className="dm-hero2__accent">Business</span> Online
        </h1>
        <p className="dm-hero2__subtitle">
          From boosting brand awareness to generating leads, we create data-driven
          digital marketing strategies that deliver real results.
        </p>

        <div className="dm-hero2__actions">
          <a href="#services" className="dm-hero2__cta">
            Get Started <span aria-hidden="true">→</span>
          </a>
          <button type="button" className="dm-hero2__watch">
            <span className="dm-hero2__play" aria-hidden="true">▶</span>
            Watch Video
          </button>
        </div>
      </div>

      <div className="dm-hero2__photo">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?fm=jpg&q=70&w=1800&auto=format&fit=crop"
          alt="Marketing team collaborating"
          loading="eager"
        />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Feature split — big photo on one side, numbered list + CTA on other.
// ---------------------------------------------------------------------
const features = [
  {
    num: "01",
    title: "Data-Backed Strategy",
    desc: "Every campaign starts with research, not guesswork."
  },
  {
    num: "02",
    title: "Creative That Converts",
    desc: "Design and copy built to earn clicks, not just likes."
  },
  {
    num: "03",
    title: "Transparent Reporting",
    desc: "You always know exactly what's working, and why."
  }
];

function FeatureSplit() {
  return (
    <section className="dm-split">
      <div className="container dm-split__inner">
        <div className="dm-split__photo">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?fm=jpg&q=70&w=1200&auto=format&fit=crop"
            alt="Team reviewing marketing results together"
            loading="lazy"
          />
          <div className="dm-split__photo-tag">Creating Growth, Together</div>
        </div>

        <div className="dm-split__content">
          <span className="dm-split__eyebrow">Corporate Service</span>
          <h2 className="dm-split__title">We Design &amp; Create Growth</h2>
          <p className="dm-split__desc">
            We appreciate your trust greatly! Our clients choose us and stay with
            us because they see measurable results, not just pretty reports.
          </p>

          <ul className="dm-split__list">
            {features.map((f) => (
              <Reveal key={f.num} animation="elastic">
                <li className="dm-split__item">
                  <span className="dm-split__num">{f.num}.</span>
                  <span className="dm-split__item-text">
                    <span className="dm-split__item-title">{f.title}</span>
                    <span className="dm-split__item-desc">{f.desc}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <a href="#about" className="dm-split__button">
            About Us
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Portfolio grid — mixed-size photo tiles with minimal captions,
// like a case-study wall.
// ---------------------------------------------------------------------
const work = [
  {
    id: "seo-case",
    title: "SEO Overhaul — Retail Client",
    tag: "SEO",
    span: "tall",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=jpg&q=70&w=900&auto=format&fit=crop"
  },
  {
    id: "social-case",
    title: "Social Launch Campaign",
    tag: "Social",
    span: "wide",
    image:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?fm=jpg&q=70&w=1200&auto=format&fit=crop"
  },
  {
    id: "brand-case",
    title: "Minimalist Rebrand",
    tag: "Branding",
    span: "regular",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?fm=jpg&q=70&w=900&auto=format&fit=crop"
  },
  {
    id: "email-case",
    title: "Lifecycle Email Series",
    tag: "Email",
    span: "regular",
    image:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?fm=jpg&q=70&w=900&auto=format&fit=crop"
  },
  {
    id: "ppc-case",
    title: "PPC Performance Sprint",
    tag: "Paid Ads",
    span: "wide",
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?fm=jpg&q=70&w=1200&auto=format&fit=crop"
  },
  {
    id: "analytics-case",
    title: "Attribution Dashboard Build",
    tag: "Analytics",
    span: "tall",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fm=jpg&q=70&w=900&auto=format&fit=crop"
  }
];

function PortfolioGrid() {
  const [activeTag, setActiveTag] = useState("All");
  const tags = ["All", ...new Set(work.map((w) => w.tag))];
  const visible = activeTag === "All" ? work : work.filter((w) => w.tag === activeTag);

  return (
    <section className="dm-work" id="services">
      <div className="container">
        <div className="dm-work__head">
          <div>
            <span className="dm-work__eyebrow">Selected Work</span>
            <h2 className="dm-work__title">Real Campaigns, Real Results</h2>
          </div>

          <div className="dm-work__filters">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`dm-work__filter ${activeTag === tag ? "dm-work__filter--active" : ""}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="dm-work__grid">
          {visible.map((w, i) => (
            <a
              key={w.id}
              href="#"
              className={`dm-work__tile dm-work__tile--${w.span}`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <img src={w.image} alt={w.title} loading="lazy" />
              <div className="dm-work__tile-overlay">
                <span className="dm-work__tile-tag">{w.tag}</span>
                <span className="dm-work__tile-title">{w.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Clients — logo wall on a dark band, plus a highlighted stat card.
// ---------------------------------------------------------------------
const clients = [
  { id: "au", name: "AU Small Finance Bank", sub: "A Scheduled Commercial Bank", color: "#5b2a8c" },
  { id: "iifl", name: "IIFL", sub: "Finance", color: "#e8631a" },
  { id: "jana", name: "Jana Small Finance Bank", sub: "Likho apni kahaani", color: "#1f6fb2" },
  { id: "pasban", name: "Pasbaan Adab", sub: "Imagine · Inspire · Create", color: "#c2185b" },
  { id: "kavyanjali", name: "Kavyanjali", sub: "Kavi Sammelan", color: "#2e7d32" },
  { id: "star", name: "Star Health Insurance", sub: "The Health Insurance Specialist", color: "#1565c0" },
  { id: "axis", name: "Axis Bank", sub: "Banking", color: "#8e1537" },
  { id: "kaaltarang", name: "Kaaltarang News", sub: "News Network", color: "#b71c1c" },
  { id: "mahendras", name: "Mahendra's", sub: "Your Success Is Our Success", color: "#37474f" },
  { id: "commercia", name: "Commercia Academy", sub: "Education", color: "#e8631a" },
  { id: "byjus", name: "BYJU'S", sub: "Learning App", color: "#6a1b9a" }
];

function ClientsSection() {
  return (
    <section className="dm-clients">
      <div className="container">
        <div className="dm-clients__head">
          <span className="dm-clients__eyebrow">Our Clients</span>
          <h2 className="dm-clients__title">&raquo;&raquo;&raquo; 2900+ clients</h2>
        </div>

        <div className="dm-clients__grid">
          {clients.map((c) => (
            <div key={c.id} className="dm-clients__card">
              <span className="dm-clients__mark" style={{ color: c.color }}>
                {c.name}
              </span>
              <span className="dm-clients__sub">{c.sub}</span>
            </div>
          ))}

          <div className="dm-clients__card dm-clients__card--stat">
            <span className="dm-clients__stat-value">2900+</span>
            <span className="dm-clients__stat-label">Clients</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DigitalMarketing() {
  return (
    <>
      <Seo
        title="Digital Marketing — Grow Your Brand Online"
        description="Professional digital marketing services including SEO, social media, content marketing, email campaigns, PPC, and analytics."
        path="/digital-marketing"
      />

      <DigitalMarketingHero />
      <FeatureSplit />
      <PortfolioGrid />
      <ClientsSection />

      <CTASection
        eyebrow="Ready to grow?"
        title="Let's build your digital presence"
        subtitle="Get a custom digital marketing strategy for your brand."
      />
    </>
  );
}