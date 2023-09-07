import styles from "@/styles/Search.module.scss";
import Image from "next/image";
export default function Search() {
  return (
    <div className={styles.search}>
      <Image src="/posts/search.svg" width={18} height={18} />
      <input type="text" placeholder="Поиск" className={styles.search_input} />
    </div>
  );
}
