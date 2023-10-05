"use client";

import React from "react";
import styles from "@/styles/storiesBlock.module.scss";
import Image from "next/image";
import Story from "./Story";
import { useSelector } from "react-redux";

const CustomPrevArrow = (props) => (
  <div className={styles.slider_prev} onClick={props.onClick}>
    <Image
      src="/posts/left_arrow.svg"
      alt="Left arrow stories"
      width={27}
      height={27}
    />
  </div>
);

const CustomNextArrow = (props) => (
  <div className={styles.slider_next} onClick={props.onClick}>
    <Image
      src="/posts/right_arrow.svg"
      alt="Right arrow stories"
      width={27}
      height={27}
    />
  </div>
);

const StoriesBlock = ({ stories }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log("StoriesBlock", stories);

  const slidesToShow = stories.length > 8 ? 8 : stories.length;

  return (
    <div className={styles.slider}>
      <div className={styles.slides}>
        {stories.map((story) => (
          <Story
            story={story}
            key={story.id}
            active={story.userId == currentUser?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default StoriesBlock;
