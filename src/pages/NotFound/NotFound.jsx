import { NavLink } from "react-router-dom";
import Seo from "../../components/Seo/Seo";
import "./NotFound.css";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        path="/404"
      />
      <section className="not-found">
        <div className="container not-found__inner">
          <span className="not-found__stamp">404</span>
          <h1>This page didn't make it off the press.</h1>
          <p>The page you're looking for has been moved or doesn't exist.</p>
          <NavLink to="/" className="not-found__link">
            Back to Home →
          </NavLink>
        </div>
      </section>
    </>
  );
}
