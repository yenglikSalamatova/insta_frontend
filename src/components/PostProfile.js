import Image from "next/image";
import styles from "@/styles/profie.module.scss";

export default function PostProfile({ post }) {
  return (
    <div className={styles.profile__posts}>
      <div className={styles.posts__type}>
        <button>
          <Image src="/posts/grid.svg" width={12} height={12} alt="post" />
          Публикации
        </button>
        <button>
          {" "}
          <Image src="/posts/bookmark.svg" width={12} height={12} alt="post" />
          Сохраненное
        </button>
      </div>
      <div className={styles.posts__container}>
        <div className={styles.posts__item}>
          <Image src="" width={300} height={300} alt="post" />
        </div>
        <div className={styles.posts__item}>
          <Image src="/posts/photo.avif" width={300} height={300} alt="post" />
        </div>
      </div>
    </div>
  );
}
