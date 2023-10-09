"use client";

import styles from "@/styles/stories.module.scss";
import { END_POINT } from "@/utils/endPoint";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function StoryElById({
  item,
  onNext,
  onPrev,
  onDelete,
  onLike,
}) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const likes = useSelector((state) => state.likes.likes);

  return (
    <div
      key={item.id}
      className={`${styles.story}`}
      style={{
        backgroundImage: `url("${`${END_POINT}/${item.content}`}")`,
      }}
    >
      <div className={styles.slider_prev} onClick={onPrev}>
        <Image
          src="/posts/left_arrow.svg"
          alt="Left arrow stories"
          width={27}
          height={27}
        />
      </div>
      <div className={styles.slider_next} onClick={onNext}>
        <Image
          src="/posts/right_arrow.svg"
          alt="Right arrow stories"
          width={27}
          height={27}
        />
      </div>

      <div className={styles.story_header}>
        <div className={styles.header_user}>
          <div className={styles.user_avatar}>
            <Image
              src={`${END_POINT}/${item.user.profilePicture}`}
              width={32}
              height={32}
              alt="Avatar"
              className="avatar"
            />
          </div>
          <div className={styles.user_name}>{item.user.username}</div>
        </div>
        <div className={styles.header_actions}>
          <button onClick={() => onDelete(item)}>
            <Image src="/trash.svg" width={24} height={24} alt="Like" />
          </button>
        </div>
      </div>

      <div className={styles.story_footer}>
        <div className={styles.footer_comment}>
          <input type="text" placeholder="Ответьте" />
        </div>

        <button onClick={() => onLike(item.id)}>
          {likes.some((like) => like.storyId == item.id) ? (
            <Image
              src="/posts/heart_fill.svg"
              width={24}
              height={24}
              alt="Like"
              className={`${styles.heart} ${styles.heart__active}`}
            />
          ) : (
            <Image src="/posts/heart2.svg" width={24} height={24} alt="Like" />
          )}
        </button>
        <button>
          <Image
            src="/posts/paper_plane.svg"
            width={24}
            height={24}
            alt="Message"
          />
        </button>
      </div>
    </div>
  );
}
