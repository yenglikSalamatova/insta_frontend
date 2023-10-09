"use client";

import StoriesBlock from "@/components/stories/StoriesBlock";
import PostsBlock from "@/components/post/PostsBlock";
import RightSideBar from "@/components/recomendations/RightSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFollowedPosts } from "@/app/store/slice/postsSlice";
import { getFollowedStories } from "@/app/store/slice/storiesSlice";
import { getLikes } from "@/app/store/slice/likesSlice";
import Footer from "@/components/layouts/Parts/Footer";
import NavBar from "@/components/layouts/Parts/NavBar";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const PostsPage = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const posts = useSelector((state) => state.posts.posts);
  const stories = useSelector((state) => state.stories.followedStories);
  const likes = useSelector((state) => state.likes.likes);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getFollowedPosts());
    dispatch(getFollowedStories());
    dispatch(getLikes());
  }, [dispatch]);

  // console.log("Likes", likes);

  if (!currentUser) {
    return <Spinner />;
  }

  const postLikes = likes.filter((like) => like.postId !== null);

  return (
    <div className="container-main">
      <NavBar />
      <div className="container">
        <main className="main">
          <StoriesBlock stories={stories} />
          <PostsBlock posts={posts} postLikes={postLikes} />
        </main>
        <RightSideBar />
        <Footer />
      </div>
    </div>
  );
};

export default PostsPage;
