import React from "react";
import Image from "next/image";
import styles from "@/styles/register.module.scss";
import { DaySelector, MonthSelector, YearSelector } from "./DateSelectors";
import { useState } from "react";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";

const Step2 = ({ onNext, onPrev, onInputChange, formData }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const isFormValid = day && month && year;

  const handleDayChange = (event) => {
    setDay(event.target.value);
    updateBirthdayDate(event.target.value, month, year);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    updateBirthdayDate(day, event.target.value, year);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
    updateBirthdayDate(day, month, event.target.value);
  };

  const updateBirthdayDate = (day, month, year) => {
    if (day && month && year) {
      const birthday_date = `${year}/${month}/${day}`;
      onInputChange({
        target: { name: "birthday_date", value: birthday_date },
      });
    }
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        `${END_POINT}/api/auth/register`,
        formData
      );
      if (response.status === 200) {
        onNext();
      }
    } catch (error) {
      if (error.response.data.error) setError(error.response.data.error);
      else setError(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.form__header}>
        <Image
          src="/auth/cake.png"
          width={100}
          height={0}
          className={styles.form__image}
          alt="Cake icon"
        />
        <p className={styles.textBold}>Укажите дату вашего рождения</p>
        <p className={styles.text}>
          Эта информация не будет показываться в вашем общедоступном профиле.
        </p>
        <a className={styles.link}>Почему нужно указывать дату рождения?</a>
      </div>

      <div className={styles.form__birth}>
        <DaySelector value={day} onChange={handleDayChange} />
        <MonthSelector value={month} onChange={handleMonthChange} />
        <YearSelector value={year} onChange={handleYearChange} />
      </div>
      {error && <p className="error_info">{error}</p>}
      <p className={styles.form__info}>Требуется ввести дату вашего рождения</p>
      <p className={styles.form__info}>
        Укажите собственный день рождения, даже если вы создаете этот аккаунт
        для компании, домашнего животного и пр.
      </p>
      <button
        className={styles.button_blue}
        onClick={handleRegistration}
        type="button"
        disabled={!isFormValid}
      >
        Далее
      </button>
      <button className={styles.button_regular} onClick={onPrev}>
        Назад
      </button>
    </>
  );
};

export default Step2;
