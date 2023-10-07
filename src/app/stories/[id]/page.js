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
import { END_POINT } from "@/utils/endPoint";
import { useRouter } from "next/navigation";

// export default function StoryPage() {
//   const [activeStory, setActiveStory] = useState(1);
//   const [start, setStart] = useState(activeStory - 1);
//   const [end, setEnd] = useState(activeStory + 2);

//   const imagesArray = useSelector((state) => state.stories.storiesById);
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   useEffect(() => {
//     dispatch(getStoriesById(id));
//   }, [dispatch, id]);

//   function handleStoryClick(id) {
//     setActiveStory(id);
//     setStart(id - 2);
//     setEnd(id + 1);
//   }

//   function handleNextStory(e) {
//     e.stopPropagation();
//     if (activeStory < imagesArray.length) {
//       setActiveStory(activeStory + 1);
//       setStart(start + 1);
//       setEnd(end + 1);
//     }
//   }

//   function handlePrevStory(e) {
//     e.stopPropagation();
//     if (activeStory > 1) {
//       setActiveStory(activeStory - 1);
//       setStart(start - 1);
//       setEnd(end - 1);
//     }
//   }

//   return (
//     <div className={styles.stories}>
//       {/* <h1>
//         {start}-{activeStory}-{end}
//       </h1> */}

//       <Link href="/">
//         <Image
//           className={styles.logo}
//           src="/logo.png"
//           width={120}
//           height={120}
//           alt="Instagram logo"
//         />
//       </Link>
//       {imagesArray
//         .slice(start === -1 ? 0 : start, end === 2 ? 3 : end)
//         .map((item, index) => {
//           if (item.id === activeStory) {
//             return (
//               <div
//                 key={item.id}
//                 className={`${styles.story} ${styles.active}`}
//                 style={{
//                   backgroundImage: `url("${END_POINT}/${item.content}")`,
//                 }}
//                 onClick={() => handleStoryClick(item.id)}
//               >
//                 <div className={styles.slider_prev} onClick={handlePrevStory}>
//                   <Image
//                     src="/posts/left_arrow.svg"
//                     alt="Left arrow stories"
//                     width={27}
//                     height={27}
//                   />
//                 </div>
//                 <div className={styles.slider_next} onClick={handleNextStory}>
//                   <Image
//                     src="/posts/right_arrow.svg"
//                     alt="Right arrow stories"
//                     width={27}
//                     height={27}
//                   />
//                 </div>
//                 <div className={styles.story_lenght}>
//                   <div className={styles.story_lenght_item}></div>
//                   <div className={styles.story_lenght_item}></div>
//                 </div>
//                 <div className={styles.story_header}>
//                   <div className={styles.header_user}>
//                     <div className={styles.user_avatar}>
//                       <Image
//                         src="/posts/avatar_sample.webp"
//                         width={32}
//                         height={32}
//                         alt="Avatar"
//                         className="avatar"
//                       />
//                     </div>
//                     <div className={styles.user_name}>{item.id}username</div>
//                   </div>
//                   <div className={styles.header_actions}>
//                     <button>
//                       <Image
//                         src="/posts/play.svg"
//                         width={24}
//                         height={24}
//                         alt="Like"
//                       />
//                     </button>
//                     <button>
//                       <Image
//                         src="/posts/dots_icon.svg"
//                         width={24}
//                         height={24}
//                         alt="Like"
//                       />
//                     </button>
//                   </div>
//                 </div>
//                 {/* <div className={styles.story_content}>
//           <div className={styles.content_image}>
//             <Image src="/posts/story.jpg" width={320} height={320} />
//           </div>
//         </div> */}
//                 <div className={styles.story_footer}>
//                   <div className={styles.footer_comment}>
//                     <input type="text" placeholder="Ответьте" />
//                   </div>
//                   <button>
//                     <Image
//                       src="/posts/heart2.svg"
//                       width={24}
//                       height={24}
//                       alt="Like"
//                     />
//                   </button>
//                   <button>
//                     <Image
//                       src="/posts/paper_plane.svg"
//                       width={24}
//                       height={24}
//                       alt="Message"
//                     />
//                   </button>
//                 </div>
//               </div>
//             );
//           } else {
//             return (
//               <div
//                 key={item.id}
//                 className={`${styles.story}`}
//                 style={{ backgroundImage: `url(${item.image})` }}
//                 onClick={() => handleStoryClick(item.id)}
//               >
//                 {item.id}
//               </div>
//             );
//           }
//         })}
//     </div>
//   );
// }

export default function StoryPage() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeUserIndex, setActiveUserIndex] = useState(0);
  const [timer, setTimer] = useState(null);

  const imagesArray = useSelector((state) => state.stories.storiesById);
  const stories = useSelector((state) => state.stories.followedStories);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const likes = useSelector((state) => state.likes.likes);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getStoriesById(id));
    dispatch(getFollowedStories());
  }, [dispatch, id]);

  // console.log("like", likes);

  useEffect(() => {
    const storyCount = imagesArray.length;

    const nextStory = () => {
      if (activeStoryIndex < storyCount - 1) {
        setActiveStoryIndex((prevIndex) => prevIndex + 1);
      } else {
        console.log(stories);
        console.log("nextStoryUser");
        const currentUserId = id;
        const currentIndexInStories = stories.findIndex(
          (story) => story.userId == currentUserId
        );
        console.log(currentIndexInStories);
        if (
          currentIndexInStories !== -1 &&
          currentIndexInStories < stories.length - 1
        ) {
          const nextUserId = stories[currentIndexInStories + 1].userId;
          console.log(nextUserId);
          router.push(`/stories/${nextUserId}`);
        }
      }
    };

    if (timer) clearInterval(timer);

    const newTimer = setInterval(nextStory, 10000); // Переключение каждые 10 секунд

    setTimer(newTimer);

    return () => {
      clearInterval(newTimer);
    };
  }, [imagesArray, activeStoryIndex, id]);

  function handleNextStory(e) {
    e.stopPropagation();
    if (activeStoryIndex < imagesArray.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      if (timer) clearInterval(timer);
    } else {
      const currentUserId = id;
      const currentIndexInStories = stories.findIndex(
        (story) => story.userId == currentUserId
      );
      if (
        currentIndexInStories !== -1 &&
        currentIndexInStories < stories.length - 1
      ) {
        const nextUserId = stories[currentIndexInStories + 1].userId;
        router.push(`/stories/${nextUserId}`);
      }
    }
  }

  function handlePrevStory(e) {
    e.stopPropagation();
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      if (timer) clearInterval(timer);
    } else {
      const currentUserId = id;
      const currentIndexInStories = stories.findIndex(
        (story) => story.userId == currentUserId
      );
      if (currentIndexInStories !== -1 && currentIndexInStories > 0) {
        const prevUserId = stories[currentIndexInStories - 1].userId;
        router.push(`/stories/${prevUserId}`);
      }
    }
  }

  function deleteById(storyId) {
    dispatch(deleteStory(storyId));
  }

  const handleLike = async (storyId) => {
    if (likes.some((like) => like.storyId == storyId)) {
      console.log("unlike");
      await dispatch(unlikeEntity({ entityId: storyId, entityType: "story" }));
      // setLike(false);
    } else {
      await dispatch(likeEntity({ entityId: storyId, entityType: "story" }));
      // setLike(true);
    }
  };

  return (
    <div className={styles.stories}>
      <Link href="/posts">
        <Image
          className={styles.logo}
          src="/logo.png"
          width={120}
          height={120}
          alt="Instagram logo"
        />
      </Link>
      {imagesArray.map((item, index) => {
        return (
          <div
            key={item.id}
            className={`${styles.story} ${styles.active}`}
            style={{
              backgroundImage: `url("${
                index === activeStoryIndex ? `${END_POINT}/${item.content}` : ""
              }")`,
            }}
          >
            <div className={styles.slider_prev} onClick={handlePrevStory}>
              <Image
                src="/posts/left_arrow.svg"
                alt="Left arrow stories"
                width={27}
                height={27}
              />
            </div>
            <div className={styles.slider_next} onClick={handleNextStory}>
              <Image
                src="/posts/right_arrow.svg"
                alt="Right arrow stories"
                width={27}
                height={27}
              />
            </div>
            <div className={styles.story_lenght}>
              {imagesArray.map((item, index) => {
                const isActive = index === activeStoryIndex;
                return (
                  <div key={item.id} className={styles.story_lenght_item}>
                    {isActive && <div className={styles.animated}></div>}
                    {!isActive && <div></div>}
                  </div>
                );
              })}
            </div>
            <div className={styles.story_header}>
              <div className={styles.header_user}>
                <div className={styles.user_avatar}>
                  <Image
                    src={`${END_POINT}/${item.user.profilePicture}`}
                    width={32}
                    height={32}
                    alt="Avatar"
                    className="avatar"
                  />
                </div>
                <div className={styles.user_name}>{item.user.username}</div>
              </div>
              <div className={styles.header_actions}>
                {/* <button>
                  <Image
                    src="/posts/play.svg"
                    width={24}
                    height={24}
                    alt="Like"
                  />
                </button> */}
                {currentUser?.id == item.user.id && (
                  <button onClick={() => deleteById(item.id)}>
                    <Image src="/trash.svg" width={24} height={24} alt="Like" />
                  </button>
                )}
              </div>
            </div>

            <div className={styles.story_footer}>
              <div className={styles.footer_comment}>
                <input type="text" placeholder="Ответьте" />
              </div>

              <button onClick={() => handleLike(item.id)}>
                {likes.some((like) => like.storyId == item.id) ? (
                  <Image
                    src="/posts/heart_fill.svg"
                    width={24}
                    height={24}
                    alt="Like"
                    className={`${styles.heart} ${styles.heart__active}`}
                  />
                ) : (
                  <Image
                    src="/posts/heart2.svg"
                    width={24}
                    height={24}
                    alt="Like"
                  />
                )}
              </button>
              <button>
                <Image
                  src="/posts/paper_plane.svg"
                  width={24}
                  height={24}
                  alt="Message"
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
