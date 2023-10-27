import React from "react";
import Image from "next/image";
import styles from "@/styles/register.module.scss";
import { DaySelector, MonthSelector, YearSelector } from "./DateSelectors";
import { useState } from "react";
import axios from "axios";
import { END_POINT } from "@/utils/endPoint";
import { useEffect } from "react";

const Step2 = ({ onNext, onPrev, setFormData, formData }) => {
  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("1");
  const [year, setYear] = useState("2023");
  const [error, setError] = useState("");

  // const isFormValid = day && month && year;

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const updateBirthdayDate = (day, month, year) => {
    if (day && month && year) {
      const birthday_date = `${year}/${month}/${day}`;

      setFormData({ ...formData, birthday_date });
    }
  };

  const handleRegistration = async () => {
    updateBirthdayDate(day, month, year);
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

  useEffect(() => {
    updateBirthdayDate(day, month, year);
  }, [day, month, year]);

  return (
    <>
      <div className={styles.form__header}>
        <img
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
      {error && <p className=" alert-box error_info">{error}</p>}
      <p className={styles.form__info}>Требуется ввести дату вашего рождения</p>
      <p className={styles.form__info}>
        Укажите собственный день рождения, даже если вы создаете этот аккаунт
        для компании, домашнего животного и пр.
      </p>
      <button
        className={styles.button_blue}
        onClick={handleRegistration}
        type="button"
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
