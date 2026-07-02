import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.onenexstudio.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-cover.jpg`;

/**
 * Drop this at the top of any page to control that page's
 * <title>, meta description and Open Graph tags for search + social.
 */
export default function Seo({ title, description, path = "/", image = DEFAULT_IMAGE }) {
  const fullTitle = `${title} | OneNex Studio`;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
