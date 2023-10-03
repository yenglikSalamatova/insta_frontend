import Footer from "@/components/layouts/Footer";
import NavBar from "@/components/layouts/NavBar";
import RightSideBar from "@/components/recomendations/RightSideBar";

export const metadata = {
  title: "Instagram",
};

export default function LayoutWithNav({ children }) {
  return (
    <div className="container-main">
      <NavBar />
      <div className="container_one_column">
        {children}
        <Footer />
      </div>
    </div>
  );
}
