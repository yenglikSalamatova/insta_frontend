"use client";

import StoriesBlock from "@/components/stories/StoriesBlock";
import PostsBlock from "@/components/post/PostsBlock";
import RightSideBar from "@/components/recomendations/RightSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFollowedPosts } from "@/app/store/slice/postsSlice";
import Footer from "@/components/layouts/Footer";
import NavBar from "@/components/layouts/NavBar";
import { useRouter } from "next/navigation";

const PostsPage = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const posts = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth]);

  useEffect(() => {
    dispatch(getFollowedPosts());
  }, [dispatch]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-main">
      <NavBar />
      <div className="container">
        <main className="main">
          <StoriesBlock stories={[]} />
          <PostsBlock posts={posts} />
        </main>
        <RightSideBar />
        <Footer />
      </div>
    </div>
  );
};

export default PostsPage;
