import { useState, useRef } from "react";
import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import "./VideoSlider.css";

const videos = [
  { id: 1, title: "Brand Story", category: "Branding", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 2, title: "Product Launch", category: "Marketing", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 3, title: "Behind the Scenes", category: "Studio", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 4, title: "Client Testimonial", category: "Testimonial", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

export default function VideoSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const sliderRef = useRef(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  return (
    <>
      <Seo title="Video Slider" description="Video showcase slider" path="/video-slider" />
      <PageHeader eyebrow="Videos" title="Video Showcase" subtitle="Watch our latest video content" />

      <section className="section">
        <div className="container">
          <Reveal as="div" className="vs-wrapper" animation="slide-fade">
            <div className="vs-slider" ref={sliderRef}>
              <div className="vs-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {videos.map((video) => (
                  <div key={video.id} className="vs-slide">
                    <div className="vs-video-wrapper">
                      <iframe 
                        src={video.embed} 
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="vs-slide__info">
                      <span className="vs-slide__category">{video.category}</span>
                      <h3 className="vs-slide__title">{video.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="vs-controls">
              <button className="vs-btn vs-btn--prev" onClick={prevSlide}>‹</button>
              <div className="vs-dots">
                {videos.map((_, i) => (
                  <button 
                    key={i} 
                    className={`vs-dot ${i === activeIndex ? "vs-dot--active" : ""}`}
                    onClick={() => { setActiveIndex(i); setIsPlaying(false); }}
                  />
                ))}
              </div>
              <button className="vs-btn vs-btn--next" onClick={nextSlide}>›</button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection eyebrow="Watch more" title="See our video portfolio" subtitle="Visual storytelling at its best" />
    </>
  );
}