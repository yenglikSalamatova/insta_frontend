"use client";

import React from "react";
import { useState } from "react";

import styles from "@/styles/postBlock.module.scss";
import Image from "next/image";
import Story from "@/components/stories/Story";
import Link from "next/link";
import PostModal from "../modals/PostModal";
import { END_POINT } from "@/utils/endPoint";
import { useRouter } from "next/navigation";
import { timestampConvert } from "@/utils/timestampConvert";
import SettingsPostModal from "@/components/modals/SettingsPostModal";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "@/app/store/slice/postsSlice";
import { likeEntity, unlikeEntity } from "@/app/store/slice/likesSlice";

const PostBlock = ({ post, isLiked }) => {
  const [bookmark, setBookmark] = useState(false);
  const [textarea, setTextarea] = useState("");
  const [postModal, setPostModal] = useState(false);
  const [settings, setSettings] = useState(false);

  const router = useRouter();

  const likes = useSelector((state) => state.likes.likes);
  const stories = useSelector((state) => state.stories.followedStories);

  const dispatch = useDispatch();

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikeEntity({ entityId: post.id, entityType: "post" }));
    } else {
      dispatch(likeEntity({ entityId: post.id, entityType: "post" }));
    }
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

  const addComment = () => {
    dispatch(createComment({ postId: post.id, text: textarea }));
    setTextarea("");
  };

  console.log("Post", stories, post);

  if (!post || !post.media[0]?.url) {
    return null;
  }

  return (
    <>
      {postModal && (
        <PostModal postId={post.id} togglePostModal={togglePostModal} />
      )}

      <div className={styles.post}>
        {settings && (
          <SettingsPostModal
            post={post}
            closeModal={() => setSettings(false)}
          />
        )}

        <div className={styles.post__header}>
          <div className={styles.post__userinfo}>
            <Story
              story={post}
              post={true}
              active={stories.some((s) => s.userId === post.userId)}
            />

            <Link href={`/profile/${post.user.username}`}>
              {post.user.username}
            </Link>
            <div>•</div>
            <p>{timestampConvert(post.createdAt)}</p>
          </div>
          <button
            className={styles.post__settings}
            onClick={() => setSettings(true)}
          >
            <img
              src="/posts/dots_icon.svg"
              width={20}
              height={20}
              alt="Icon dots settings"
            />
          </button>
        </div>
        <div className={styles.post__media}>
          <img
            src={`${END_POINT}${post.media[0].url}`}
            alt="photo"
            width={500}
            height={500}
          />
        </div>
        <div className={styles.post__actions}>
          <div>
            <button onClick={handleLike}>
              {isLiked ? (
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
            <button onClick={togglePostModal}>
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
              {bookmark ? (
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
            onChange={(e) => setTextarea(e.target.value)}
            onInput={handleTextarea}
            value={textarea}
          ></textarea>
          {textarea === "" ? null : (
            <button className={styles.button_regular} onClick={addComment}>
              Опубликовать
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PostBlock;
