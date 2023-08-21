import styles from "../../styles/register.module.scss";
import formStyles from "../../styles/form.module.scss";

import { Metadata } from "next";
import Image from "next/image";

export const metadata = {
  title: "Зарегистрироваться • Instagram",
};

export default function Register() {
  return (
    <>
      <main className={styles.main_center}>
        <form className={formStyles.form}>
          <div className={formStyles.form__header}>
            <Image
              src="/logo.png"
              width={175}
              height={0}
              style={{ height: "auto" }}
              alt="Instagram logo"
            />
            <p className={formStyles.form__text}>
              Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.
            </p>
          </div>

          <input
            type="text"
            placeholder="Моб.телефон или эл.адрес"
            className={formStyles.form__input}
          />
          <input
            type="text"
            placeholder="Имя и фамилия"
            className={formStyles.form__input}
          />
          <input
            type="text"
            placeholder="Имя и фамилия"
            className={formStyles.form__input}
          />
          <input
            type="text"
            placeholder="Имя пользователя"
            className={formStyles.form__input}
          />
          <input
            type="password"
            placeholder="Пароль"
            className={formStyles.form__input}
          />
          <span className={formStyles.form__info}>
            Люди, которые пользуются нашим сервисом, могли загрузить вашу
            контактную информацию в Instagram. <a>Подробнее</a>
          </span>
          <span className={formStyles.form__info}>
            Регистрируясь, вы принимаете наши <a>Условия</a> ,{" "}
            <a>Политику конфиденциальности</a> и{" "}
            <a>Политику в отношении файлов cookie</a>.
          </span>
          <button>Регистрация</button>
        </form>
      </main>
    </>
  );
}
