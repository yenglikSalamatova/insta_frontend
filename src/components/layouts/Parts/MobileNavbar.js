import NavbarLink from "@/components/reusable/NavbarLink";
import Logo from "@/components/reusable/Logo";
import styles from "@/styles/navbar.module.scss";
import { END_POINT } from "@/utils/endPoint";
import { useState } from "react";
import MiniSearchBar from "./MiniSearchBar";

function MobileNavbar({
  pathname,
  handleCreatePost,
  currentUser,
  logout,
  isWide,
}) {
  const [miniSearchBar, setMiniSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const openMiniSearchBar = () => {
    setMiniSearchBar(!miniSearchBar);
  };

  return (
    <>
      <nav className={styles.extramini_navbar}>
        <Logo isWide={isWide} />

        <NavbarLink
          label="Главная"
          href="/"
          iconSrc="/posts/house_stroke.svg"
          isWide={isWide}
          pathname={pathname}
          activeSrc={"/posts/house_fill.svg"}
        />

        <NavbarLink
          label="Поисковый запрос"
          href="#"
          iconSrc="/posts/glass_stroke.svg"
          isWide={isWide}
          pathname={pathname}
          activeSrc={"/posts/glass_fill.svg"}
          onClick={() => setSearchBar(!searchBar)}
        />

        <NavbarLink
          label="Интересное"
          href="/interesting-posts"
          iconSrc="/posts/compass_stroke.svg"
          isWide={isWide}
          pathname={pathname}
          activeSrc={"/posts/compass_fill.svg"}
        />

        <NavbarLink
          label="Создать"
          href="#"
          iconSrc="/posts/plus_circle_stroke.svg"
          isWide={isWide}
          pathname={pathname}
          onClick={handleCreatePost}
        />

        <NavbarLink
          label="Профиль"
          href={`/profile/${currentUser.username}`}
          iconSrc={`${END_POINT}${currentUser.profilePicture}`}
          isWide={isWide}
          avatar={true}
        />
      </nav>
      <div className={styles.search_withlogo}>
        <Logo isWide={isWide} />
        <input
          type="search"
          placeholder="Поиск"
          onClick={openMiniSearchBar}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <NavbarLink
          label="Выход"
          href="#"
          iconSrc="/posts/logout.svg"
          isWide={isWide}
          onClick={logout}
        />
      </div>
      {miniSearchBar && (
        <MiniSearchBar
          setSearchInput={setSearchInput}
          onClose={openMiniSearchBar}
          searchInput={searchInput}
        />
      )}
    </>
  );
}

export default MobileNavbar;
