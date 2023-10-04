import styles from "@/styles/settingsModal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "@/app/store/slice/postsSlice";

export default function SettingsCommentsModal({ closeModal, comment }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log("delete");
    dispatch(deleteComment(comment.id, comment.postId));
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={closeModal}></div>
      <div className={styles.modal__content}>
        {currentUser && (
          <div className={styles.modal__body}>
            <ul>
              {currentUser.id === comment.user.id && (
                <li onClick={handleDelete} className={styles.text_red}>
                  Удалить
                </li>
              )}
              <li onClick={closeModal}>Отмена</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
