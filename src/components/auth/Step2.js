import React from "react";
import Image from "next/image";
import styles from "@/styles/register.module.scss";
import { DaySelector, MonthSelector, YearSelector } from "./DateSelectors";
import { useState } from "react";

const Step2 = ({ onNext, onPrev }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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
          Эта информация не будет показываться в вашем общедоступном профиле.
        </p>
        <a className={styles.link}>Почему нужно указывать дату рождения?</a>
      </div>

      <div className={styles.form__birth}>
        {" "}
        <DaySelector value={day} onChange={handleDayChange} />
        <MonthSelector value={month} onChange={handleMonthChange} />
        <YearSelector value={year} onChange={handleYearChange} />
      </div>

      <p className={styles.form__info}>Требуется ввести дату вашего рождения</p>
      <p className={styles.form__info}>
        Укажите собственный день рождения, даже если вы создаете этот аккаунт
        для компании, домашнего животного и пр.
      </p>
      <button className={styles.button_blue} onClick={onNext}>
        Далее
      </button>
      <button className={styles.button_regular} onClick={onPrev}>
        Назад
      </button>
    </>
  );
};

export default Step2;
