"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LayoutNavOneColumn from "@/components/layouts/LayoutNavOneColumn";
import styles from "@/styles/profie.module.scss";
import Image from "next/image";
import { END_POINT } from "@/utils/endPoint";
import { editUser } from "@/app/store/slice/authSlice";

export default function EditProfile() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [full_name, setFull_name] = useState(currentUser.full_name);
  const [username, setUsername] = useState(currentUser.username);
  const [photo, setPhoto] = useState(currentUser.profilePicture);
  const [bio, setBio] = useState(currentUser.bio);
  const [newPhoto, setNewPhoto] = useState("");

  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  const success = useSelector((state) => state.auth.success);

  const handleEdit = () => {
    console.log("edit");
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("avatar", newPhoto || photo);

    dispatch(editUser(formData));
  };

  return (
    <LayoutNavOneColumn>
      <div className={styles.edit}>
        <h3 className={styles.h3}>Редактировать профиль</h3>
        <form>
          <fieldset>
            <label>Имя и Фамилия</label>
            <input
              type="text"
              placeholder="Введите имя и фамилию"
              value={full_name}
              onChange={(e) => setFull_name(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label>Имя пользователя</label>
            <input
              type="text"
              placeholder="Введите имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label>Фото профиля</label>
            <div className={styles.avatar}>
              {newPhoto ? (
                <img
                  src={URL.createObjectURL(newPhoto)}
                  width={150}
                  height={150}
                  alt="avatar"
                />
              ) : (
                <img
                  src={`${END_POINT}/${photo}`}
                  width={150}
                  height={150}
                  alt="avatar"
                />
              )}

              <div className={styles.upload}>
                <input
                  type="file"
                  placeholder="Выберите фото"
                  onChange={(e) => setNewPhoto(e.target.files[0])}
                  className={styles.file}
                  accept="image/*"
                />
                <button type="button" className={styles.button_secondary}>
                  Выбрать фото{" "}
                </button>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <label>Обо мне</label>
            <input
              type="text"
              placeholder="Опишите себя"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
          {error && <p className="alert-box error_info">{error}</p>}
          {success && <p className="alert-box success_info">Сохранено</p>}
          <button
            type="button"
            className={styles.button_blue}
            onClick={handleEdit}
          >
            Сохранить
          </button>
        </form>
      </div>
    </LayoutNavOneColumn>
  );
}
