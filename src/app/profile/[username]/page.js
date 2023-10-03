"use client";
import LayoutNavOneColumn from "@/components/layouts/LayoutNavOneColumn";
import styles from "@/styles/profie.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import SubscribeModal from "@/components/modals/SubscibeModal";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUsername } from "@/app/store/slice/postsSlice";
import PostProfile from "@/components/profile/ProfilePost";
import { END_POINT } from "@/utils/endPoint";

export default function Profile() {
  const [modal, setModal] = useState("");
  const [publicationsType, setPublicationsType] = useState("posts");

  const { username } = useParams();

  const profilePosts = useSelector((state) => state.posts.profilePosts);
  const savedPosts = [];

  console.log(profilePosts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsByUsername(username));
    // NOTE: Dynamic title like: Enri @username | Instagram
    document.title = `@${username} | Instagram`;
    return function () {
      document.title = "Instagram";
    };
  }, [dispatch, username]);

  function openModal(type) {
    setModal(type);
  }

  function closeModal() {
    setModal("");
  }

  function handleChangePublicationsType(type) {
    setPublicationsType(type);
  }

  if (profilePosts.length < 1) {
    return null;
  }

  return (
    <LayoutNavOneColumn>
      {modal && <SubscribeModal closeModal={closeModal} modal={modal} />}
      <div className={styles.profile_container}>
        <div className={styles.profile__avatar}>
          <Image
            src={`${END_POINT}/${profilePosts[0].user.profilePicture}`}
            width={150}
            height={150}
            alt="avatar "
          />
        </div>
        <div className={styles.profile__info}>
          <div className={styles.info__header}>
            <span>{username}</span>
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
              <b>{profilePosts.length} </b>публикации
            </span>
            <button onClick={() => openModal("followers")}>
              <b>{profilePosts[0].user.followersCount} </b>подписчиков
            </button>
            <button onClick={() => openModal("following")}>
              <b>{profilePosts[0].user.followingCount} </b>подписок
            </button>
          </div>
          <p className={styles.info__name}>{profilePosts[0].user.full_name}</p>
        </div>
      </div>

      <div className={styles.profile__posts}>
        <div className={styles.posts__type}>
          <button
            onClick={() => handleChangePublicationsType("posts")}
            className={publicationsType == "posts" ? styles.active : ""}
          >
            <Image src="/posts/grid.svg" width={12} height={12} alt="post" />
            Публикации
          </button>
          <button
            onClick={() => handleChangePublicationsType("saved")}
            className={publicationsType == "saved" ? styles.active : ""}
          >
            {" "}
            <Image
              src="/posts/bookmark.svg"
              width={12}
              height={12}
              alt="post"
            />
            Сохраненное
          </button>
        </div>
        <div className={styles.posts__container}>
          {publicationsType == "posts" &&
            profilePosts.map((post) => (
              <PostProfile key={post.id} post={post} />
            ))}
          {publicationsType == "saved" &&
            savedPosts.map((post) => <PostProfile key={post.id} post={post} />)}
        </div>
      </div>
    </LayoutNavOneColumn>
  );
}
