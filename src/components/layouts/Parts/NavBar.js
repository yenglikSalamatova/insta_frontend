"use client";

import styles from "@/styles/navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import CreatePostModal from "../../modals/CreatePostModal";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { END_POINT } from "@/utils/endPoint";
import {
  modalScrollBlocking,
  modalScrollUnblocking,
} from "@/utils/modalScrollBlocking";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const [createPost, setCreatePost] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const pathname = usePathname();

  const handleCreatePost = () => {
    setCreatePost(!createPost);
    if (!createPost) {
      modalScrollBlocking();
    } else {
      modalScrollUnblocking();
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <>
      {createPost && <CreatePostModal onToggle={handleCreatePost} />}
      {searchBar && <SearchBar onClose={() => setSearchBar(false)} />}
      <nav
        className={
          styles.navbar + " " + `${searchBar ? styles.mini_navbar : ""}`
        }
      >
        <Link href="/">
          {searchBar ? (
            <Image
              className={styles.logo}
              src="/logo_camera.svg"
              width={24}
              height={24}
              alt="Instagram logo"
            />
          ) : (
            <Image
              className={styles.logo}
              src="/logo.png"
              width={110}
              height={0}
              alt="Instagram logo"
            />
          )}
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
          {!searchBar && "Главная"}
        </Link>

        <Link href="#" onClick={() => setSearchBar(!searchBar)}>
          <Image
            className="img"
            src="/posts/glass_stroke.svg"
            width={24}
            height={0}
            alt="Glass Stroke Icon"
          />
          {!searchBar && "Поисковый запрос"}
        </Link>
        <Link href="/interesting-posts">
          <Image
            className="img"
            src="/posts/compass_stroke.svg"
            width={24}
            height={0}
            alt="Compass Stroke Icon"
          />
          {!searchBar && "Интересное"}
        </Link>
        {/* <Link href="/">
          <img
            className="img"
            src="/posts/heart_stroke.svg"
            width={24}
            height={0}
            alt="Heart Stroke Icon"
          />
          Уведомления
        </Link> */}
        <Link href="#" onClick={handleCreatePost}>
          <Image
            className="img"
            src="/posts/plus_circle_stroke.svg"
            width={24}
            height={0}
            alt="Create Post Icon"
          />
          {!searchBar && "Создать"}
        </Link>

        <Link
          href={`/profile/${currentUser.username}`}
          className={
            pathname === `/profile/${currentUser.username}` ? styles.active : ""
          }
        >
          <img
            className={`${styles.avatar} avatar`}
            src={`${END_POINT}${currentUser.profilePicture}`}
            width={28}
            height={28}
            alt="Your Avatar"
          />
          {!searchBar && "Профиль"}
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
