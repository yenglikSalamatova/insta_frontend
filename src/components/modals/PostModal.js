"use client";

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "@/app/store/slice/postsSlice";
import styles from "@/styles/postModal.module.scss";
import Link from "next/link";
import { END_POINT } from "@/utils/endPoint";
import { timestampConvert } from "@/utils/timestampConvert";
import Comments from "@/components/comments/Comments";
import { createComment } from "@/app/store/slice/postsSlice";
import {
  likeEntity,
  unlikeEntity,
  createBookmark,
  deleteBookmark,
} from "@/app/store/slice/likesSlice";
import { useRouter } from "next/navigation";
import SettingsPostModal from "./SettingsPostModal";

export default function PostModal({ postId, togglePostModal }) {
  const [bookmark, setBookmark] = useState(false);

  const [textarea, setTextarea] = useState("");

  const [isSettings, setIsSettings] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const post = useSelector((state) => state.posts.post);
  const likes = useSelector((state) => state.likes.likes);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const bookmarks = useSelector((state) => state.likes.bookmarks);

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId, likes]);

  const addComment = () => {
    dispatch(createComment({ postId: post.id, text: textarea }));
    setTextarea("");
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

  const handleLike = () => {
    if (likes.some((like) => like.postId == post.id)) {
      dispatch(unlikeEntity({ entityId: post.id, entityType: "post" }));
    } else {
      dispatch(likeEntity({ entityId: post.id, entityType: "post" }));
    }
  };

  const handleBookmark = () => {
    if (bookmarks.some((bookmark) => bookmark.postId == post.id)) {
      dispatch(deleteBookmark(post.id));
    } else {
      dispatch(createBookmark(post.id));
    }
  };

  // console.log("PostModal rerender");

  if (!post.id || post.id !== postId) {
    return (
      <div className={styles.modal}>
        <div className={styles.overlay} onClick={togglePostModal}></div>
      </div>
    );
  }

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={togglePostModal}></div>
      {isSettings && (
        <SettingsPostModal
          closeModal={() => setIsSettings(false)}
          post={post}
        />
      )}
      <button className={styles.modal__close} onClick={togglePostModal}>
        <Image src="/posts/close.svg" width={30} height={30} alt="Close" />
      </button>
      {post.id == postId && (
        <div className={styles.modal__content}>
          <div className={styles.modal__media}>
            <img
              src={`${END_POINT}${post.media[0].url}`}
              alt="Post media"
              width={500}
              height={500}
            />
          </div>
          <div className={styles.modal__info}>
            <div className={styles.post}>
              <div className={styles.post__header}>
                <div className={styles.post__userinfo}>
                  {post.story === true ? (
                    <Link href="/">
                      <img
                        src={`${post.user.profilePicture}`}
                        width={38}
                        height={38}
                        className={styles.avatar__active}
                        alt="Avatar image of"
                      />
                    </Link>
                  ) : (
                    <Link href="/">
                      <img
                        src={`}${post.user.profilePicture}`}
                        width={38}
                        height={38}
                        className={styles.avatar}
                        alt="Avatar image of"
                      />
                    </Link>
                  )}
                  <Link href="/">{post.user.username}</Link>
                </div>
                <button
                  className={styles.post__settings}
                  onClick={() => setIsSettings(!isSettings)}
                >
                  <img
                    src="/posts/dots_icon.svg"
                    width={20}
                    height={20}
                    alt="Icon dots settings"
                  />
                </button>
              </div>

              <div className={styles.post__caption}>
                <Link href={`/profile/${post.user.username}`}>
                  {post.user.username}
                </Link>
                <p>{post.caption}</p>
              </div>

              <Comments comments={post.comments} />

              <div className={styles.post__footer}>
                <div className={styles.post__actions}>
                  <div>
                    <button onClick={handleLike}>
                      {likes.some((like) => like.postId == post.id) ? (
                        <img
                          src="/posts/heart_fill.svg"
                          width={27}
                          height={27}
                          alt="Like icon"
                          className={`${styles.heart} ${styles.heart__active}`}
                        />
                      ) : (
                        <img
                          src="/posts/heart2.svg"
                          width={27}
                          height={27}
                          alt="Like icon"
                        />
                      )}
                    </button>
                    <button>
                      <img
                        src="/posts/comments.svg"
                        width={27}
                        height={27}
                        alt="Comments icon"
                      />
                    </button>
                    <button>
                      <img
                        src="/posts/paper_plane.svg"
                        width={27}
                        height={27}
                        alt="Paper plane icon"
                      />
                    </button>
                  </div>
                  <div>
                    <button onClick={handleBookmark}>
                      {bookmarks.some(
                        (bookmark) => bookmark.postId == post.id
                      ) ? (
                        <img
                          src="/posts/bookmark_fill.svg"
                          width={24}
                          height={24}
                          alt="Bookmark icon"
                        />
                      ) : (
                        <img
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
                <div className={styles.post__addComment}>
                  <textarea
                    placeholder="Добавьте комментарий..."
                    onInput={handleTextarea}
                    value={textarea}
                  ></textarea>
                  {textarea === "" ? null : (
                    <button
                      className={styles.button_regular}
                      onClick={addComment}
                    >
                      Опубликовать
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
