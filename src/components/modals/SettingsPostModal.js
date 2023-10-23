import styles from "@/styles/settingsModal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "@/app/store/slice/postsSlice";
import EditPostModal from "@/components/modals/EditPostModal";
import { useState } from "react";

export default function SettingsPostModal({ closeModal, post }) {
  const [edit, setEdit] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const handleDelete = () => {
    // console.log("delete");
    dispatch(deletePost(post.id, post.user.username));
    closeModal();
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
                  {currentUser.id == post.user.id && (
                    <>
                      {" "}
                      <li className={styles.text_red} onClick={handleDelete}>
                        Удалить
                      </li>
                      <li onClick={toggleEdit}>Редактировать</li>
                    </>
                  )}

                  <li>Добавить в сохраненные</li>
                  <li onClick={closeModal}>Отмена</li>
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
