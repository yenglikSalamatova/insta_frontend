"use client";
import LayoutNavOneColumn from "@/components/layouts/LayoutNavOneColumn";
import styles from "@/styles/profie.module.scss";
import Image from "next/image";
import { useState } from "react";
import SubscribeModal from "@/components/SubscibeModal";
import { useParams } from "next/navigation";

export default function Profile() {
  const [modal, setModal] = useState(false);

  const { id } = useParams();
  console.log(id);

  function handleModal() {
    setModal(!modal);
  }

  return (
    <LayoutNavOneColumn>
      {modal && <SubscribeModal onModal={handleModal} />}
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
            <button>
              <Image src="/posts/settings.svg" width={24} height={24} />
            </button>
          </div>
          <div className={styles.info__subscriptions}>
            <span>
              <b>0 </b>публикации
            </span>
            <button onClick={handleModal}>
              <b>0 </b>подписчиков
            </button>
            <button>
              <b>0 </b>подписок
            </button>
          </div>
          <p className={styles.info__name}>Name</p>
        </div>
      </div>
      <div className={styles.profile__posts}>
        <div className={styles.posts__type}>
          <button>
            <Image src="/posts/grid.svg" width={12} height={12} />
            Публикации
          </button>
          <button>
            {" "}
            <Image src="/posts/bookmark.svg" width={12} height={12} />
            Сохраненное
          </button>
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
