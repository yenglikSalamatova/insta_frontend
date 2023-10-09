import styles from "@/styles/storiesBlock.module.scss";
import Image from "next/image";
import { END_POINT } from "@/utils/endPoint";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateStorysModal from "@/components/modals/CreateStorysModal";

const Story = ({ story, active, currentUser = false, post = false }) => {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const handleClick = (e) => {
    if (active) {
      router.push(`/stories/${story.user.id}`);
    }
  };

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {" "}
      {modal && <CreateStorysModal onToggle={handleModal} />}
      <div
        key={story.id}
        className={styles.slide + " " + `${post ? styles.post : ""}`}
      >
        {currentUser && !post && (
          <div className={styles.addstories} onClick={handleModal}>
            <Image src="/plus_stories.svg" alt="Story" width={20} height={20} />
          </div>
        )}

        <Image
          src={`${END_POINT}/${story.user.profilePicture}`}
          alt="Story"
          width={50}
          height={50}
          onClick={handleClick}
          className={`${active ? styles.active : styles.inactive}`}
        />
        {!post && <p>{story.user.username}</p>}
      </div>
    </>
  );
};

export default Story;
