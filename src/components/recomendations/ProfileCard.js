"use client";
import styles from "@/styles/profileCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { END_POINT } from "@/utils/endPoint";

const ProfileCard = ({ type, onLogout, profile, onClick, currentUser = 0 }) => {
  if (profile && type == "logout") {
    return (
      <div className={styles.profile_card}>
        <Link
          href={`/profile/${profile.username}`}
          className={styles.card_image_username}
        >
          <img
            className="avatar"
            src={`${profile.profilePicture}`}
            width={44}
            height={44}
            alt="Profile Image"
          />
          <div className={styles.card_usernames}>
            <h5>{profile.username}</h5>
            <p>{profile.full_name}</p>
          </div>
        </Link>
        <div>
          <button className={styles.link} onClick={onLogout}>
            Выйти
          </button>
        </div>
      </div>
    );
  } else if (!currentUser && type == "following") {
    return (
      <div className={styles.profile_card}>
        <Link
          href={`/profile/${profile.username}`}
          className={styles.card_image_username}
        >
          <img
            className="avatar"
            src={`${profile.profilePicture}`}
            width={44}
            height={44}
            alt="Profile Image"
          />
          <div className={styles.card_usernames}>
            <h5>{profile.username}</h5>
            <p>{profile.full_name}</p>
          </div>
        </Link>
        <div>
          <button className={styles.link} onClick={onClick}>
            Подписаться
          </button>
        </div>
      </div>
    );
  } else if (!currentUser && type == "followers") {
    return (
      <div className={styles.profile_card}>
        <Link
          href={`/profile/${profile.username}`}
          className={styles.card_image_username}
        >
          <img
            className="avatar"
            src={`${profile.profilePicture}`}
            width={44}
            height={44}
            alt="Profile Image"
          />
          <div className={styles.card_usernames}>
            <h5>{profile.username}</h5>
            <p>{profile.full_name}</p>
          </div>
        </Link>
        <div>
          <button className={styles.link} onClick={onClick}>
            Отписаться
          </button>
        </div>
      </div>
    );
  } else if (currentUser) {
    return (
      <div className={styles.profile_card}>
        <Link
          href={`/profile/${profile.username}`}
          className={styles.card_image_username}
        >
          <img
            className="avatar"
            src={`${profile.profilePicture}`}
            width={44}
            height={44}
            alt="Profile Image"
          />
          <div className={styles.card_usernames}>
            <h5>{profile.username}</h5>
            <p>{profile.full_name}</p>
          </div>
        </Link>
      </div>
    );
  } else {
    return <div className={styles.profile_card}>...</div>;
  }
};

export default ProfileCard;
