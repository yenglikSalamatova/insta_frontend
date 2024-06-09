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
  return (
    <div className="container-main">
      <NavBar />
      <div className="container">
        <main className="main">
          <StoriesBlock />
          <PostsBlock />
        </main>
        <RightSideBar />
        <Footer />
      </div>
    </div>
  );
};

export default PostsPage;
