import React from "react";
import Image from "next/image";
import styles from "@/styles/register.module.scss";

const Step1 = ({ onNext }) => {
  return (
    <>
      <div className={styles.form__header}>
        <Image
          className={styles.form__image}
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
      />
      <input
        type="text"
        placeholder="Имя и фамилия"
        className={styles.form__input}
      />

      <input
        type="text"
        placeholder="Имя пользователя"
        className={styles.form__input}
      />
      <input
        type="password"
        placeholder="Пароль"
        className={styles.form__input}
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
      <button className={styles.button_blue} onClick={onNext}>
        Регистрация
      </button>
    </>
  );
};

export default Step1;
