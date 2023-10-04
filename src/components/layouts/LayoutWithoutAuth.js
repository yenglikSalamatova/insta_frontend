import Footer from "@/components/layouts/Footer";
import NavBar from "@/components/layouts/NavBar";
import RightSideBar from "@/components/recomendations/RightSideBar";
import Header from "@/components/layouts/Header";
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
