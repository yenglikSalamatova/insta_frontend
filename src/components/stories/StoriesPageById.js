"use client";
import styles from "@/styles/stories.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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

export default function StoriesPageById() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const storiesById = useSelector((state) => state.stories.storiesById);
  const likes = useSelector((state) => state.likes.likes);
  const followedStories = useSelector((state) => state.stories.followedStories);

  console.log(storiesById);

  useEffect(() => {
    dispatch(getStoriesById(id));
  }, []);

  function deleteById(story) {
    console.log(story);
    dispatch(deleteStory(story));
  }

  const handleLike = (storyId) => {
    if (likes.some((like) => like.storyId == storyId)) {
      console.log("unlike");
      dispatch(unlikeEntity({ entityId: storyId, entityType: "story" }));
    } else {
      dispatch(likeEntity({ entityId: storyId, entityType: "story" }));
    }
  };

  const goToNextStory = () => {
    if (currentStoryIndex < storiesById.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (currentStoryIndex === storiesById.length - 1) {
      let nextUserId;
      followedStories.forEach((story, index) => {
        if (id === story.userId) {
          nextUserId = followedStories[index + 1]?.userId;
          if (nextUserId) {
            router.push(`/stories/${nextUserId}`);
          } else {
            router.push("/");
          }
        }
      });
    }
  };

  const goToPrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (currentStoryIndex === 0) {
      let prevUserId;
      followedStories.forEach((story, index) => {
        if (id === story.userId) {
          prevUserId = followedStories[index - 1]?.userId;
          if (prevUserId) {
            router.push(`/stories/${prevUserId}`);
          } else {
            router.push("/");
          }
        }
      });
    }
  };

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
      <div className={styles.story_lenght}>
        {storiesById.map((item, index) => (
          <div key={item.id} className={styles.story_lenght_item}>
            {currentStoryIndex === index && (
              <div className={styles.animated}></div>
            )}
            {currentStoryIndex > index && (
              <div className={styles.animation_end}></div>
            )}
          </div>
        ))}
      </div>
      {storiesById.length > 0 ? (
        <StoryElById
          item={storiesById[currentStoryIndex]}
          onNext={goToNextStory}
          onPrev={goToPrevStory}
          onDelete={deleteById}
          onLike={handleLike}
        />
      ) : (
        <p>Загрузка истории</p>
      )}
    </div>
  );
}
