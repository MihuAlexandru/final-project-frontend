import { Link } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import style from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className={style.wrapper}>
      <div className={style.animArea}>
        <p className={style.ghost}>404</p>
      </div>

      <div className={style.content}>
        <h1 className={style.title}>Ooops, page not found...</h1>
        <p className={style.text}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/">
          <Button className={style.button}>Back to home page</Button>
        </Link>
      </div>
    </section>
  );
}
