import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import style from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={style.layout}>
      <Navbar />
      <main className={style.layoutContent}>{children}</main>
      <Footer />
    </div>
  );
}
