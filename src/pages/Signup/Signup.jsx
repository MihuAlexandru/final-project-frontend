import styles from "./style.module.css";
import signupBg from "../../assets/dark-surface-illustration.jpg";
import SignUpForm from "../../components/Controlled/SignUpForm";

export default function Signup() {
  return (
    <div className={styles.container}>
      <div
        className={styles.colorBlock}
        style={{ backgroundImage: `url(${signupBg})` }}
      />
      <div className={styles.formWrapper}>
        <h1>Join the Club.</h1>
        <p>
          Create an account to unlock exclusive collections, early access to
          sales, and a personalized wishlist.
        </p>
        <SignUpForm />
      </div>
    </div>
  );
}
