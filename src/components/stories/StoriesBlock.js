"use client";

import React, { useRef, useState } from "react";
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
  const [atLeft, setAtLeft] = useState(false);
  const ref = useRef();
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log("StoriesBlock", stories);

  const scrollLeft = () => {
    ref.current.scroll({
      left: ref.current.scrollLeft - 250,
      behavior: "smooth",
    });
    setTimeout(() => {
      if (ref.current.scrollLeft == 0) {
        setAtLeft(false);
      }
    }, 500);
  };

  const scrollRight = () => {
    ref.current.scroll({
      left: ref.current.scrollLeft + 250,
      behavior: "smooth",
    });
    setAtLeft(true);
  };

  return (
    <div className={styles.slider}>
      {atLeft && <CustomPrevArrow onClick={scrollLeft} />}

      <CustomNextArrow onClick={scrollRight} />

      <div ref={ref} className={styles.slides}>
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
