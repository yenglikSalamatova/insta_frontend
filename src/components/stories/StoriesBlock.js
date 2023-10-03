"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/styles/storiesBlock.module.scss";
import Image from "next/image";
import Story from "./Story";

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
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className={styles.slider}>
      <Slider {...sliderSettings} className={styles.slides}>
        {stories.map((story) => (
          <Story story={story} key={story.id} />
        ))}
      </Slider>
    </div>
  );
};

export default StoriesBlock;
