import Button from "../../components/UI/Button/Button";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Discover What’s New</h1>
        <h2>Top products curated for you</h2>

        <Button>
          <Link to="/catalog">Shop</Link>
        </Button>
      </div>
    </div>
  );
}
