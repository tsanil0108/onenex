import { useEffect, useRef, useState } from "react";
import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import TeamCard from "../../components/TeamCard/TeamCard";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import { team } from "../../data/content";
import "./Team.css";

export default function Team() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(null);
  const containerRef = useRef(null);
  const [stats, setStats] = useState({
    total: team.length,
    designers: team.filter(m => m.role.includes('Designer') || m.role.includes('Creative')).length,
    developers: team.filter(m => m.role.includes('Developer') || m.role.includes('Web')).length,
    strategy: team.filter(m => m.role.includes('Strategist') || m.role.includes('Director')).length,
  });

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

  // Split team into leadership and members
  const leadership = team.slice(0, 2);
  const members = team.slice(2);

  return (
    <>
      <Seo
        title="Our Team — The People Behind OneNex"
        description="Meet the designers, print production specialists and developers behind OneNex Studio in Thane, Mumbai."
        path="/team"
      />

      <PageHeader
        eyebrow="Meet the Team"
        title="The people who design and produce your brand"
        subtitle="Hover a card to meet the person behind it."
      />

      {/* Team Stats */}
      <section className="section section--compact">
        <div className="container">
          <div className="team-stats">
            <div className="team-stats__grid">
              <div className="team-stats__item">
                <span className="team-stats__number">{stats.total}</span>
                <span className="team-stats__label">Team Members</span>
              </div>
              <div className="team-stats__item">
                <span className="team-stats__number">{stats.designers}</span>
                <span className="team-stats__label">Designers</span>
              </div>
              <div className="team-stats__item">
                <span className="team-stats__number">{stats.developers}</span>
                <span className="team-stats__label">Developers</span>
              </div>
              <div className="team-stats__item">
                <span className="team-stats__number">{stats.strategy}</span>
                <span className="team-stats__label">Strategy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Leadership</span>
            <h2>Guiding the vision</h2>
            <p>Meet the team behind OneNex's creative direction and strategy.</p>
          </Reveal>

          <div className="team-page__grid team-page__grid--leadership" ref={containerRef}>
            {leadership.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08} animation="tilt">
                <TeamCard 
                  member={m} 
                  index={i}
                  isLeadership={true}
                  mousePosition={mousePosition}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Team</span>
            <h2>The talented people making it happen</h2>
            <p>Every designer, developer, and specialist brings something unique to the table.</p>
          </Reveal>

          <div className="team-page__grid">
            {members.map((m, i) => (
              <Reveal 
                key={m.name} 
                delay={i * 0.05} 
                animation="elastic"
                className="team-page__grid-item"
              >
                <TeamCard 
                  member={m} 
                  index={i + 2}
                  onHover={(index) => setActiveCard(index)}
                  onLeave={() => setActiveCard(null)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="section section--join">
        <div className="container">
          <div className="team-join">
            <Reveal animation="scale" className="team-join__content">
              <span className="eyebrow">Join the studio</span>
              <h2 className="team-join__title">
                We're always open to meeting <br />
                <span className="team-join__accent">good designers.</span>
              </h2>
              <p className="team-join__text">
                Send your portfolio — we reply to every application.
              </p>
              <div className="team-join__benefits">
                <div className="team-join__benefit">
                  <span className="team-join__icon">🎨</span>
                  <span>Creative Freedom</span>
                </div>
                <div className="team-join__benefit">
                  <span className="team-join__icon">💡</span>
                  <span>Growth & Learning</span>
                </div>
                <div className="team-join__benefit">
                  <span className="team-join__icon">🤝</span>
                  <span>Collaborative Culture</span>
                </div>
              </div>
              <a href="/contact" className="team-join__button">
                Get in Touch
                <span className="team-join__arrow">→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}