import styles from "@/styles/storiesBlock.module.scss";
import Image from "next/image";
import { END_POINT } from "@/utils/endPoint";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateStorysModal from "@/components/modals/CreateStorysModal";
import { useSelector } from "react-redux";

const Story = ({ story, active }) => {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const currentUser = useSelector((state) => state.auth.currentUser);

  console.log(story);

  const handleClick = (e) => {
    if (active) {
      router.push(`/stories/${story.user.id}`);
    } else router.push(`/stories/${story.userId}`);
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
        className={styles.slide + " " + `${active ? styles.currentUser : ""}`}
      >
        {active && (
          <div className={styles.addstories} onClick={handleModal}>
            <Image src="/plus_stories.svg" alt="Story" width={20} height={20} />
          </div>
        )}

        <Image
          src={`${END_POINT}/${story.user.profilePicture}`}
          alt="Story"
          width={40}
          height={40}
          onClick={handleClick}
        />
        <p>{story.user.username}</p>
      </div>
    </>
  );
};

export default Story;
