"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/register.module.scss";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email && password;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <main className={styles.main_center}>
      <form className={styles.form}>
        <div className={styles.form__header}>
          <Image
            className="logo"
            src="/logo.png"
            width={175}
            height={0}
            alt="Instagram logo"
          />
        </div>

        <input
          type="text"
          placeholder="Моб.телефон или эл.адрес"
          className={styles.form__input}
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Пароль"
          className={styles.form__input}
          value={password}
          onChange={handlePasswordChange}
        />
        <button className={styles.button_blue} disabled={!isFormValid}>
          Войти
        </button>
      </form>
      <div className={styles.form}>
        <p className={styles.text}>
          У вас ещё нет аккаунта?{" "}
          <Link className={styles.link} href="/register">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
