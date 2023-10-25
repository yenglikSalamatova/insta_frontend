"use client";

import styles from "@/styles/navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import CreatePostModal from "../../modals/CreatePostModal";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END_POINT } from "@/utils/endPoint";
import {
  modalScrollBlocking,
  modalScrollUnblocking,
} from "@/utils/modalScrollBlocking";
import SearchBar from "./SearchBar";

import { logout } from "@/app/store/slice/authSlice";

import { useMediaQuery } from "@uidotdev/usehooks";

import DesktopOrTabletNavbar from "./DesktopOrTabletNavbar";
import MobileNavbar from "./MobileNavbar";

const NavBar = () => {
  const [createPost, setCreatePost] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  const currentUser = useSelector((state) => state.auth.currentUser);

  const isMobile = useMediaQuery("(max-width: 720px)");
  const isTablet = useMediaQuery("(min-width: 721px) and (max-width: 1280px)");
  const isWide = useMediaQuery("(min-width: 1280px)");

  const dispatch = useDispatch();

  const pathname = usePathname();

  const handleCreatePost = () => {
    setCreatePost(!createPost);
    if (!createPost) {
      modalScrollBlocking();
    } else {
      modalScrollUnblocking();
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <>
      {createPost && <CreatePostModal onToggle={handleCreatePost} />}
      {searchBar && <SearchBar onClose={() => setSearchBar(false)} />}
      {isWide && !searchBar && (
        <DesktopOrTabletNavbar
          currentUser={currentUser}
          pathname={pathname}
          handleCreatePost={handleCreatePost}
          searchBar={searchBar}
          setSearchBar={setSearchBar}
          logout={() => dispatch(logout())}
          isWide={true}
        />
      )}

      {isTablet && !searchBar && (
        <DesktopOrTabletNavbar
          currentUser={currentUser}
          pathname={pathname}
          handleCreatePost={handleCreatePost}
          searchBar={searchBar}
          setSearchBar={setSearchBar}
          logout={() => dispatch(logout())}
          isWide={false}
        />
      )}

      {searchBar && (
        <DesktopOrTabletNavbar
          currentUser={currentUser}
          pathname={pathname}
          handleCreatePost={handleCreatePost}
          searchBar={searchBar}
          setSearchBar={setSearchBar}
          logout={() => dispatch(logout())}
          isWide={false}
        />
      )}

      {isMobile && !searchBar && (
        <MobileNavbar
          currentUser={currentUser}
          pathname={pathname}
          handleCreatePost={handleCreatePost}
          logout={() => dispatch(logout())}
          isWide={false}
        />
      )}
    </>
  );
};

export default NavBar;
