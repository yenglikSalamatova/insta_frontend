import styles from "@/styles/postModal.module.scss";
import Image from "next/image";
import Link from "next/link";
import { END_POINT } from "@/utils/endPoint";
import { timestampConvert } from "@/utils/timestampConvert";
import { useState } from "react";
import SettingsCommentsModal from "@/components/modals/SettingsCommentsModal";
import { useDispatch, useSelector } from "react-redux";
import { likeEntity, unlikeEntity } from "@/app/store/slice/likesSlice";

export default function Comment({ comment }) {
  const [settings, setSettings] = useState(false);

  const likes = useSelector((state) => state.likes.likes);
  const dispatch = useDispatch();

  const handleLike = () => {
    if (likes.some((like) => like.commentId == comment.id)) {
      dispatch(unlikeEntity({ entityId: comment.id, entityType: "comment" }));
    } else {
      dispatch(likeEntity({ entityId: comment.id, entityType: "comment" }));
    }
  };

  // FIX: ДОДЕЛАТЬ УДАЛЕНИЕ И РЕДАКТИРОВАНИЕ КОММЕНТАРИЯ
  const openCommentSettings = () => {
    setSettings(true);
  };

  return (
    <div className={styles.post__comments} key={comment.id}>
      {settings && (
        <SettingsCommentsModal
          closeModal={() => setSettings(false)}
          comment={comment}
        />
      )}

      <Image
        src={`${END_POINT}${comment.user.profilePicture}`}
        width={30}
        height={30}
        className={styles.avatar}
        alt="Avatar image of"
      />
      <div className={styles.comments__main}>
        <div className={styles.comments__text}>
          <Link href={`/profile/${comment.user.username}`}>
            {comment.user.username}
          </Link>
          <p className={styles.comments__text}>{comment.text}</p>
        </div>
        <div className={styles.comments__action}>
          <span>{timestampConvert(comment.createdAt)}</span>
          <button onClick={openCommentSettings}>
            <Image
              src="/posts/dots_icon.svg"
              width={18}
              height={18}
              alt="Icon dots settings"
            />
          </button>
        </div>
      </div>
      <button onClick={handleLike}>
        {likes.some((like) => like.commentId == comment.id) ? (
          <Image
            src="/posts/heart_fill.svg"
            width={18}
            height={18}
            alt="Like"
            className={`${styles.heart} ${styles.heart__active}`}
          />
        ) : (
          <Image
            src="/posts/heart_stroke.svg"
            width={18}
            height={18}
            alt="Like"
            className="like"
          />
        )}
      </button>
    </div>
  );
}
