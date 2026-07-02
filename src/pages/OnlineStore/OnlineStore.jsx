import { useState } from "react";
import Seo from "../../components/Seo/Seo";
import PageHeader from "../../components/PageHeader/PageHeader";
import CTASection from "../../components/CTASection/CTASection";
import Reveal from "../../components/Reveal/Reveal";
import "./OnlineStore.css";

const products = [
  { id: 1, name: "Brand Identity Kit", price: "$299", category: "Branding", icon: "✦" },
  { id: 2, name: "Packaging Design", price: "$199", category: "Packaging", icon: "◆" },
  { id: 3, name: "Website Template", price: "$149", category: "Web", icon: "●" },
  { id: 4, name: "Social Media Pack", price: "$99", category: "Social", icon: "▲" },
  { id: 5, name: "Print Templates", price: "$79", category: "Print", icon: "■" },
  { id: 6, name: "Motion Graphics", price: "$249", category: "Motion", icon: "▶" },
];

export default function OnlineStore() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <>
      <Seo
        title="Online Store — Premium Design Products"
        description="Shop premium design templates, branding kits, and creative assets."
        path="/online-store"
      />

      <PageHeader
        eyebrow="Online Store"
        title="Premium design products"
        subtitle="Ready-to-use templates and design assets for your brand."
      />

      <section className="section">
        <div className="container">
          <div className="os-grid">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.05} animation="scale">
                <div className="os-card">
                  <div className="os-card__icon">{product.icon}</div>
                  <h3 className="os-card__name">{product.name}</h3>
                  <span className="os-card__category">{product.category}</span>
                  <div className="os-card__price">{product.price}</div>
                  <button 
                    className="os-card__btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <div className="os-card__glow"></div>
                </div>
              </Reveal>
            ))}
          </div>
          
          {cart.length > 0 && (
            <div className="os-cart">
              <span className="os-cart__count">{cart.length} items in cart</span>
              <button className="os-cart__btn">Checkout →</button>
            </div>
          )}
        </div>
      </section>

      <CTASection
        eyebrow="Shop now"
        title="Get your design assets today"
        subtitle="Premium quality templates and kits for your brand."
      />
    </>
  );
}