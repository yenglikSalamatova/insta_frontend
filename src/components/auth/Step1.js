import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/register.module.scss";

const Step1 = ({ onNext, onInputChange, formData }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormValidation = () => {
    if (
      formData.email.length > 4 &&
      formData.full_name.length > 4 &&
      formData.username.length > 4 &&
      formData.password.length > 0
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    handleFormValidation();
  }, [formData]);

  return (
    <>
      <div className={styles.form__header}>
        <Image
          className="logo"
          src="/logo.png"
          width={175}
          height={0}
          alt="Instagram logo"
        />
        <p className={styles.form__text}>
          Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.
        </p>
      </div>

      <input
        type="text"
        placeholder="Моб.телефон или эл.адрес"
        className={styles.form__input}
        value={formData.email}
        onChange={onInputChange}
        name="email"
      />
      <input
        type="text"
        placeholder="Имя и фамилия"
        className={styles.form__input}
        value={formData.full_name}
        onChange={onInputChange}
        name="full_name"
      />

      <input
        type="text"
        placeholder="Имя пользователя"
        className={styles.form__input}
        value={formData.username}
        onChange={onInputChange}
        name="username"
      />
      <input
        type="password"
        placeholder="Пароль"
        className={styles.form__input}
        value={formData.password}
        onChange={onInputChange}
        name="password"
      />
      <span className={styles.form__info}>
        Люди, которые пользуются нашим сервисом, могли загрузить вашу контактную
        информацию в Instagram. <a className={styles.form__link}>Подробнее</a>
      </span>
      <span className={styles.form__info}>
        Регистрируясь, вы принимаете наши{" "}
        <a className={styles.form__link}>Условия</a>,{" "}
        <a className={styles.form__link}>Политику конфиденциальности</a> и{" "}
        <a className={styles.form__link}>Политику в отношении файлов cookie</a>.
      </span>

      <button
        className={styles.button_blue}
        onClick={onNext}
        disabled={!isFormValid}
      >
        Регистрация
      </button>
    </>
  );
};

export default Step1;
