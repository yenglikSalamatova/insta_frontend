import Image from "next/image";
import styles from "@/styles/header.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.header}>
      <Image src="/logo.png" width={150} height={150} alt="Logo" />
      <div className={styles.button_group}>
        <Link href="/login" className={styles.button_blue}>
          Войти
        </Link>
        <Link href="/register" className={styles.button_regular}>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}
