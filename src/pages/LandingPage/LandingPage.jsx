import Button from "../../components/UI/Button/Button";
import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={style.hero}>
      <div className={style.heroContent}>
        <h1>Discover What’s New</h1>
        <h2>Top products curated for you</h2>

        <Button>
          <Link to="/catalog">Shop</Link>
        </Button>
      </div>
    </div>
  );
}
