import styles from "@/styles/navbar.module.scss";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/posts">
        <Image
          className={styles.logo}
          src="/logo.png"
          width={110}
          height={0}
          alt="Instagram logo"
        />
      </Link>

      <Link href="/">
        <Image
          className="img"
          src="/posts/house_stroke.svg"
          width={24}
          height={0}
          alt="House Stroke Icon"
        />
        Главная
      </Link>
      <Link href="/">
        <Image
          className="img"
          src="/posts/glass_stroke.svg"
          width={24}
          height={0}
          alt="Glass Stroke Icon"
        />
        Поисковый запрос
      </Link>
      <Link href="/">
        <Image
          className="img"
          src="/posts/compass_stroke.svg"
          width={24}
          height={0}
          alt="Compass Stroke Icon"
        />
        Интересное
      </Link>
      <Link href="/">
        <Image
          className="img"
          src="/posts/messenger_logo_stroke.svg"
          width={24}
          height={0}
          alt="Messenger Stroke Icon"
        />
        Сообщения
      </Link>
      <Link href="/">
        <Image
          className="img"
          src="/posts/monitor_play_stroke.svg"
          width={24}
          height={0}
          alt="Reels Stroke Icon"
        />
        Reels
      </Link>
      <Link href="/">
        <Image
          className="img"
          src="/posts/heart_stroke.svg"
          width={24}
          height={0}
          alt="Heart Stroke Icon"
        />
        Уведомления
      </Link>
      <Link href="/">
        <Image
          className="img"
          src="/posts/plus_circle_stroke.svg"
          width={24}
          height={0}
          alt="Heart Stroke Icon"
        />
        Создать
      </Link>
      <Link href="/">
        <Image
          className="avatar"
          src="/posts/avatar_sample.webp"
          width={24}
          height={0}
          alt="Your Avatar"
        />
        Профиль
      </Link>
    </nav>
  );
};

export default NavBar;
