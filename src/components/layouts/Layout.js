import Footer from "@/components/layouts/Footer";

export const metadata = {
  title: "Вход • Instagram",
};

export default function Layout({ children }) {
  return (
    <div className="container">
      {children}
      <Footer />
    </div>
  );
}
