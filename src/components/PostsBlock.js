"use client";

import React from "react";
import PostBlock from "./PostBlock";

const PostsBlock = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <PostBlock post={post} key={post.id} />
      ))}
    </>
  );
};

export default PostsBlock;
