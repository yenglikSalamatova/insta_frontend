import ProfileCard from "./ProfileCard";
import Search from "./Search";
import styles from "@/styles/SubscribeModal.module.scss";

export default function SubscribeModal({ onModal }) {
  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={onModal}></div>
      <div className={styles.modal__content}>
        <div className={styles.modal__header}>
          <h3>Подписчики</h3>
        </div>
        <div className={styles.modal__body}>
          <Search />
          <ProfileCard linkName={"Подписки"} type={"btn"} />
          <ProfileCard linkName={"Подписки"} type={"btn"} />
          <ProfileCard linkName={"Подписки"} type={"btn"} />
          <ProfileCard linkName={"Подписки"} type={"btn"} />
          <ProfileCard linkName={"Подписки"} type={"btn"} />
          <ProfileCard linkName={"Подписки"} type={"btn"} />
          <ProfileCard linkName={"Подписки"} type={"btn"} />
          <ProfileCard linkName={"Подписки"} type={"btn"} />
          <ProfileCard linkName={"Подписки"} type={"btn"} />
        </div>
      </div>
    </div>
  );
}
