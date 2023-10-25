import Logo from "@/components/reusable/Logo";
import styles from "@/styles/navbar.module.scss";
import NavbarLink from "@/components/reusable/NavbarLink";
import { END_POINT } from "@/utils/endPoint";

function DesktopOrTabletNavbar({
  pathname,
  searchBar,
  setSearchBar,
  handleCreatePost,
  currentUser,
  logout,
  isWide,
}) {
  return (
    <nav className={isWide ? styles.navbar : styles.mini_navbar}>
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

      <div className={styles.nav_end}>
        <NavbarLink
          label="Выход"
          href="#"
          iconSrc="/posts/logout.svg"
          isWide={isWide}
          onClick={logout}
        />
      </div>
    </nav>
  );
}

export default DesktopOrTabletNavbar;
