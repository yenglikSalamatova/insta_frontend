"use client";
import styles from "@/styles/rightsidebar.module.scss";

import ProfileCard from "@/components/recomendations/ProfileCard";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "@/app/store/slice/authSlice";
import { useRouter } from "next/navigation";
import {
  followUser,
  unfollowUser,
  getRecommendations,
  getFollowing,
} from "@/app/store/slice/subscriptionSlice";

import { useEffect, useState } from "react";
import RightSideBarSkeleton from "./RightSideBarSkeleton";
import { recomendations } from "@/data/recommended";

const RightSideBar = () => {
  const [loading, setLoading] = useState(true);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const currentUser = useSelector((state) => state.auth.currentUser);
  // const recomendations = useSelector(
  //   (state) => state.subscription.recomendations
  // );
  const followings = useSelector((state) => state.subscription.following);
  // console.log(currentUser, isAuth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getRecommendations()).then(() => setLoading(false));
    dispatch(getFollowing(currentUser?.username));
  }, [dispatch, currentUser]);

  const handleLogout = () => {
    dispatch(logoutAsync());
    router.push("/login");
  };

  const handleFollow = (user) => {
    dispatch(followUser(user, currentUser));
  };

  const handleUnfollow = (user) => {
    dispatch(unfollowUser(user, currentUser));
  };

  if (loading) {
    return <RightSideBarSkeleton />;
  }

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

      {recomendations &&
        recomendations.map((recomendation) => (
          <ProfileCard
            type={
              followings.some((flw) => flw.id == recomendation.id)
                ? "followers"
                : "following"
            }
            onLogout={handleLogout}
            profile={recomendation}
            key={recomendation.id}
            onClick={
              followings.some((flw) => flw.id == recomendation.id)
                ? () => handleUnfollow(recomendation)
                : () => handleFollow(recomendation)
            }
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
