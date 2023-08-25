import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Вход • Instagram",
};

export default function LoginLayout({ children }) {
  return (
    <div className="container">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
