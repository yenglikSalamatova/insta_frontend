import LayoutNavOneColumn from "@/components/layouts/LayoutNavOneColumn";
import styles from "@/styles/profie.module.scss";
import Image from "next/image";

export default function Profile() {
  return (
    <LayoutNavOneColumn>
      <div className={styles.profile_container}>
        <div className={styles.profile__avatar}>
          <Image src="/posts/avatar_sample.webp" width={150} height={150} />
        </div>
        <div className={styles.profile__info}>
          <div className={styles.info__header}>
            <span>username</span>
            <button className={styles.button_secondary}>
              Редактировать профиль
            </button>
            <button>Settings</button>
          </div>
          <div className={styles.info__subscribtions}>
            <span>
              <b>0 </b>posts
            </span>
            <span>
              <b>0 </b>posts
            </span>
            <span>
              <b>0 </b>posts
            </span>
          </div>
          <p className={styles.info__name}>Name</p>
        </div>
      </div>
      <div className={styles.profile__posts}>
        <div className={styles.posts__type}>
          <button>Публикации</button>
          <button>Сохраненное</button>
        </div>
        <div className={styles.posts__container}>
          <div className={styles.posts__item}>
            <Image src="/posts/photo.avif" width={300} height={300} />
          </div>
          <div className={styles.posts__item}>
            <Image src="/posts/photo.avif" width={300} height={300} />
          </div>
        </div>
      </div>
    </LayoutNavOneColumn>
  );
}
