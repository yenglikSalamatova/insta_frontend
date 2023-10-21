"use client";

import ProfileByUsernamePage from "@/components/profile/ProfileByUsernamePage";
import ForAllUsers from "@/components/layouts/Parts/ForAllUsers";
import LayoutWithoutAuth from "@/components/layouts/LayoutWithoutAuth";
import LayoutWithNav from "@/components/layouts/LayoutNavOneColumn";
import { useSelector } from "react-redux";

export default function Profile() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <ForAllUsers>
      {!isAuth && (
        <LayoutWithoutAuth>
          <ProfileByUsernamePage />
        </LayoutWithoutAuth>
      )}
      {isAuth && (
        <LayoutWithNav>
          <ProfileByUsernamePage />
        </LayoutWithNav>
      )}
    </ForAllUsers>
  );
}
