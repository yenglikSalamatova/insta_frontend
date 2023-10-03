import styles from "@/styles/settingsModal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "@/app/store/slice/postsSlice";
import EditPostModal from "@/components/modals/EditPostModal";
import { useState } from "react";

export default function SettingsCommentsModal({ closeModal, comment }) {
  const [edit, setEdit] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log("delete");
    dispatch(deletePost(post.id));
    closeModal();
    location.reload();
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className={styles.modal}>
      {edit ? (
        <EditPostModal
          post={post}
          onToggle={toggleEdit}
          closeAll={closeModal}
        />
      ) : (
        <>
          {" "}
          <div className={styles.overlay} onClick={closeModal}></div>
          <div className={styles.modal__content}>
            {currentUser && (
              <div className={styles.modal__body}>
                <ul>
                  <li className={styles.text_red}>Отменить подписку</li>
                  {currentUser.id == post.user.id && (
                    <>
                      {" "}
                      <li className={styles.text_red} onClick={handleDelete}>
                        Удалить
                      </li>
                      <li onClick={toggleEdit}>Редактировать</li>
                    </>
                  )}

                  <li>Добавить в избранное</li>
                  <li>Перейти к публикации</li>
                  <li>Отмена</li>
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
