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
    </nav>
  );
};

export default RightSideBar;
