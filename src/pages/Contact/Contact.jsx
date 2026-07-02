import { useState } from "react";
import emailjs from "@emailjs/browser";
import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import Reveal from "../../components/Reveal/Reveal";
import { brand } from "../../data/content";
import "./Contact.css";

const initialForm = { name: "", email: "", service: "Branding & Identity", message: "" };

// EmailJS lets the form send a real email with zero backend server.
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (e.g. Gmail) and a Template with variables
//    {{from_name}}, {{from_email}}, {{service}}, {{message}}
// 3. Put the three IDs below into a .env file at the project root:
//      VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
//      VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
//      VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx
// Until those are set, the form falls back to opening the visitor's own
// email client (mailto:) pre-filled with their message, so it always works.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const emailjsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const sendViaMailto = () => {
    const subject = encodeURIComponent(`New enquiry — ${form.service}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`
    );
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailjsConfigured) {
      // No EmailJS keys set yet — still deliver the enquiry, via mailto.
      sendViaMailto();
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          service: form.service,
          message: form.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("sent");
      setForm(initialForm);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  };

  return (
    <>
      <Seo
        title="Contact Us — Start Your Brand Project"
        description="Get in touch with OneNex Studio in Thane, Mumbai for branding, print, advertising and web design enquiries."
        path="/contact"
      />

      <PageHeader
        eyebrow="Contact"
        title="Tell us what you're building"
        subtitle="Share a few details below and our team will get back to you within one business day."
      />

      <section className="section">
        <div className="container contact__grid">
          <Reveal className="contact__info">
            <h2>Reach us directly</h2>
            <ul className="contact__list">
              <li>
                <span className="contact__label">Email</span>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </li>
              <li>
                <span className="contact__label">Phone</span>
                <a href={`tel:${brand.phone}`}>{brand.phone}</a>
              </li>
              <li>
                <span className="contact__label">Studio</span>
                <span>{brand.address}</span>
              </li>
            </ul>

            <div className="contact__card" aria-hidden="true">
              <div className="contact__card-face">
                <span>{brand.name}</span>
                <small>Brand Design &amp; Print</small>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="contact__form-wrap">
            {status === "sent" ? (
              <div className="contact__success" role="status">
                <h3>Message sent.</h3>
                <p>Thanks for reaching out — we'll reply within one business day.</p>
                <button className="contact__reset" onClick={() => setStatus("idle")}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                {status === "error" && (
                  <p className="contact__error" role="alert">
                    Something went wrong sending that — please try again, or email us
                    directly at <a href={`mailto:${brand.email}`}>{brand.email}</a>.
                  </p>
                )}
                <div className="contact__row">
                  <label>
                    <span>Name</span>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Your full name"
                    />
                  </label>
                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      placeholder="you@company.com"
                    />
                  </label>
                </div>

                <label>
                  <span>Service you need</span>
                  <select value={form.service} onChange={update("service")}>
                    <option>Branding &amp; Identity</option>
                    <option>Graphic Design</option>
                    <option>Print Production</option>
                    <option>Outdoor Advertising</option>
                    <option>Web Design</option>
                    <option>Interior Branding</option>
                  </select>
                </label>

                <label>
                  <span>Project details</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us about your brand and what you need."
                  />
                </label>

                <button
                  type="submit"
                  className="contact__submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
