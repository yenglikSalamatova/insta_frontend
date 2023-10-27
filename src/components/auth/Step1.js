import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/register.module.scss";
import isValidEmail from "@/utils/isFormValid";
import isLatinLetters from "@/utils/isLatinLettes";

const Step1 = ({ onNext, onInputChange, formData }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFormValidation = () => {
    const { email, full_name, username, password } = formData;
    const errors = {};
    const latinLettersRegex = /^[a-zA-Z]+$/;

    if (!isValidEmail(email) && email.length > 0) {
      errors.email = "Электронный адрес некорректен";
    }

    if (full_name.length < 4 && full_name.length > 0) {
      errors.full_name = "Имя должно быть больше 4-х символов";
    }

    if (!isLatinLetters(username) && username.length > 0) {
      errors.username = "Имя должно содержать только латинские буквы";
    }

    if (username.length < 4 && username.length > 0) {
      errors.username = "Имя должно быть больше 4-х символов";
    }

    if (username.includes(" ") && username.length > 0) {
      errors.username = "Имя не должно содержать пробелов";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    if (
      formData.email.length > 0 ||
      formData.full_name.length > 0 ||
      formData.username.length > 0 ||
      formData.password.length > 0
    ) {
      // console.log("rerender form");
      handleFormValidation();
    }
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
        placeholder="Электронный адрес"
        className={styles.form__input}
        value={formData.email}
        onChange={onInputChange}
        name="email"
      />
      {errors.email && (
        <span className={styles.form__error}>{errors.email}</span>
      )}
      <input
        type="text"
        placeholder="Имя и фамилия"
        className={styles.form__input}
        value={formData.full_name}
        onChange={onInputChange}
        name="full_name"
      />
      {errors.full_name && (
        <span className={styles.form__error}>{errors.full_name}</span>
      )}

      <input
        type="text"
        placeholder="Имя пользователя"
        className={styles.form__input}
        value={formData.username}
        onChange={onInputChange}
        name="username"
      />
      {errors.username && (
        <span className={styles.form__error}>{errors.username}</span>
      )}
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
