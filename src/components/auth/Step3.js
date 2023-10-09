"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/register.module.scss";
import { END_POINT } from "@/utils/endPoint";
import axios from "axios";
import { useRouter } from "next/navigation";

const Step3 = ({ onPrev, email }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const isFormValid = verificationCode?.length === 6;

  const router = useRouter();
  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const checkVerificationCode = async () => {
    try {
      const res = await axios.post(`${END_POINT}/api/auth/verify`, {
        code: verificationCode,
        email,
      });
      if (res.status === 200) router.replace("/login");
    } catch (error) {
      if (error.response.data.error) setError(error.response.data.error);
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.form__header}>
        <Image
          src="/auth/email.png"
          width={100}
          height={0}
          className={styles.form__image}
          alt="Email Icon"
        />
        <p className={styles.textBold}>Введите код подтверждения</p>
        <p className={styles.text}>
          Введите код подтверждения, который мы отправили на электронный адрес{" "}
          {email}.
        </p>
        <a className={styles.link}>Запросите код еще раз.</a>
      </div>
      <input
        type="text"
        placeholder="Код подтверждения"
        className={styles.form__input}
        value={verificationCode}
        onChange={handleVerificationCodeChange}
      />
      {error && <p className="alert-box error_info">{error}</p>}
      <button
        type="button"
        className={styles.button_blue}
        onClick={checkVerificationCode}
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

export default Step3;
