"use client";

import React from "react";
import PostBlock from "./PostBlock";

const PostsBlock = ({ posts, postLikes }) => {
  return (
    <>
      {posts.map((post) => (
        <PostBlock
          post={post}
          key={post.id}
          isLiked={postLikes.some((like) => like.postId == post.id)}
        />
      ))}
    </>
  );
};

export default PostsBlock;
