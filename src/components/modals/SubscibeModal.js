import ProfileCard from "../recomendations/ProfileCard";
import Search from "../Search";
import styles from "@/styles/SubscribeModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowers,
  getFollowing,
} from "@/app/store/slice/subscriptionSlice";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function SubscribeModal({ closeModal, modal }) {
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscription[modal]);

  const { username } = useParams();

  useEffect(() => {
    if (modal == "followers") {
      dispatch(getFollowers(username));
    } else {
      dispatch(getFollowing(username));
    }
  }, [dispatch, username, modal]);

  console.log(subscriptions);

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={closeModal}></div>
      <div className={styles.modal__content}>
        <div className={styles.modal__header}>
          <h3>{modal === "followers" ? "Подписчики" : "Подписки"}</h3>
        </div>
        <div className={styles.modal__body}>
          <Search />
          {subscriptions.map((subscription) => (
            <ProfileCard
              key={subscription.id}
              type={modal}
              profile={subscription["follower"] || subscription["following"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
