"use client";
import styles from "@/styles/profileCard.module.scss";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = ({ linkName, type, onLogout }) => {
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
          <h5>joahn233</h5>
          <p>Joahnna</p>
        </div>
      </div>
      <div>
        {type === "logout" ? (
          <button className={styles.link} onClick={onLogout}>
            {linkName}
          </button>
        ) : (
          <Link href="/" className={styles.link}>
            {linkName}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
