"use client";

import React from "react";
import { useState, useEffect } from "react";
import styles from "@/styles/createPostModal.module.scss";
import Image from "next/image";
import { createStory } from "@/app/store/slice/storiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const CreateStorysModal = ({ onToggle }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const stories = useSelector((state) => state.stories.followedStories);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCreate = async () => {
    console.log("created");
    const formData = new FormData();
    formData.append("content", selectedFile);
    formData.append("title", "");
    try {
      dispatch(createStory(formData, onToggle));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrev = () => {
    setSelectedFile(null);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay} onClick={onToggle}></div>
      <button className={styles.modal__close} onClick={onToggle}>
        <Image src="/posts/close.svg" width={30} height={30} alt="Close" />
      </button>
      {!selectedFile && (
        <div className={styles.modal__block}>
          <div className={styles.modal__header}>
            <h3>Создание истории</h3>
          </div>
          <div className={styles.modal__body + " flex-center"}>
            <img
              src="/posts/camera.svg"
              width={55}
              height={55}
              alt="Camera icon"
            />
            <p className={styles.modal__text}>Перетащите сюда фото и видео</p>
            <div className={styles.file_input}>
              <input type="file" onChange={handleFileChange} />
              <button className={styles.button_blue} onClick={handleCreate}>
                Выбрать на компьютере
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedFile && (
        <div className={styles.modal__block_auto}>
          <div className={styles.modal__header + " flex-between-center"}>
            <button className={styles.button_regular} onClick={handlePrev}>
              Назад
            </button>
            <h3>Предпросмотр</h3>
            <button className={styles.button_regular} onClick={handleCreate}>
              Опубликовать
            </button>
          </div>
          <div className={styles.modal__body}>
            <div className={styles.modal__caption}>
              <div
                className={
                  styles.modal__preview_wrapper_stories + " flex-center "
                }
              >
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Предпросмотр"
                  className={styles.modal__preview}
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStorysModal;
