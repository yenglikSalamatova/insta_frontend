import Footer from "@/components/layouts/Parts/Footer";
import NavBar from "@/components/layouts/Parts/NavBar";
import RightSideBar from "@/components/recomendations/RightSideBar";
import Header from "@/components/layouts/Parts/Header";
import styles from "@/styles/header.module.scss";

export const metadata = {
  title: "Instagram",
};

export default function LayoutWithoutAuth({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <hr className={styles.hr}></hr>
      {children}
      <Footer />
    </div>
  );
}
