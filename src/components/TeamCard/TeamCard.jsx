import { useRef, useState, useEffect } from "react";
import "./TeamCard.css";

export default function TeamCard({ member, index = 0 }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // 3D Tilt effect on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`team-card ${isFlipped ? 'team-card--flipped' : ''}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        '--rotate-x': `${rotation.x}deg`,
        '--rotate-y': `${rotation.y}deg`,
      }}
    >
      <div className="team-card__flipper">
        {/* Front Face */}
        <div className="team-card__face team-card__face--front">
          <div className="team-card__image-wrapper">
            <img 
              src={member.photo} 
              alt={member.name} 
              loading="lazy"
              className="team-card__image"
            />
            <div className="team-card__image-overlay">
              <span className="team-card__hover-icon">↺</span>
              <span className="team-card__hover-text">Click to flip</span>
            </div>
          </div>
          
          <div className="team-card__front-tag">
            <span className="team-card__initials">{member.initials}</span>
            <span className="team-card__front-name">{member.name.split(' ')[0]}</span>
          </div>

          {/* Decorative elements */}
          <div className="team-card__glow team-card__glow--1"></div>
          <div className="team-card__glow team-card__glow--2"></div>
          <div className="team-card__corner team-card__corner--tl"></div>
          <div className="team-card__corner team-card__corner--tr"></div>
          <div className="team-card__corner team-card__corner--bl"></div>
          <div className="team-card__corner team-card__corner--br"></div>
        </div>

        {/* Back Face */}
        <div className="team-card__face team-card__face--back">
          <div className="team-card__back-content">
            <div className="team-card__avatar-ring">
              <img 
                src={member.photo} 
                alt={member.name} 
                className="team-card__back-avatar"
              />
            </div>
            
            <div className="team-card__back-info">
              <span className="team-card__name">{member.name}</span>
              <span className="team-card__role">{member.role}</span>
            </div>

            {member.bio && (
              <p className="team-card__bio">{member.bio}</p>
            )}

            {member.socials && (
              <div className="team-card__socials">
                {member.socials.map((social, i) => (
                  <a 
                    key={i}
                    href={social.url}
                    className="team-card__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="team-card__social-icon">{social.icon}</span>
                  </a>
                ))}
              </div>
            )}

            <button 
              className="team-card__back-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              Flip back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}