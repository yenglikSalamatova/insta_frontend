import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/navbar.module.scss";

const Logo = ({ isWide }) => (
  <Link href="/">
    <Image
      className={`${styles.logo} ${
        isWide ? styles.logo_big : styles.logo_small
      }`}
      src={isWide ? "/logo.png" : "/logo_camera.svg"}
      width={isWide ? 110 : 24}
      height={isWide ? 25 : 24}
      alt="Instagram logo"
    />
  </Link>
);

export default Logo;
