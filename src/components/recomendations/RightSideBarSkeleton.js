import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/styles/rightsidebar.module.scss";

function RightSideBarSkeleton() {
  return (
    <div className={styles.nav}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={styles.skeleton}>
          <Skeleton
            circle={true}
            style={{ display: "inline-block", width: "40px", height: "40px" }}
          />
          <Skeleton
            style={{ display: "inline-block", width: "200px", height: "20px" }}
          />
        </div>
      ))}
    </div>
  );
}

export default RightSideBarSkeleton;
