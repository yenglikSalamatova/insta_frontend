import styles from "@/styles/register.module.scss";
import RegisterForm from "@/components/auth/RegisterForm";
import RegisterLogin from "@/components/auth/RegisterLogin";

export const metadata = {
  title: "Зарегистрироваться • Instagram",
};

export default function Register() {
  return (
    <>
      <div className={styles.main_center}>
        <RegisterForm />
        <RegisterLogin />
      </div>
    </>
  );
}
