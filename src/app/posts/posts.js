"use client";

import StoriesBlock from "@/components/stories/StoriesBlock";
import PostsBlock from "@/components/post/PostsBlock";
import RightSideBar from "@/components/recomendations/RightSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFollowedPosts } from "@/app/store/slice/postsSlice";
import { getFollowedStories } from "@/app/store/slice/storiesSlice";
import Footer from "@/components/layouts/Footer";
import NavBar from "@/components/layouts/NavBar";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const PostsPage = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const posts = useSelector((state) => state.posts.posts);
  const stories = useSelector((state) => state.stories.followedStories);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);

  useEffect(() => {
    dispatch(getFollowedPosts());
    dispatch(getFollowedStories());
  }, [dispatch]);

  if (!currentUser) {
    return <Spinner />;
  }

  return (
    <div className="container-main">
      <NavBar />
      <div className="container">
        <main className="main">
          <StoriesBlock stories={stories} />
          <PostsBlock posts={posts} />
        </main>
        <RightSideBar />
        <Footer />
      </div>
    </div>
  );
};

export default PostsPage;
