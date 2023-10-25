"use client";

import StoriesBlock from "@/components/stories/StoriesBlock";
import PostsBlock from "@/components/post/PostsBlock";
import RightSideBar from "@/components/recomendations/RightSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFollowedPosts, clearPosts } from "@/app/store/slice/postsSlice";
import { getFollowedStories } from "@/app/store/slice/storiesSlice";
import { getLikes, getBookmarks } from "@/app/store/slice/likesSlice";
import Footer from "@/components/layouts/Parts/Footer";
import NavBar from "@/components/layouts/Parts/NavBar";

const PostsPage = () => {
  const likes = useSelector((state) => state.likes.likes);
  const bookmarks = useSelector((state) => state.likes.bookmarks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikes());
    dispatch(getBookmarks());
  }, [dispatch]);

  const postLikes = likes.filter((like) => like.postId !== null);

  return (
    <div className="container-main">
      <NavBar />
      <div className="container">
        <main className="main">
          <StoriesBlock />
          <PostsBlock postLikes={postLikes} bookmarks={bookmarks} />
        </main>
        <RightSideBar />
        <Footer />
      </div>
    </div>
  );
};

export default PostsPage;
