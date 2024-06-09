"use client";
import LayoutNavOneColumn from "@/components/layouts/LayoutNavOneColumn";
import styles from "@/styles/profie.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import SubscribeModal from "@/components/modals/SubscibeModal";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUsername, clearPosts } from "@/app/store/slice/postsSlice";
import { getUserByUsername } from "@/app/store/slice/postsSlice";
import PostProfile from "@/components/profile/ProfilePost";
import { END_POINT } from "@/utils/endPoint";
import Link from "next/link";
import LayoutWithoutAuth from "@/components/layouts/LayoutWithoutAuth";
import Spinner from "@/components/Spinner";
import {
  getFollowing,
  followUser,
  unfollowUser,
  clearSubscriptions,
} from "@/app/store/slice/subscriptionSlice";
import { getBookmarks } from "@/app/store/slice/likesSlice";

export default function ProfileByUsernamePage() {
  const [modal, setModal] = useState("");
  const [publicationsType, setPublicationsType] = useState("posts");
  const [viewportIs820, setViewportIs820] = useState(window.innerWidth <= 820);

  const { username } = useParams();

  const profilePosts = useSelector((state) => state.posts.profilePosts);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const profileUser = useSelector((state) => state.posts.profile);
  const savedPosts = useSelector((state) => state.likes.bookmarks);

  // console.log("profilePosts", profilePosts);
  // console.log("saved posts", savedPosts);

  // console.log("Profile", profileUser);

  const dispatch = useDispatch();

  const following = useSelector((state) => state.subscription.following);
  // console.log("Profile", "followings", following);

  useEffect(() => {
    dispatch(getPostsByUsername(username));
    dispatch(getUserByUsername(username));
    if (currentUser) {
      dispatch(getFollowing(currentUser?.username));
      dispatch(getBookmarks());
    }

    document.title = `@${username} | Instagram`;

    return () => {
      dispatch(clearPosts());
      dispatch(clearSubscriptions());
    };
  }, [dispatch, username, currentUser]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 820) {
        setViewportIs820(true);
      } else {
        setViewportIs820(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function openModal(type) {
    setModal(type);
  }

  function closeModal() {
    setModal("");
  }

  function handleChangePublicationsType(type) {
    setPublicationsType(type);
  }

  async function handleFollow() {
    dispatch(followUser(profileUser, currentUser));
  }

  async function handleUnfollow() {
    dispatch(unfollowUser(profileUser, currentUser));
  }

  if (!profileUser.id || !username) {
    return <Spinner />;
  }

  const html = (
    <>
      {modal && <SubscribeModal closeModal={closeModal} modal={modal} />}
      <div className={styles.profile_container}>
        <div className={styles.profile__avatar}>
          <img
            src={`${profileUser.profilePicture}`}
            width={150}
            height={150}
            alt="avatar "
          />
        </div>
        <div className={styles.profile__info}>
          <div className={styles.info__header}>
            <span>{username}</span>

            {currentUser && currentUser.id === profileUser.id && (
              <Link href="/profile/edit" className={styles.button_secondary}>
                Редактировать профиль
              </Link>
            )}
            {currentUser &&
              currentUser.id !== profileUser.id &&
              following.some((flw) => flw.followingId == profileUser.id) && (
                <button
                  className={styles.button_secondary}
                  onClick={handleUnfollow}
                >
                  Отписаться
                </button>
              )}
            {currentUser &&
              currentUser.id !== profileUser.id &&
              !following.some((flw) => flw.followingId == profileUser.id) && (
                <button className={styles.button_blue} onClick={handleFollow}>
                  Подписаться
                </button>
              )}
          </div>
          {!viewportIs820 && (
            <div className={styles.info__subscriptions}>
              <span>
                <b>{profilePosts.length} </b>публикации
              </span>
              <button onClick={() => openModal("profileFollowers")}>
                <b>{profileUser.followersCount} </b>подписчиков
              </button>
              <button onClick={() => openModal("profileFollowing")}>
                <b>{profileUser.followingCount} </b>подписок
              </button>
            </div>
          )}

          <p className={styles.info__name}>{profileUser.full_name}</p>
          <p className={styles.info__bio}>{profileUser.bio}</p>
        </div>
      </div>

      {viewportIs820 && (
        <div className={styles.info__mini}>
          <span>
            <b>{profilePosts.length} </b>публикации
          </span>
          <button onClick={() => openModal("profileFollowers")}>
            <b>{profileUser.followersCount} </b>подписчиков
          </button>
          <button onClick={() => openModal("profileFollowing")}>
            <b>{profileUser.followingCount} </b>подписок
          </button>
        </div>
      )}

      <div className={styles.profile__posts}>
        <div className={styles.posts__type}>
          <button
            onClick={() => handleChangePublicationsType("posts")}
            className={publicationsType == "posts" ? styles.active : ""}
          >
            <Image src="/posts/grid.svg" width={12} height={12} alt="post" />
            Публикации
          </button>
          {currentUser && currentUser.id === profileUser.id && (
            <button
              onClick={() => handleChangePublicationsType("saved")}
              className={publicationsType == "saved" ? styles.active : ""}
            >
              {" "}
              <img
                src="/posts/bookmark.svg"
                width={12}
                height={12}
                alt="post"
              />
              Сохраненное
            </button>
          )}
        </div>
        <div className={styles.posts__container}>
          {publicationsType == "posts" &&
            profilePosts.map((post) => (
              <PostProfile key={post.id} post={post} />
            ))}
          {publicationsType == "saved" &&
            savedPosts.map((post) => (
              <PostProfile key={post.id} post={post.post} saved={true} />
            ))}
        </div>
      </div>
    </>
  );

  return <>{html}</>;
}
