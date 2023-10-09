"use client";

import LayoutWithNav from "../layouts/LayoutNavOneColumn";
import styles from "@/styles/profie.module.scss";
import ProfilePost from "../profile/ProfilePost";
import { getInterestingPosts } from "@/app/store/slice/postsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function InteresingPostsPage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  useEffect(() => {
    dispatch(getInterestingPosts());
  });
  return (
    <LayoutWithNav>
      <div className={styles.posts__container}>
        {posts.map((post) => (
          <ProfilePost key={post.id} post={post} />
        ))}
      </div>
    </LayoutWithNav>
  );
}
