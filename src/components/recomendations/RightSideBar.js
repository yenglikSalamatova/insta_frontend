"use client";
import styles from "@/styles/rightsidebar.module.scss";
import Image from "next/image";
import Link from "next/link";
import ProfileCard from "@/components/recomendations/ProfileCard";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/store/slice/authSlice";
import { useRouter } from "next/navigation";
import { getRecommendations } from "@/app/store/slice/subscriptionSlice";
import { useEffect } from "react";

const RightSideBar = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const recomendations = useSelector(
    (state) => state.subscription.recomendations
  );
  console.log(currentUser, isAuth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getRecommendations());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <nav className={styles.nav}>
      <ProfileCard
        type="logout"
        onLogout={handleLogout}
        profile={currentUser}
      />
      <div className={styles.recomended}>
        <p className={styles.text}>Рекомендации для вас</p>
      </div>

      {recomendations.map((recomendation) => (
        <ProfileCard
          type="following"
          profile={recomendation}
          key={recomendation.id}
        />
      ))}

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
