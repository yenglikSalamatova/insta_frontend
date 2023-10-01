"use client";

import styles from "@/styles/navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import CreatePostModal from "./CreatePostModal";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const NavBar = ({ currentUser }) => {
  const [createPost, setCreatePost] = useState(false);

  const pathname = usePathname();

  const handleCreatePost = () => {
    setCreatePost(!createPost);
    if (!createPost) {
      document.body.style.overflowY = "scroll";
      document.body.style.overflowX = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.width = "100%";
    }
  };

  return (
    <>
      {createPost && <CreatePostModal onCreatePost={handleCreatePost} />}
      <nav className={styles.navbar}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/logo.png"
            width={135}
            height={0}
            alt="Instagram logo"
          />
        </Link>

        <Link href="/" className={pathname === "/" ? styles.active : ""}>
          <Image
            className="img"
            src={`/posts/${
              pathname === "/" ? "house_fill" : "house_stroke"
            }.svg`}
            width={24}
            height={0}
            alt="House Stroke Icon"
          />
          Главная
        </Link>

        <Link href="/">
          <Image
            className="img"
            src="/posts/glass_stroke.svg"
            width={24}
            height={0}
            alt="Glass Stroke Icon"
          />
          Поисковый запрос
        </Link>
        <Link href="/">
          <Image
            className="img"
            src="/posts/compass_stroke.svg"
            width={24}
            height={0}
            alt="Compass Stroke Icon"
          />
          Интересное
        </Link>
        <Link href="/">
          <Image
            className="img"
            src="/posts/messenger_logo_stroke.svg"
            width={24}
            height={0}
            alt="Messenger Stroke Icon"
          />
          Сообщения
        </Link>
        <Link href="/">
          <Image
            className="img"
            src="/posts/monitor_play_stroke.svg"
            width={24}
            height={0}
            alt="Reels Stroke Icon"
          />
          Reels
        </Link>
        <Link href="/">
          <Image
            className="img"
            src="/posts/heart_stroke.svg"
            width={24}
            height={0}
            alt="Heart Stroke Icon"
          />
          Уведомления
        </Link>
        <Link href="#" onClick={handleCreatePost}>
          <Image
            className="img"
            src="/posts/plus_circle_stroke.svg"
            width={24}
            height={0}
            alt="Create Post Icon"
          />
          Создать
        </Link>

        <Link
          href={`/profile/${currentUser.username}`}
          className={
            pathname === `/profile/${currentUser.username}` ? styles.active : ""
          }
        >
          <Image
            className={`${styles.avatar} avatar`}
            src={currentUser.profilePicture}
            width={24}
            height={0}
            alt="Your Avatar"
          />
          Профиль
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
