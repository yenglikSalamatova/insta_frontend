import styles from "@/styles/register.module.scss";

export default function RegisterLogin() {
  return (
    <div className={styles.form}>
      <p className={styles.text}>
        Есть аккаунт? <a className={styles.link}>Вход</a>
      </p>
    </div>
  );
}
