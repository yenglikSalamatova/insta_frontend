"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/register.module.scss";
import Link from "next/link";
import Layout from "@/components/layouts/Layout";
import { useSelector, useDispatch } from "react-redux";
import { loginAsync } from "@/app/store/slice/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  const isFormValid = email && password;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    dispatch(loginAsync(email, password));
  };

  return (
    <Layout>
      <main className={styles.main_center}>
        <div className={`${styles.login_left} `}>
          <Image
            src="/mobile.png"
            width={375}
            height={0}
            alt="Instagram Mobile"
          />
        </div>
        <div className={styles.login_right}>
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
            {error && <p className="alert-box error_info">{error}</p>}
            <button
              type="button"
              className={styles.button_blue}
              disabled={!isFormValid}
              onClick={handleButtonClick}
            >
              Войти
            </button>
          </form>
          <div className={styles.form}>
            <p className={styles.text}>
              У вас ещё нет аккаунта?
              <Link className={styles.link} href="/register">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default LoginPage;
