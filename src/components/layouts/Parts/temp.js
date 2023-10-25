{
  !extramini && (
    <nav
      className={
        styles.navbar +
        " " +
        `${searchBar ? styles.mini_navbar : ""} ${
          !viewportIsWide ? styles.mini_navbar : ""
        }`
      }
    >
      <Link href="/">
        <Image
          className={`${styles.logo} ${
            viewportIsWide && !searchBar ? styles.logo_big : styles.logo_small
          }`}
          src={viewportIsWide && !searchBar ? "/logo.png" : "/logo_camera.svg"}
          width={110}
          height={25}
          alt="Instagram logo"
        />
      </Link>

      <Link href="/" className={pathname === "/" ? styles.active : ""}>
        <Image
          className="img"
          src={`/posts/${pathname === "/" ? "house_fill" : "house_stroke"}.svg`}
          width={24}
          height={0}
          alt="House Stroke Icon"
        />
        {!searchBar && viewportIsWide && "Главная"}
      </Link>

      <Link href="#" onClick={() => setSearchBar(!searchBar)}>
        <Image
          className="img"
          src="/posts/glass_stroke.svg"
          width={24}
          height={0}
          alt="Glass Stroke Icon"
        />
        {!searchBar && viewportIsWide && "Поисковый запрос"}
      </Link>
      <Link href="/interesting-posts">
        <Image
          className="img"
          src="/posts/compass_stroke.svg"
          width={24}
          height={0}
          alt="Compass Stroke Icon"
        />
        {!searchBar && viewportIsWide && "Интересное"}
      </Link>
      {/* <Link href="/">
      <img
        className="img"
        src="/posts/heart_stroke.svg"
        width={24}
        height={0}
        alt="Heart Stroke Icon"
      />
      Уведомления
    </Link> */}
      <Link href="#" onClick={handleCreatePost}>
        <Image
          className="img"
          src="/posts/plus_circle_stroke.svg"
          width={24}
          height={0}
          alt="Create Post Icon"
        />
        {!searchBar && viewportIsWide && "Создать"}
      </Link>

      <Link
        href={`/profile/${currentUser.username}`}
        className={
          pathname === `/profile/${currentUser.username}` ? styles.active : ""
        }
      >
        <img
          className={`${styles.avatar} avatar`}
          src={`${END_POINT}${currentUser.profilePicture}`}
          width={28}
          height={28}
          alt="Your Avatar"
        />
        {!searchBar && viewportIsWide && "Профиль"}
      </Link>
      <div className={styles.nav_end}>
        <button onClick={() => dispatch(logout())}>
          <Image
            src="/posts/logout.svg"
            width={24}
            height={24}
            alt="Logout button"
          />
          {!searchBar && viewportIsWide && "Выйти"}
        </button>
      </div>
    </nav>
  );
}
{
  extramini && (
    <>
      {" "}
      <nav className={styles.extramini_navbar}>
        <Link href="/">
          <Image
            className={`${styles.logo} ${styles.logo_small}`}
            src="/logo_camera.svg"
            width={100}
            height={100}
            alt="Instagram logo"
          />
        </Link>

        <Link href="/" className={pathname === "/" ? styles.active : ""}>
          <Image
            className="img"
            src={`/posts/${
              pathname === "/" ? "house_fill" : "house_stroke"
            }.svg`}
            width={24}
            height={0}
            alt="House Stroke Icon"
          />
        </Link>

        <Link href="/interesting-posts">
          <Image
            className="img"
            src="/posts/compass_stroke.svg"
            width={24}
            height={0}
            alt="Compass Stroke Icon"
          />
        </Link>

        <Link href="#" onClick={handleCreatePost}>
          <Image
            className="img"
            src="/posts/plus_circle_stroke.svg"
            width={24}
            height={0}
            alt="Create Post Icon"
          />
        </Link>

        <Link
          href={`/profile/${currentUser.username}`}
          className={
            pathname === `/profile/${currentUser.username}` ? styles.active : ""
          }
        >
          <img
            className={`${styles.avatar} avatar`}
            src={`${END_POINT}${currentUser.profilePicture}`}
            width={28}
            height={28}
            alt="Your Avatar"
          />
        </Link>
      </nav>
      <div className={styles.search_withlogo}>
        <Link href="/">
          <Image
            className={`${styles.logo} ${styles.logo_big}`}
            src={"/logo.png"}
            width={110}
            height={25}
            alt="Instagram logo"
          />
        </Link>
        <input
          type="search"
          placeholder="Поиск"
          onClick={openMiniSearchBar}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <button onClick={() => dispatch(logout())}>
          <Image
            src="/posts/logout.svg"
            width={24}
            height={24}
            alt="Logout button"
          />
          {!searchBar && viewportIsWide && "Выйти"}
        </button>
      </div>
    </>
  );
}
{
  miniSearchBar && (
    <MiniSearchBar
      onClose={openMiniSearchBar}
      setSearchInput={setSearchInput}
      searchInput={searchInput}
    />
  );
}
