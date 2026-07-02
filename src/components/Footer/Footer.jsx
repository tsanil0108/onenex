import { NavLink } from "react-router-dom";
import { brand, navLinks, services } from "../../data/content";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col footer__brand-col">
          <span className="footer__brand">{brand.name}</span>
          <p className="footer__tagline">{brand.tagline}</p>
          <p className="footer__address">{brand.address}</p>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Navigate</h3>
          <ul>
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Services</h3>
          <ul>
            {services.slice(0, 4).map((s) => (
              <li key={s.id}>
                <NavLink to="/services">{s.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Contact</h3>
          <ul>
            <li>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
            <li>
              <a href={`tel:${brand.phone}`}>{brand.phone}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {year} {brand.name}. All rights reserved.</span>
        <span>Branding · Print · Web</span>
      </div>
    </footer>
  );
}
