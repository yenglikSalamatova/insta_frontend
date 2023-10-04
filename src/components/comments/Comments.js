import styles from "@/styles/postModal.module.scss";
import Comment from "@/components/comments/Comment";
import { useEffect, useState } from "react";

export default function Comments({ comments }) {
  return (
    <div className={styles.comments_container}>
      {comments.map((comment) => {
        return <Comment comment={comment} key={comment.id} />;
      })}
    </div>
  );
}
