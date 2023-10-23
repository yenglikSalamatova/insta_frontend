"use client";

import React from "react";
import PostBlock from "./PostBlock";

const PostsBlock = ({ posts, postLikes, bookmarks }) => {
  console.log("POSTS ");
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
