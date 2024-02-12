import LoginCard from "../src/components/loginCard/loginCard";
import styles from "../styles/login.module.css";
import { CreateLoginForm } from "../src/components/form/create-login.form";

export default function CreateLogin() {
  return (
    <div className={styles.background}>
      <LoginCard title="Crie sua conta">
        <CreateLoginForm />
      </LoginCard>
    </div>
  );
}
