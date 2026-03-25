import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-content">{children}</main>
      <Footer />
    </div>
  );
}
