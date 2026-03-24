import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">100% INDEPENDENT</div>

      <div className="footer-content">
        <div className="footer-column">
          <h4>Customer</h4>
          <a>Contact us</a>
        </div>

        <div className="footer-column">
          <h4>Shop</h4>
          <a>All Products</a>
          <a>Music</a>
          <a>Clothing</a>
          <a>Accessories</a>
          <a>Home & Lifestyle</a>
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <a>Cookie Policy</a>
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
          <a>Sitemap</a>
        </div>
      </div>

      <div className="footer-bottom">© 2026 Your Brand</div>
    </footer>
  );
}
