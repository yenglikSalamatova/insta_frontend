import PostsPage from "@/components/post/PostsPage";
import WithAuth from "@/components/layouts/WithAuth";

export const metadata = {
  title: "Посты | Instagram",
};

const Home = () => {
  return (
    <WithAuth>
      <PostsPage />
    </WithAuth>
  );
};

export default Home;
