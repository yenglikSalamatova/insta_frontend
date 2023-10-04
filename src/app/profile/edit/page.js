"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LayoutNavOneColumn from "@/components/layouts/LayoutNavOneColumn";
import styles from "@/styles/profie.module.scss";
import Image from "next/image";
import { END_POINT } from "@/utils/endPoint";
import { editUser } from "@/app/store/slice/authSlice";

export default function EditProfile() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [full_name, setFull_name] = useState("");
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [newPhoto, setNewPhoto] = useState("");

  useEffect(() => {
    if (currentUser) {
      setFull_name(currentUser.full_name || "");
      setUsername(currentUser.username || "");
      setPhoto(currentUser.profilePicture || "");
      setBio(currentUser.bio || "");
    }
  }, [currentUser]);

  const dispatch = useDispatch();

  const handleEdit = () => {
    console.log("edit");
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("avatar", newPhoto || photo);

    dispatch(editUser(formData));
    // location.reload();
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
                <Image
                  src={URL.createObjectURL(newPhoto)}
                  width={150}
                  height={150}
                  alt="avatar"
                />
              ) : (
                <Image
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
