"use client";

import React from "react";
import { useState, useEffect } from "react";
import styles from "@/styles/createPostModal.module.scss";
import Image from "next/image";
import { editPost } from "@/app/store/slice/postsSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { END_POINT } from "@/utils/endPoint";

const CreatePostModal = ({ onToggle, post, closeAll }) => {
  const [selectedFile, setSelectedFile] = useState(
    `${END_POINT}/${post.media[0].url}`
  );
  const [textarea, setTextarea] = useState(post.caption);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleEdit = async () => {
    console.log("edit");
    const formData = new FormData();
    formData.append("caption", textarea);
    try {
      await dispatch(editPost(post.id, formData));
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay} onClick={closeAll}></div>
      <button className={styles.modal__close} onClick={closeAll}>
        <Image src="/posts/close.svg" width={30} height={30} alt="Close" />
      </button>

      {selectedFile && (
        <div className={styles.modal__block}>
          <div className={styles.modal__header + " flex-between-center"}>
            <button className={styles.button_regular} onClick={closeAll}>
              Отмена
            </button>
            <h3>Редактирование</h3>
            <button className={styles.button_regular} onClick={handleEdit}>
              Сохранить
            </button>
          </div>
          <div className={styles.modal__body}>
            <div className={styles.modal__caption}>
              <textarea
                className={styles.modal__textarea}
                placeholder="Добавьте подпись"
                onChange={(e) => setTextarea(e.target.value)}
                value={textarea}
              ></textarea>

              <div className={styles.modal__preview_wrapper + " flex-center"}>
                <Image
                  src={selectedFile}
                  alt="Предпросмотр"
                  className={styles.modal__preview}
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostModal;
