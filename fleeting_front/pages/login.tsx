import LoginCard from "../src/components/loginCard/loginCard";
import styles from "../styles/login.module.css";
import { LoginForm } from "../src/components/form/login.form";

export default function Login() {
  return (
    <div className={styles.background}>
      <LoginCard title="Login">
        <LoginForm />
      </LoginCard>
    </div>
  );
}
