import Footer from "@/components/Footer";

export const metadata = {
  title: "Вход • Instagram",
};

export default function LoginLayout({ children }) {
  return (
    <div className="container">
      {children}
      <Footer />
    </div>
  );
}
