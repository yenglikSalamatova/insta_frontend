import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/register.module.scss";

const Step3 = ({ onNext, onPrev }) => {
  const [verificationCode, setVerificationCode] = useState(null);
  const isFormValid = verificationCode?.length === 6;

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
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
          Введите код подтверждения, который мы отправили на электронный адрес
          yengliksalamatova@gmail.com.
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
      <button
        className={styles.button_blue}
        onClick={onNext}
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
