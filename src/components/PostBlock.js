"use client";

import React from "react";
import { useState } from "react";
import styles from "@/styles/postBlock.module.scss";
import Image from "next/image";
import Story from "./Story";
import Link from "next/link";

const PostBlock = ({ post }) => {
  // when click to like button "Нравится" replace icon
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };

  const [textarea, setTextarea] = useState("");

  // when click to textarea view button "Опубликовать"
  const handleTextarea = (e) => {
    setTextarea(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    // height of textarea have max 80px
    if (e.target.scrollHeight > 80) {
      e.target.style.height = "80px";
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.post__header}>
        <div className={styles.post__userinfo}>
          {post.story === true ? (
            <Link href="/">
              <Image
                src={post.userImage}
                width={38}
                height={38}
                className={styles.avatar__active}
                alt="Avatar image of"
              />
            </Link>
          ) : (
            <Link href="/">
              <Image
                src={post.userImage}
                width={38}
                height={38}
                className={styles.avatar}
                alt="Avatar image of"
              />
            </Link>
          )}

          <Link href="/">{post.username}</Link>
          <div>•</div>
          <p>{post.timestamp}</p>
        </div>
        <button className={styles.post__settings}>
          <Image
            src="/posts/dots_icon.svg"
            width={20}
            height={20}
            alt="Icon dots settings"
          />
        </button>
      </div>
      <div className={styles.post__media}>
        <img src={post.media} alt="photo" />
      </div>
      <div className={styles.post__actions}>
        <div>
          <button onClick={handleLike}>
            {like ? (
              <Image
                src="/posts/heart_fill.svg"
                width={27}
                height={27}
                alt="Like icon"
                className={`${styles.heart} ${styles.heart__active}`}
              />
            ) : (
              <Image
                src="/posts/heart2.svg"
                width={27}
                height={27}
                alt="Like icon"
              />
            )}
          </button>
          <button>
            <Image
              src="/posts/comments.svg"
              width={27}
              height={27}
              alt="Comments icon"
            />
          </button>
          <button>
            <Image
              src="/posts/paper_plane.svg"
              width={27}
              height={27}
              alt="Paper plane icon"
            />
          </button>
        </div>
        <div>
          <button>
            <Image
              src="/posts/bookmark.svg"
              width={24}
              height={24}
              alt="Bookmark icon"
            />
          </button>
        </div>
      </div>
      <button className={styles.post__likes}>
        <p>{post.likes} отметок &quot;Нравится&quot;</p>
      </button>
      <div className={styles.post__caption}>
        <Link href="/">{post.username}</Link>
        <p>{post.caption}</p>
      </div>
      <Link className={styles.post__all_comments} href="/">
        Посмотреть все комментарии ({post.commentCount})
      </Link>
      <div className={styles.post__addComment}>
        <textarea
          placeholder="Добавьте комментарий..."
          onInput={handleTextarea}
        ></textarea>
        {textarea === "" ? null : (
          <button className={styles.button_regular}>Опубликовать</button>
        )}
      </div>
    </div>
  );
};

export default PostBlock;
