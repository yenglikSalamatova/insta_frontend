"use client";

import React from "react";
import styles from "@/styles/postBlock.module.scss";
import Image from "next/image";
import Story from "./Story";
import Link from "next/link";

const PostBlock = ({ post }) => {
  return (
    <div className={styles.post}>
      <div className={styles.post__header}>
        <div className={styles.post__userinfo}>
          {post.story === true ? (
            <Link href="/">
              <Image
                src={post.userImage}
                width={35}
                height={35}
                className={styles.avatar}
                alt="Avatar image of"
              />
            </Link>
          ) : (
            <Link href="/">
              <Image
                src={post.userImage}
                width={35}
                height={35}
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
          <button>
            <Image
              src="/posts/heart2.svg"
              width={27}
              height={27}
              alt="Like icon"
            />
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
        <textarea placeholder="Добавьте комментарий..."></textarea>
        <button className={styles.button_regular}>Опубликовать</button>
      </div>
    </div>
  );
};

export default PostBlock;
