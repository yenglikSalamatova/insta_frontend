"use client";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "@/styles/postBlock.module.scss";
import Image from "next/image";
import Story from "../stories/Story";
import Link from "next/link";
import PostModal from "../modals/PostModal";
import { END_POINT } from "@/utils/endPoint";
import { useRouter } from "next/navigation";
import { timestampConvert } from "@/utils/timestampConvert";

const PostBlock = ({ post }) => {
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [textarea, setTextarea] = useState("");
  const [postModal, setPostModal] = useState(false);

  const router = useRouter();

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  const handleLike = () => {
    setLike(!like);
  };

  const handleTextarea = (e) => {
    setTextarea(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    // height of textarea have max 80px
    if (e.target.scrollHeight > 80) {
      e.target.style.height = "80px";
    }
  };

  const togglePostModal = () => {
    setPostModal(!postModal);
  };

  console.log(post);

  return (
    <>
      {postModal && (
        <PostModal postId={post.id} togglePostModal={togglePostModal} />
      )}
      <div className={styles.post}>
        <div className={styles.post__header}>
          <div className={styles.post__userinfo}>
            {post.story === true ? (
              <Link href="/">
                <Image
                  src={`${END_POINT}${post.user.profilePicture}`}
                  width={38}
                  height={38}
                  className={styles.avatar__active}
                  alt="Avatar image of"
                />
              </Link>
            ) : (
              <Link href="/">
                <Image
                  src={`${END_POINT}${post.user.profilePicture}`}
                  width={38}
                  height={38}
                  className={styles.avatar}
                  alt="Avatar image of"
                />
              </Link>
            )}
            <Link href={`/profile/${post.user.username}`}>
              {post.user.username}
            </Link>
            <div>•</div>
            <p>{timestampConvert(post.updatedAt)}</p>
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
          <img src={`${END_POINT}${post.media[0].url}`} alt="photo" />
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
            <button onClick={togglePostModal}>
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
            <button onClick={handleBookmark}>
              {bookmark ? (
                <Image
                  src="/posts/bookmark_fill.svg"
                  width={24}
                  height={24}
                  alt="Bookmark icon"
                />
              ) : (
                <Image
                  src="/posts/bookmark.svg"
                  width={24}
                  height={24}
                  alt="Bookmark icon"
                />
              )}
            </button>
          </div>
        </div>
        <button className={styles.post__likes}>
          <p>{post.likesCount} отметок &quot;Нравится&quot;</p>
        </button>
        {post.caption.length > 0 && (
          <div className={styles.post__caption}>
            <Link href="/">{post.user.username}</Link>
            <p>{post.caption}</p>
          </div>
        )}

        {post.commentsCount > 0 && (
          <button
            className={styles.post__all_comments}
            onClick={togglePostModal}
          >
            Посмотреть все комментарии ({post.commentsCount})
          </button>
        )}

        <div className={styles.post__addComment}>
          <textarea
            placeholder="Добавьте комментарий..."
            onInput={togglePostModal}
            value={textarea}
          ></textarea>
          {textarea === "" ? null : (
            <button className={styles.button_regular}>Опубликовать</button>
          )}
        </div>
      </div>
    </>
  );
};

export default PostBlock;
