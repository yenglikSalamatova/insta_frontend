import WithAuth from "@/components/layouts/WithAuth";
import InteresingPostsPage from "@/components/post/InterestingPostsPage";

export const metadata = {
  title: "Интересные посты | Instagram",
};

export default function Page() {
  return (
    <WithAuth>
      <InteresingPostsPage />
    </WithAuth>
  );
}
