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
  const [currentStoryId, setCurrentStoryId] = useState(null);
  const [autoPlay, setAutoPlay] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const storiesById = useSelector((state) => state.stories.storiesById);
  const followedStories = useSelector((state) => state.stories.followedStories);
  const likes = useSelector((state) => state.likes.likes);

  useEffect(() => {
    dispatch(getStoriesById(id));
    dispatch(getFollowedStories());
  }, [id]);

  useEffect(() => {
    if (storiesById.length > 0) {
      setCurrentStoryId(storiesById[0].id);
    }
  }, [storiesById]);

  const deleteById = (story) => {
    dispatch(deleteStory(story));
  };

  const handleLike = (storyId) => {
    if (likes.some((like) => like.storyId === storyId)) {
      dispatch(unlikeEntity({ entityId: storyId, entityType: "story" }));
    } else {
      dispatch(likeEntity({ entityId: storyId, entityType: "story" }));
    }
  };

  // console.log("FollowedStories", followedStories);
  // console.log("Id", id);
  // console.log("stories", storiesById);

  const goToNextStory = () => {
    if (currentStoryId === storiesById[storiesById.length - 1].id) {
      let nextUserId = null;
      if (followedStories.length > 0) {
        const currentIndex = followedStories.findIndex((story) => {
          return story.userId === storiesById[storiesById.length - 1].userId;
        });
        // console.log(currentIndex);
        if (currentIndex !== -1 && currentIndex < followedStories.length - 1) {
          nextUserId = followedStories[currentIndex + 1].userId;
        }
      }
      if (nextUserId) {
        router.push(`/stories/${nextUserId}`);
      } else {
        router.push("/");
      }
    } else {
      setCurrentStoryId((prev) => {
        const index = storiesById.findIndex((story) => story.id === prev);
        return storiesById[index + 1].id;
      });
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
  }, [currentStoryId, autoPlay]);

  const goToPrevStory = () => {
    if (currentStoryId === storiesById[0].id) {
      let prevUserId = null;
      if (followedStories.length > 0) {
        const currentIndex = followedStories.findIndex(
          (story) => story.userId === storiesById[storiesById.length - 1].userId
        );
        // console.log(currentIndex);
        if (currentIndex !== -1 && currentIndex > 0) {
          prevUserId = followedStories[currentIndex - 1].userId;
        }
      }
      if (prevUserId) {
        router.push(`/stories/${prevUserId}`);
      } else {
        router.push("/");
      }
    } else {
      setCurrentStoryId((prev) => {
        const index = storiesById.findIndex((story) => story.id === prev);
        return storiesById[index - 1].id;
      });
    }
  };

  if (
    storiesById.length > 0 &&
    currentStoryId &&
    storiesById.some((story) => story.id === currentStoryId)
  ) {
    const currentStory = storiesById.find(
      (story) => story.id === currentStoryId
    );
    // console.log("CurrentStory", currentStory);
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
        <button className={styles.close} onClick={() => router.push("/")}>
          <Image src="/posts/close.svg" width={27} height={27} alt="Close" />
        </button>
        <div className={styles.story_length}>
          {storiesById.map((item, index) => (
            <div key={item.id} className={styles.story_length_item}>
              {currentStoryId === item.id && autoPlay && (
                <div className={styles.animated}></div>
              )}
              {currentStoryId > item.id && (
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
