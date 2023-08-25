import styles from "@/styles/navbar.module.scss";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Image
        className="logo"
        src="/logo.png"
        width={110}
        height={0}
        alt="Instagram logo"
      />
      <Link href="/">Главная</Link>
      <Link href="/">Поисковый запрос</Link>
      <Link href="/">Сообщения</Link>
      <Link href="/">Уведомления</Link>
      <Link href="/">Создать</Link>
      <Link href="/">Профиль</Link>
    </nav>
  );
};

export default NavBar;
