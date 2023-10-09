import ProfileCard from "../recomendations/ProfileCard";
import Search from "../Search";
import styles from "@/styles/SubscribeModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowing,
  getProfileFollowers,
  getProfileFollowing,
  followUser,
  unfollowUser,
} from "@/app/store/slice/subscriptionSlice";
import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SubscribeModal({ closeModal, modal }) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscription[modal]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const following = useSelector((state) => state.subscription.following);

  const { username } = useParams();

  const router = useRouter();

  useEffect(() => {
    if (modal == "profileFollowers") {
      dispatch(getProfileFollowers(username));
    } else {
      dispatch(getProfileFollowing(username));
    }
  }, [dispatch, username, modal, currentUser]);

  console.log("Subs", subscriptions);
  console.log("Follow", following);

  function handleFollow(user) {
    dispatch(followUser(user, currentUser, true));
  }

  function handleUnfollow(user) {
    dispatch(unfollowUser(user, currentUser, true));
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((subscription) => {
      const profile =
        modal === "profileFollowers"
          ? subscription.follower
          : subscription.following;
      return profile.username.toLowerCase().includes(search.toLowerCase());
    });
  }, [subscriptions, modal, search]);

  if (!currentUser) {
    router.push("/login");
  }

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={closeModal}></div>
      <div className={styles.modal__content}>
        <div className={styles.modal__header}>
          <h3>{modal === "profileFollowers" ? "Подписчики" : "Подписки"}</h3>
        </div>
        <div className={styles.modal__body}>
          <Search search={search} onChange={handleSearch} />
          {modal == "profileFollowers" &&
            filteredSubscriptions.map((subscription) => (
              <ProfileCard
                key={subscription.id}
                profile={subscription.follower}
                type={
                  following.some(
                    (flw) => flw.followingId == subscription.follower.id
                  )
                    ? "followers"
                    : "following"
                }
                onClick={
                  following.some(
                    (flw) => flw.followingId == subscription.follower.id
                  )
                    ? () => handleUnfollow(subscription.follower)
                    : () => handleFollow(subscription.follower)
                }
                currentUser={
                  subscription.follower.id == currentUser.id
                    ? currentUser
                    : null
                }
              />
            ))}
          {modal == "profileFollowing" &&
            filteredSubscriptions.map((subscription) => (
              <ProfileCard
                key={subscription.id}
                profile={subscription.following}
                type={
                  following.some(
                    (flw) => flw.followingId == subscription.following.id
                  )
                    ? "followers"
                    : "following"
                }
                onClick={
                  following.some(
                    (flw) => flw.followingId == subscription.following.id
                  )
                    ? () => handleUnfollow(subscription.following)
                    : () => handleFollow(subscription.following)
                }
                currentUser={
                  subscription.following.id == currentUser.id
                    ? currentUser
                    : null
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
}
