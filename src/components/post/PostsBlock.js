"use client";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import PostBlock from "./PostBlock";
import { useEffect, useState } from "react";
import { getFollowedPosts } from "@/app/store/slice/postsSlice";
import PostSkeleton from "./PostSkeleton";

const PostsBlock = ({ postLikes, bookmarks }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(getFollowedPosts()).then(() => setLoading(false));
  }, []);

  if (loading) {
    return <PostSkeleton />;
  }

  return (
    <>
      {posts.map((post) => (
        <PostBlock
          post={post}
          key={post.id}
          isLiked={postLikes.some((like) => like.postId == post.id)}
          isBookmarked={bookmarks.some(
            (bookmark) => bookmark.postId == post.id
          )}
        />
      ))}
    </>
  );
};

export default PostsBlock;
