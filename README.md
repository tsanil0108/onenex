# OneNex Studio — React Website

A multi-page React site for a branding & print studio, built with
<<<<<<< HEAD
Vite + React Router, component-level CSS, real Three.js scroll-driven 3D
shapes, and per-page SEO (meta tags, sitemap, structured data).
=======
Vite + React Router, component-level CSS, scroll/hover 3D animations,
and per-page SEO (meta tags, sitemap, structured data).
>>>>>>> 110a7f08e77a7c7b63f9a144ef5abc5364075bd5

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
```

## Structure

```
src/
  components/     # reusable UI pieces, each with its own .jsx + .css
<<<<<<< HEAD
    Navbar/        Footer/         PageHeader/    -> now carries a Scene3D shape
    Scene3D/        -> real Three.js shape, rotates as the page scrolls
    ScrollProgress/ -> thin top progress bar filling as you scroll the page
    PressStack/     -> 3D animated hero (mouse-parallax card stack)
    ServiceCard/    -> 3D hover-tilt card
    TeamCard/       -> 3D flip card
    CTASection/     -> rotating 3D ink-stamp CTA block + Scene3D torus
=======
    Navbar/        Footer/         PageHeader/
    PressStack/     -> 3D animated hero (mouse-parallax card stack)
    ServiceCard/    -> 3D hover-tilt card
    TeamCard/       -> 3D flip card
    CTASection/     -> rotating 3D ink-stamp CTA block
>>>>>>> 110a7f08e77a7c7b63f9a144ef5abc5364075bd5
    StatStrip/  ProcessSteps/  TestimonialSlider/  Reveal/  Seo/  ScrollToTop/
  pages/          # one folder per route, each with its own .jsx + .css
    Home/  Services/  About/  Team/  Contact/  NotFound/
  data/
    content.js    # all copy (services, team, stats, testimonials) — edit here
  App.jsx          # route table
  main.jsx         # Router + SEO provider + app entry
public/
  robots.txt  sitemap.xml  favicon.svg
```

<<<<<<< HEAD
## 3D scroll animation (Three.js)

`src/components/Scene3D/Scene3D.jsx` is a small, dependency-light Three.js
component (no react-three-fiber, just the `three` package) that renders a
real WebGL shape and rotates it based on **how far the page has been
scrolled**, plus a slow idle spin so it never looks static. It's placed in
three spots so the effect shows up across the whole site:

- `PageHeader` — every inner page (Services, About, Team, Contact) gets a
  shape at the top of the page; the shape (`knot` / `octa` / `dodeca` /
  `torus`) is picked per page automatically, or pass `shape="knot"` etc.
  explicitly as a prop.
- `Home` hero — a small icosahedron accent next to the headline.
- `CTASection` — a rotating torus behind the "OK" stamp, shown on every
  page that renders a CTA block.

It pauses rendering (via `IntersectionObserver`) whenever its canvas is
off-screen, so it costs ~nothing on parts of the page you're not looking
at, and respects `prefers-reduced-motion`.

=======
>>>>>>> 110a7f08e77a7c7b63f9a144ef5abc5364075bd5
## SEO included

- Per-page `<title>` / meta description via `react-helmet-async` (`Seo` component)
- Open Graph + Twitter card tags
- `robots.txt` + `sitemap.xml`
- `LocalBusiness` JSON-LD structured data in `index.html`
- Semantic HTML (`header`, `main`, `nav`, `section`, `footer`) and one `<h1>` per page

## Customizing

- **Text/content**: edit `src/data/content.js`
- **Colors/fonts**: edit CSS variables at the top of `src/index.css`
- **Real images**: drop files into `src/assets/` and `import` them where needed
  (cards currently use CSS/typography instead of photos)
<<<<<<< HEAD

## Contact form — real email, no backend (EmailJS)

The form in `src/pages/Contact/Contact.jsx` sends a real email straight
from the browser using [EmailJS](https://www.emailjs.com) — no server
needed:

1. Create a free account at emailjs.com.
2. Add an **Email Service** (e.g. connect your Gmail).
3. Create a **Template** with these variables in it:
   `{{from_name}}`, `{{from_email}}`, `{{service}}`, `{{message}}`.
4. Copy `.env.example` to `.env` and fill in your three IDs:
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx
   ```
5. Restart `npm run dev`.

**Until you set those keys, the form still works** — it falls back to
opening the visitor's own email app (`mailto:`) pre-filled with their
name, service and message, so nothing is ever broken or backend-dependent.
=======
- **Contact form**: wired to local state only — connect `handleSubmit` in
  `src/pages/Contact/Contact.jsx` to a service like Formspree or EmailJS to
  actually send email
>>>>>>> 110a7f08e77a7c7b63f9a144ef5abc5364075bd5
