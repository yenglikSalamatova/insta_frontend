import ProfileByUsernamePage from "@/components/profile/ProfileByUsernamePage";
import WithAuth from "@/components/layouts/WithAuth";
import WithoutAuth from "@/components/layouts/WithoutAuth";
import LayoutWithoutAuth from "@/components/layouts/LayoutWithoutAuth";

export const metadata = {
  title: "Профиль | Instagram",
};

export default function Profile() {
  return (
    <WithoutAuth>
      <LayoutWithoutAuth>
        <ProfileByUsernamePage />
      </LayoutWithoutAuth>
    </WithoutAuth>
  );
}
