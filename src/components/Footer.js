import styles from "@/styles/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__ul}>
        <li>
          <a href="https://www.example.com/about">Meta</a>
        </li>
        <li>
          <a href="https://www.example.com/contact">Информация</a>
        </li>
        <li>
          <a href="https://www.example.com/terms">Блог</a>
        </li>
        <li>
          <a href="https://www.example.com/terms">Вакансии</a>
        </li>
        <li>
          <a href="https://www.example.com/terms">Помощь</a>
        </li>
        <li>
          <a href="https://www.example.com/terms">API</a>
        </li>
        <li>
          <a href="https://www.example.com/terms">Конфиденциальность</a>
        </li>
        <li>
          <a href="https://www.example.com/terms">Условия</a>
        </li>
        <li>
          <a href="https://www.example.com/terms">Популярные аккаунты</a>
        </li>
        <li>
          <a href="https://www.example.com/terms">Места</a>
        </li>
        <li>
          <a href="https://www.example.com/terms">
            Загрузка контактов и лица, не являющиеся пользователями
          </a>
        </li>
      </ul>
      <p>© 2023 Instagram Clone from Enlik</p>
    </footer>
  );
}
