import ProfileByUsernamePage from "@/components/profile/ProfileByUsernamePage";
import WithAuth from "@/components/layouts/WithAuth";

export const metadata = {
  title: "Профиль | Instagram",
};

export default function Profile() {
  return (
    <WithAuth>
      <ProfileByUsernamePage />
    </WithAuth>
  );
}
