import style from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerTop}>100% INDEPENDENT</div>

      <div className={style.footerContent}>
        <div className={style.footerColumn}>
          <h4>Customer</h4>
          <a>Contact us</a>
        </div>

        <div className={style.footerColumn}>
          <h4>Shop</h4>
          <a>All Products</a>
          <a>Music</a>
          <a>Clothing</a>
          <a>Accessories</a>
          <a>Home & Lifestyle</a>
        </div>

        <div className={style.footerColumn}>
          <h4>Legal</h4>
          <a>Cookie Policy</a>
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
          <a>Sitemap</a>
        </div>
      </div>

      <div className={style.footerBottom}>© 2026 Your Brand</div>
    </footer>
  );
}
