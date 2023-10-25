import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/styles/postBlock.module.scss";

function PostSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className={styles.post}>
          <div className={styles.post__header}>
            <div className={styles.post__userinfo}>
              <Skeleton width={30} height={30} circle />
              <Skeleton width={100} />
            </div>
          </div>

          <div className={styles.post__media}>
            <Skeleton width={500} height={500} />
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ))}
    </>
  );
}

export default PostSkeleton;
