import Image from "next/image";
import { useState } from "react";
import styles from "@/styles/postModal.module.scss";
import Link from "next/link";

export default function PostModal({
  post,
  handlePostModal,
  handleLike,
  handleBookmark,
  like,
  bookmark,
}) {
  const [textarea, setTextarea] = useState("");
  const [comments, setComments] = useState([]);

  const addComment = (e) => {
    console.log(textarea);
    console.log(comments);
    e.preventDefault();
    setComments([...comments, { text: textarea }]);
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

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={handlePostModal}></div>
      <button className={styles.modal__close} onClick={handlePostModal}>
        <Image src="/posts/close.svg" width={30} height={30} alt="Close" />
      </button>
      <div className={styles.modal__content}>
        <div className={styles.modal__media}>
          <img src={post.media} alt="Post media" />
        </div>
        <div className={styles.modal__info}>
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
              <Link href="/">{post.username}</Link>
              <p>{post.caption}</p>
            </div>
            <div className={styles.comments_container}>
              {comments.map((comment) => {
                return (
                  <div className={styles.post__comments} key={comment.text}>
                    <Image
                      src={post.userImage}
                      width={30}
                      height={30}
                      className={styles.avatar}
                      alt="Avatar image of"
                    />
                    <div className={styles.comments__main}>
                      <div className={styles.comments__text}>
                        <Link href="/">username</Link>
                        <p className={styles.comments__text}>{comment.text}</p>
                      </div>
                      <div className={styles.comments__action}>
                        <span>time</span>
                        <button>Ответить</button>
                      </div>
                    </div>
                    <button>
                      <Image
                        src="/posts/heart_stroke.svg"
                        width={18}
                        height={18}
                        alt="Like"
                        className="like"
                      />
                    </button>
                  </div>
                );
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
                <p>{post.likes} отметок &quot;Нравится&quot;</p>
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
    </div>
  );
}
