"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "@/styles/storiesBlock.module.scss";
import Image from "next/image";
import Story from "./Story";
import { useDispatch, useSelector } from "react-redux";
import { getFollowedStories } from "@/app/store/slice/storiesSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CustomPrevArrow = (props) => (
  <div className={styles.slider_prev} onClick={props.onClick}>
    <img
      src="/posts/left_arrow.svg"
      alt="Left arrow stories"
      width={27}
      height={27}
    />
  </div>
);

const CustomNextArrow = (props) => (
  <div className={styles.slider_next} onClick={props.onClick}>
    <img
      src="/posts/right_arrow.svg"
      alt="Right arrow stories"
      width={27}
      height={27}
    />
  </div>
);

const StoriesBlock = () => {
  const [loading, setLoading] = useState(true);
  const [atLeft, setAtLeft] = useState(false);
  const ref = useRef();
  const currentUser = useSelector((state) => state.auth.currentUser);
  // console.log("StoriesBlock", stories);

  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories.followedStories);

  useEffect(() => {
    dispatch(getFollowedStories()).then(() => {
      setLoading(false);
    });
  }, []);

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

  const isCurrentUserHaveStory = stories.some(
    (story) => story.userId === currentUser.id
  );

  if (loading) {
    return (
      <div className={styles.slider}>
        <div className={styles.slides}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              width={50}
              height={50}
              circle
              className={styles.slide}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.slider}>
      {atLeft && <CustomPrevArrow onClick={scrollLeft} />}

      <CustomNextArrow onClick={scrollRight} />

      <div ref={ref} className={styles.slides}>
        <Story
          currentUser={true}
          story={{ user: currentUser }}
          key={currentUser.id}
          active={isCurrentUserHaveStory}
        />

        {stories.map(
          (story) =>
            story.userId !== currentUser.id && (
              <Story story={story} key={story.id} active={true} />
            )
        )}
      </div>
    </div>
  );
};

export default StoriesBlock;
