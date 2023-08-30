import StoriesBlock from "@/components/StoriesBlock";

const generateData = (n) => {
  const data = [];
  for (let index = 0; index < n; index++) {
    data.push({
      id: index,
      username: `user${index + 1}`,
      imageUrl: `https://loremflickr.com/320/240/${index}`,
    });
  }
  return data;
};

const storiesData = generateData(30);

const PostsPage = () => {
  return (
    <main className="main">
      <StoriesBlock stories={storiesData} />
    </main>
  );
};

export default PostsPage;
