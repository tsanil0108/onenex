import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import ServiceDetail from "./pages/ServiceDetail/ServiceDetail";
import About from "./pages/About/About";
import Team from "./pages/Team/Team";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";

// Home Dropdown Pages
import DigitalMarketing from "./pages/DigitalMarketing/DigitalMarketing";
import CreativeStudio from "./pages/CreativeStudio/CreativeStudio";
import PortfolioStacked from "./pages/PortfolioStacked/PortfolioStacked";
import OnlineStore from "./pages/OnlineStore/OnlineStore";
import ProjectsList from "./pages/ProjectsList/ProjectsList";
import VideoSlider from "./pages/VideoSlider/VideoSlider";
import HorizontalScroll from "./pages/HorizontalScroll/HorizontalScroll";

// Portfolio Pages
import PortfolioListLarge from "./pages/PortfolioListLarge/PortfolioListLarge";
import PortfolioMetroSlide from "./pages/PortfolioMetroSlide/PortfolioMetroSlide";
import PortfolioOverlay from "./pages/PortfolioOverlay/PortfolioOverlay";
import PortfolioFullscreen from "./pages/PortfolioFullscreen/PortfolioFullscreen";
import PortfolioGrid from "./pages/PortfolioGrid/PortfolioGrid";
import SinglePortfolio from "./pages/SinglePortfolio/SinglePortfolio";

import "./App.css";

export default function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main className="app__main">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />

          {/* Home Dropdown Pages */}
          <Route path="/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/creative-studio" element={<CreativeStudio />} />
          <Route path="/portfolio-stacked" element={<PortfolioStacked />} />
          <Route path="/online-store" element={<OnlineStore />} />
          <Route path="/projects-list" element={<ProjectsList />} />
          <Route path="/video-slider" element={<VideoSlider />} />
          <Route path="/horizontal-scroll" element={<HorizontalScroll />} />

          {/* Portfolio Dropdown Pages */}
          <Route path="/portfolio-list-large" element={<PortfolioListLarge />} />
          <Route path="/portfolio-metro-slide" element={<PortfolioMetroSlide />} />
          <Route path="/portfolio-overlay" element={<PortfolioOverlay />} />
          <Route path="/portfolio-fullscreen" element={<PortfolioFullscreen />} />
          <Route path="/portfolio-grid" element={<PortfolioGrid />} />
          <Route path="/portfolio-single/:id" element={<SinglePortfolio />} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}