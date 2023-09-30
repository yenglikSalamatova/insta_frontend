"use client";
import styles from "@/styles/profileCard.module.scss";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = ({ linkName, type, onLogout, currentUser }) => {
  if (currentUser && type == "logout") {
    return (
      <div className={styles.profile_card}>
        <div className={styles.card_image_username}>
          <Image
            className="avatar"
            src={currentUser.profilePicture}
            width={44}
            height={44}
            alt="Profile Image"
          />
          <div className={styles.card_usernames}>
            <h5>{currentUser.username}</h5>
            <p>{currentUser.full_name}</p>
          </div>
        </div>
        <div>
          <button className={styles.link} onClick={onLogout}>
            {linkName}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.profile_card}>
        <div className={styles.card_image_username}>
          <Image
            className="avatar"
            src="/posts/avatar_sample.webp"
            width={44}
            height={44}
            alt="Profile Image"
          />
          <div className={styles.card_usernames}>
            <h5>username</h5>
            <p>full_name</p>
          </div>
        </div>
        <div>
          <Link href="/" className={styles.link}>
            {linkName}
          </Link>
        </div>
      </div>
    );
  }
};

export default ProfileCard;
