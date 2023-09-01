import StoriesBlock from "@/components/StoriesBlock";
import PostsBlock from "@/components/PostsBlock";

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

const storiesData = generateData(10);

const generateRandomDate = () => {
  const startDate = new Date(2020, 0, 1); // Начальная дата (например, с начала 2020 года)
  const endDate = new Date(); // Текущая дата
  const randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
  return randomDate.toISOString(); // Преобразуем дату в строку в формате ISO
};

const generatePosts = (n) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    const post = {
      id: i + 1,
      username: `user${i + 1}`,
      userImage: `https://loremflickr.com/320/240/${i}`,
      story: Math.random() < 0.5,
      media: `https://loremflickr.com/800/800/${i}`,
      mediaType: "image",
      caption: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
      dignissim, elit at mollis pellentesque, neque turpis tempor urna, at
      bibendum orci neque et neque. (Пост ${i + 1})`,
      commentCount: Math.floor(Math.random() * 100),
      likes: Math.floor(Math.random() * 1000),
      timestamp: generateRandomDate(), // Генерируем случайную дату публикации
    };
    data.push(post);
  }
  return data;
};

const instagramPosts = generatePosts(10); // Генерируем 10 постов

const PostsPage = () => {
  return (
    <main className="main">
      <StoriesBlock stories={storiesData} />
      <PostsBlock posts={instagramPosts} />
    </main>
  );
};

export default PostsPage;
