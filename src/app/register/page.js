import styles from "../../styles/register.module.scss";

import Image from "next/image";

export const metadata = {
  title: "Зарегистрироваться • Instagram",
};

export default function Register() {
  return (
    <>
      <div className={styles.main_center}>
        <form className={styles.form}>
          <div className={styles.form__header}>
            <Image
              src="/logo.png"
              width={175}
              height={0}
              style={{ height: "auto" }}
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
          <button className={styles.button_blue}>Регистрация</button>
        </form>

        <div className={styles.form}>
          <p className={styles.text}>
            Есть аккаунт? <a>Вход</a>
          </p>
        </div>
      </div>
    </>
  );
}
