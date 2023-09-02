"use client";

import React from "react";
import { useState } from "react";
import styles from "@/styles/createPostModal.module.scss";
import Image from "next/image";

const CreatePostModal = ({ onCreatePost }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay} onClick={onCreatePost}></div>
      <button className={styles.modal__close} onClick={onCreatePost}>
        <Image src="/posts/close.svg" width={30} height={30} alt="Close" />
      </button>
      <div className={styles.modal__block}>
        <div className={styles.modal__header}>
          <h3>Создание публикации</h3>
        </div>
        <div className={styles.modal__body}>
          <Image
            src="/posts/camera.svg"
            width={55}
            height={55}
            alt="Camera icon"
          />
          <p className={styles.modal__text}>Перетащите сюда фото и видео</p>
          <button className={styles.button_blue}>Выбрать на компьютере</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
