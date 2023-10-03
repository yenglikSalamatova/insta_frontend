"use client";
import styles from "@/styles/profileCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { END_POINT } from "@/utils/endPoint";

const ProfileCard = ({ type, onLogout, profile }) => {
  if (profile && type == "logout") {
    return (
      <div className={styles.profile_card}>
        <Link
          href={`/profile/${profile.username}`}
          className={styles.card_image_username}
        >
          <Image
            className="avatar"
            src={`${END_POINT}/${profile.profilePicture}`}
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
  } else if (type == "following") {
    return (
      <div className={styles.profile_card}>
        <div className={styles.card_image_username}>
          <Image
            className="avatar"
            src={`${END_POINT}/${profile.profilePicture}`}
            width={44}
            height={44}
            alt="Profile Image"
          />
          <div className={styles.card_usernames}>
            <h5>{profile.username}</h5>
            <p>{profile.full_name}</p>
          </div>
        </div>
        <div>
          <Link href="/" className={styles.link}>
            Подписаться
          </Link>
        </div>
      </div>
    );
  } else if (type == "followers") {
    return (
      <div className={styles.profile_card}>
        <div className={styles.card_image_username}>
          <Image
            className="avatar"
            src={`${END_POINT}/${profile.profilePicture}`}
            width={44}
            height={44}
            alt="Profile Image"
          />
          <div className={styles.card_usernames}>
            <h5>{profile.username}</h5>
            <p>{profile.full_name}</p>
          </div>
        </div>
        <div>
          <Link href="/" className={styles.link}>
            Отписаться
          </Link>
        </div>
      </div>
    );
  } else {
    return <div className={styles.profile_card}>...</div>;
  }
};

export default ProfileCard;
