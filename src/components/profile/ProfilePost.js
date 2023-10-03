import Image from "next/image";
import styles from "@/styles/profie.module.scss";
import { useState, useEffect } from "react";
import { END_POINT } from "@/utils/endPoint";
import PostModal from "@/components/modals/PostModal";

export default function ProfilePost({ post }) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal && <PostModal postId={post.id} togglePostModal={toggleModal} />}
      <div className={styles.posts__item} onClick={toggleModal}>
        <div className={styles.posts__overlay}>
          <div className={styles.icon}>
            <Image
              src="/posts/heart_fill.svg"
              width={20}
              height={20}
              alt="heart"
            />
            <p>{post.likesCount}</p>
          </div>
          <div className={styles.icon}>
            {" "}
            <Image
              src="/posts/comments.svg"
              width={20}
              height={20}
              alt="heart"
            />
            <p>{post.commentsCount}</p>
          </div>
        </div>
        <Image
          src={`${END_POINT}/${post.media[0].url}`}
          width={300}
          height={300}
          alt="post"
        />
      </div>
    </>
  );
}
