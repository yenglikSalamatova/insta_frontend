import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import RightSideBar from "@/components/RightSideBar";

export const metadata = {
  title: "Instagram",
};

export default function LayoutWithNav({ children }) {
  return (
    <div className="container-main">
      <NavBar />
      <div className="container">
        {children}
        <Footer />
      </div>
    </div>
  );
}
