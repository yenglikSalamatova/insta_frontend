import styles from "@/styles/rightsidebar.module.scss";
import Image from "next/image";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";

const RightSideBar = () => {
  return (
    <nav className={styles.nav}>
      <ProfileCard linkName="Переключиться" />
      <div className={styles.recomended}>
        <p className={styles.text}>Рекомендации для вас</p>
        <Link href="/" className={styles.link}>
          Все
        </Link>
      </div>
      <ProfileCard linkName="Переключиться" />
      <ProfileCard linkName="Переключиться" />
      <ProfileCard linkName="Переключиться" />
      <ProfileCard linkName="Переключиться" />
      <ProfileCard linkName="Переключиться" />
      <footer className={styles.footer}>
        <ul className={styles.footer__ul}>
          <li>
            <a href="https://www.example.com/contact">Информация</a>
          </li>
          <li>
            <a href="https://www.example.com/terms">Помощь</a>
          </li>
          <li>
            <a href="https://www.example.com/terms">API</a>
          </li>
          <li>
            <a href="https://www.example.com/terms">Конфиденциальность</a>
          </li>
          <li>
            <a href="https://www.example.com/terms">Условия</a>
          </li>
          <li>
            <a href="https://www.example.com/terms">Места</a>
          </li>
          <li>
            <a href="https://www.example.com/terms">Язык</a>
          </li>
          <li>
            <a href="https://www.example.com/terms">Meta Verified</a>
          </li>
        </ul>
        <p>© 2023 INSTAGRAM FROM ENLIK</p>
      </footer>
    </nav>
  );
};

export default RightSideBar;
