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
import Comment from "@/components/Comment";
import { createComment } from "@/app/store/slice/postsSlice";

export default function PostModal({ postId, togglePostModal }) {
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const [textarea, setTextarea] = useState("");
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.post);

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

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
    setLike(!like);
  };

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  console.log(post);

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
      <button className={styles.modal__close} onClick={togglePostModal}>
        <Image src="/posts/close.svg" width={30} height={30} alt="Close" />
      </button>
      {post.id == postId && (
        <div className={styles.modal__content}>
          <div className={styles.modal__media}>
            <img src={`${END_POINT}${post.media[0].url}`} alt="Post media" />
          </div>
          <div className={styles.modal__info}>
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
                  <Link href="/">{post.user.username}</Link>
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

              <div className={styles.post__caption}>
                <Link href={`/profile/${post.user.username}`}>
                  {post.user.username}
                </Link>
                <p>{post.caption}</p>
              </div>
              <div className={styles.comments_container}>
                {post.comments.map((comment) => {
                  return <Comment comment={comment} key={comment.id} />;
                })}
              </div>

              <div className={styles.post__footer}>
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
