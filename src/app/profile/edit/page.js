import EditProfile from "@/components/profile/EditProfile";
import WithAuth from "@/components/layouts/WithAuth";

export const metadata = {
  title: "Редактировать профиль | Instagram",
};

const Edit = () => {
  return (
    <WithAuth>
      <EditProfile />
    </WithAuth>
  );
};

export default Edit;
