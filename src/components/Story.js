import styles from "@/styles/storiesBlock.module.scss";

const Story = ({ story }) => {
  return (
    <div key={story.id} className={styles.slide}>
      <img src={story.imageUrl} alt="Story" />
      <p>{story.username}</p>
    </div>
  );
};

export default Story;
