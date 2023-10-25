import styles from "@/styles/stories.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function StoriesByIdSkeleton() {
  return (
    <div className={styles.stories}>
      <div className={styles.story}></div>
    </div>
  );
}

export default StoriesByIdSkeleton;
