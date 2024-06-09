"use client";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import PostBlock from "./PostBlock";
import { useEffect, useState } from "react";
import { getFollowedPosts } from "@/app/store/slice/postsSlice";
import PostSkeleton from "./PostSkeleton";
import { posts } from "@/data/posts";
import { getBookmarks, getLikes } from "@/app/store/slice/likesSlice";

const PostsBlock = ({}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts.posts);

  const postLikes = useSelector((state) => state.likes.likes);
  const bookmarks = useSelector((state) => state.likes.bookmarks);

  useEffect(() => {
    dispatch(getFollowedPosts()).then(() => setLoading(false));
    dispatch(getLikes());
    dispatch(getBookmarks());
  }, [dispatch]);

  if (loading) {
    return <PostSkeleton />;
  }

  return (
    <>
      {posts.map((post) => (
        <PostBlock
          post={post}
          key={post.id}
          isLiked={postLikes.some((like) => like.entityId == post.id)}
          isBookmarked={bookmarks.some(
            (bookmark) => bookmark.postId == post.id
          )}
        />
      ))}
    </>
  );
};

export default PostsBlock;
