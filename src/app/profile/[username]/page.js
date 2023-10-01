"use client";
import LayoutNavOneColumn from "@/components/layouts/LayoutNavOneColumn";
import styles from "@/styles/profie.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import SubscribeModal from "@/components/SubscibeModal";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUsername } from "@/app/store/slice/postsSlice";
import PostProfile from "@/components/PostProfile";

export default function Profile() {
  const [modal, setModal] = useState(false);
  const { username } = useParams();

  const myPosts = useSelector((state) => state.posts.myPosts);
  const dispatch = useDispatch();

  console.log(username);
  console.log(myPosts);

  useEffect(() => {
    dispatch(getPostsByUsername(username));
    // NOTE: Dynamic title like: Enri @username | Instagram
    document.title = `@${username} | Instagram`;
    return function () {
      document.title = "Instagram";
    };
  }, [dispatch, username]);

  function handleModal() {
    setModal(!modal);
  }

  return (
    <LayoutNavOneColumn>
      {modal && <SubscribeModal onModal={handleModal} />}
      <div className={styles.profile_container}>
        <div className={styles.profile__avatar}>
          <Image
            src="/posts/avatar_sample.webp"
            width={150}
            height={150}
            alt="avatar "
          />
        </div>
        <div className={styles.profile__info}>
          <div className={styles.info__header}>
            <span>username</span>
            <button className={styles.button_secondary}>
              Редактировать профиль
            </button>
            <button>
              <Image
                src="/posts/settings.svg"
                width={24}
                height={24}
                alt="post"
              />
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
      {myPosts.map((post) => (
        <PostProfile key={post.id} post={post} />
      ))}
    </LayoutNavOneColumn>
  );
}
