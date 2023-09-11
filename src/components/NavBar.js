"use client";

import React, { useState } from "react";
import styles from "@/styles/navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import CreatePostModal from "./CreatePostModal";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [createPost, setCreatePost] = useState(false);
  const pathname = usePathname();
  console.log(pathname);
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
      {createPost ? <CreatePostModal onCreatePost={handleCreatePost} /> : null}
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

        {pathname === "/" ? (
          <Link href="/" className={styles.active}>
            <Image
              className="img"
              src="/posts/house_fill.svg"
              width={24}
              height={0}
              alt="House Stroke Icon"
            />
            Главная
          </Link>
        ) : (
          <Link href="/">
            <Image
              className="img"
              src="/posts/house_stroke.svg"
              width={24}
              height={0}
              alt="House Stroke Icon"
            />
            Главная
          </Link>
        )}

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
        {pathname.startsWith("profile") ? (
          <Link href="/profile/1" className={styles.active}>
            <Image
              className={`${styles.avatar} avatar`}
              src="/posts/avatar_sample.webp"
              width={24}
              height={0}
              alt="Your Avatar"
            />
            Профиль
          </Link>
        ) : (
          <Link href="/profile/1">
            <Image
              className={`${styles.avatar} avatar`}
              src="/posts/avatar_sample.webp"
              width={24}
              height={0}
              alt="Your Avatar"
            />
            Профиль
          </Link>
        )}
      </nav>
    </>
  );
};

export default NavBar;
