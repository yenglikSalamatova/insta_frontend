"use client";
import styles from "@/styles/stories.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const imagesArray = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1629216040651-0b409e95d62a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5zdGFncmFtJTIwc3Rvcmllc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/736x/cd/a7/70/cda77067b38c6e31d6f9acb91397c613.jpg",
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/736x/58/3d/db/583ddbd5e19d0f87dd43a417b0f47d95.jpg",
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/736x/71/98/5a/71985a972501d513a8c0573ee4e53360.jpg",
  },
  {
    id: 5,
    image:
      "https://i.pinimg.com/736x/67/b2/64/67b264c88d5d3ff715280ee215a4b3cf.jpg",
  },
  {
    id: 6,
    image:
      "https://i.pinimg.com/originals/8d/61/74/8d617476cd8f64eeaf2385105640d475.jpg",
  },
  {
    id: 7,
    image:
      "https://i.pinimg.com/736x/2a/b4/b6/2ab4b6a4d4580eb30ed157b5b055ca3e.jpg",
  },
];

export default function StoryPage() {
  const [activeStory, setActiveStory] = useState(1);
  const [start, setStart] = useState(activeStory - 1);
  const [end, setEnd] = useState(activeStory + 2);

  function handleStoryClick(id) {
    setActiveStory(id);
    setStart(id - 2);
    setEnd(id + 1);
  }

  function handleNextStory(e) {
    e.stopPropagation();
    if (activeStory < imagesArray.length) {
      setActiveStory(activeStory + 1);
      setStart(start + 1);
      setEnd(end + 1);
    }
  }

  function handlePrevStory(e) {
    e.stopPropagation();
    if (activeStory > 1) {
      setActiveStory(activeStory - 1);
      setStart(start - 1);
      setEnd(end - 1);
    }
  }

  return (
    <div className={styles.stories}>
      {/* <h1>
        {start}-{activeStory}-{end}
      </h1> */}

      <Link href="/">
        <Image
          className={styles.logo}
          src="/logo.png"
          width={120}
          height={120}
          alt="Instagram logo"
        />
      </Link>
      {imagesArray
        .slice(start === -1 ? 0 : start, end === 2 ? 3 : end)
        .map((item, index) => {
          if (item.id === activeStory) {
            return (
              <div
                key={item.id}
                className={`${styles.story} ${styles.active}`}
                style={{ backgroundImage: `url(${item.image})` }}
                onClick={() => handleStoryClick(item.id)}
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
                  <div className={styles.story_lenght_item}></div>
                  <div className={styles.story_lenght_item}></div>
                </div>
                <div className={styles.story_header}>
                  <div className={styles.header_user}>
                    <div className={styles.user_avatar}>
                      <Image
                        src="/posts/avatar_sample.webp"
                        width={32}
                        height={32}
                        alt="Avatar"
                        className="avatar"
                      />
                    </div>
                    <div className={styles.user_name}>{item.id}username</div>
                  </div>
                  <div className={styles.header_actions}>
                    <button>
                      <Image
                        src="/posts/play.svg"
                        width={24}
                        height={24}
                        alt="Like"
                      />
                    </button>
                    <button>
                      <Image
                        src="/posts/dots_icon.svg"
                        width={24}
                        height={24}
                        alt="Like"
                      />
                    </button>
                  </div>
                </div>
                {/* <div className={styles.story_content}>
          <div className={styles.content_image}>
            <Image src="/posts/story.jpg" width={320} height={320} />
          </div>
        </div> */}
                <div className={styles.story_footer}>
                  <div className={styles.footer_comment}>
                    <input type="text" placeholder="Ответьте" />
                  </div>
                  <button>
                    <Image
                      src="/posts/heart2.svg"
                      width={24}
                      height={24}
                      alt="Like"
                    />
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
          } else {
            return (
              <div
                key={item.id}
                className={`${styles.story}`}
                style={{ backgroundImage: `url(${item.image})` }}
                onClick={() => handleStoryClick(item.id)}
              >
                {item.id}
              </div>
            );
          }
        })}
    </div>
  );
}
