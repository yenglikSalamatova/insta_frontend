"use client";

import LayoutWithNav from "../layouts/LayoutNavOneColumn";
import styles from "@/styles/profie.module.scss";
import ProfilePost from "../profile/ProfilePost";
import { getInterestingPosts } from "@/app/store/slice/postsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function InteresingPostsPage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(getInterestingPosts()).then(() => setLoading(false));
  }, []);

  return (
    <LayoutWithNav>
      {loading ? (
        <div className={styles.posts__container}>
          <Skeleton width="100%" height="100%" />
          <Skeleton width="100%" height="100%" />
          <Skeleton width="100%" height="100%" />
          <Skeleton width="100%" height="100%" />
          <Skeleton width="100%" height="100%" />
          <Skeleton width="100%" height="100%" />
        </div>
      ) : (
        <div className={styles.posts__container}>
          {posts.map((post) => (
            <ProfilePost key={post.id} post={post} />
          ))}
        </div>
      )}
    </LayoutWithNav>
  );
}
