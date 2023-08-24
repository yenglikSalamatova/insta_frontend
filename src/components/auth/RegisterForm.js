"use client";

import styles from "@/styles/register.module.scss";
import Image from "next/image";
import { useState } from "react";
import { DaySelector, MonthSelector, YearSelector } from "./DateSelectors";

export default function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <form className={styles.form}>
      {currentStep === 1 && (
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
            Люди, которые пользуются нашим сервисом, могли загрузить вашу
            контактную информацию в Instagram.{" "}
            <a className={styles.form__link}>Подробнее</a>
          </span>
          <span className={styles.form__info}>
            Регистрируясь, вы принимаете наши{" "}
            <a className={styles.form__link}>Условия</a>,{" "}
            <a className={styles.form__link}>Политику конфиденциальности</a> и{" "}
            <a className={styles.form__link}>
              Политику в отношении файлов cookie
            </a>
            .
          </span>
          <button className={styles.button_blue} onClick={nextStep}>
            Регистрация
          </button>
        </>
      )}

      {currentStep === 2 && (
        <>
          <div className={styles.form__header}>
            <Image
              src="/auth/cake.png"
              width={100}
              height={0}
              className={styles.form__image}
              alt="Instagram logo"
            />
            <p className={styles.textBold}>Укажите дату вашего рождения</p>
            <p className={styles.text}>
              Эта информация не будет показываться в вашем общедоступном
              профиле.
            </p>
            <a className={styles.link}>Почему нужно указывать дату рождения?</a>
          </div>

          <div className={styles.form__birth}>
            {" "}
            <DaySelector value={day} onChange={handleDayChange} />
            <MonthSelector value={month} onChange={handleMonthChange} />
            <YearSelector value={year} onChange={handleYearChange} />
          </div>

          <p className={styles.form__info}>
            Требуется ввести дату вашего рождения
          </p>
          <p className={styles.form__info}>
            Укажите собственный день рождения, даже если вы создаете этот
            аккаунт для компании, домашнего животного и пр.
          </p>
          <button className={styles.button_blue}>Далее</button>
          <button className={styles.button_regular} onClick={prevStep}>
            Назад
          </button>
        </>
      )}
    </form>
  );
}
