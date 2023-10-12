import StoriesPageById from "@/components/stories/StoriesPageById";

import WithAuth from "@/components/layouts/WithAuth";

export const metadata = {
  title: "Истории | Instagram",
};

export default function Profile() {
  return (
    <WithAuth>
      <StoriesPageById />
    </WithAuth>
  );
}
