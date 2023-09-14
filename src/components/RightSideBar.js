"use client";
import styles from "@/styles/rightsidebar.module.scss";
import Image from "next/image";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/store/slice/authSlice";

const RightSideBar = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={styles.nav}>
      <ProfileCard linkName="Выйти" type="logout" onLogout={handleLogout} />
      <div className={styles.recomended}>
        <p className={styles.text}>Рекомендации для вас</p>
      </div>
      <ProfileCard linkName="Подписаться" />
      <ProfileCard linkName="Подписаться" />
      <ProfileCard linkName="Подписаться" />
      <ProfileCard linkName="Подписаться" />
      <ProfileCard linkName="Подписаться" />
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
