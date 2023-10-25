import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/navbar.module.scss";

function NavbarLink({
  href,
  onClick,
  label,
  iconSrc,
  isWide,
  avatar,
  pathname,
  activeSrc,
}) {
  const isActive = pathname === href;
  const imgSrc = isActive ? activeSrc : iconSrc;
  const imgAlt = `${label} Icon`;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={isActive ? styles.active : ""}
    >
      <div className={styles.nav_link}>
        {avatar ? (
          <img
            className={`${styles.avatar} avatar`}
            src={imgSrc}
            alt={imgAlt}
          />
        ) : (
          <Image
            className="img"
            src={imgSrc}
            width={24}
            height={24}
            alt={imgAlt}
          />
        )}

        {isWide && label}
      </div>
    </Link>
  );
}

export default NavbarLink;
