"use client";
import styles from "@/styles/stories.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStoriesById,
  getFollowedStories,
  deleteStory,
} from "@/app/store/slice/storiesSlice";
import { likeEntity, unlikeEntity } from "@/app/store/slice/likesSlice";
import { useParams } from "next/navigation";

import { useRouter } from "next/navigation";
import StoryElById from "./StoryElById";
import Spinner from "../Spinner";

export default function StoriesPageById() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const storiesById = useSelector((state) => state.stories.storiesById);
  const likes = useSelector((state) => state.likes.likes);
  const followedStories = useSelector((state) => state.stories.followedStories);

  useEffect(() => {
    dispatch(getStoriesById(id));
    dispatch(getFollowedStories());
  }, [dispatch, id]);

  const deleteById = (story) => {
    console.log(story);
    dispatch(deleteStory(story));
  };

  const handleLike = (storyId) => {
    if (likes.some((like) => like.storyId === storyId)) {
      console.log("unlike");
      dispatch(unlikeEntity({ entityId: storyId, entityType: "story" }));
    } else {
      dispatch(likeEntity({ entityId: storyId, entityType: "story" }));
    }
  };

  console.log("FollowedStories", followedStories);
  console.log("Id", id);

  const getNextUserId = () => {
    const currentIndex = followedStories.findIndex(
      (story) => story.userId === id * 1
    );
    console.log("currentIndex", currentIndex);
    if (currentIndex === -1 || currentIndex === followedStories.length - 1) {
      return null;
    }
    return followedStories[currentIndex + 1].userId;
  };

  const getPrevUserId = () => {
    const currentIndex = followedStories.findIndex(
      (story) => story.userId === id * 1
    );
    if (currentIndex === -1 || currentIndex === 0) {
      return null;
    }
    return followedStories[currentIndex - 1].userId;
  };

  const goToNextStory = () => {
    if (currentStoryIndex + 1 >= storiesById.length) {
      const nextUserId = getNextUserId();
      if (nextUserId) {
        router.push(`/stories/${nextUserId}`);
      } else {
        router.push("/");
      }
    } else {
      setCurrentStoryIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (autoPlay) {
        goToNextStory();
      }
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [currentStoryIndex, autoPlay]);

  const goToPrevStory = () => {
    if (currentStoryIndex <= 0) {
      const prevUserId = getPrevUserId();
      if (prevUserId) {
        router.push(`/stories/${prevUserId}`);
      } else {
        router.push("/");
      }
    } else {
      setCurrentStoryIndex((prev) => prev - 1);
    }
  };

  if (storiesById.length > 0) {
    const currentStory = storiesById[currentStoryIndex];
    return (
      <div className={styles.stories}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/logo.png"
            width={120}
            height={120}
            alt="Instagram logo"
          />
        </Link>
        <div className={styles.story_length}>
          {storiesById.map((item, index) => (
            <div key={item.id} className={styles.story_length_item}>
              {currentStoryIndex === index && autoPlay && (
                <div className={styles.animated}></div>
              )}
              {currentStoryIndex > index && (
                <div className={styles.animation_end}></div>
              )}
            </div>
          ))}
        </div>

        <StoryElById
          item={currentStory}
          onNext={goToNextStory}
          onPrev={goToPrevStory}
          onDelete={deleteById}
          onLike={handleLike}
          autoPlay={autoPlay}
          setAutoPlay={setAutoPlay}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.stories}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/logo.png"
            width={120}
            height={120}
            alt="Instagram logo"
          />
        </Link>{" "}
        <p>История не найдена</p>
      </div>
    );
  }
}
