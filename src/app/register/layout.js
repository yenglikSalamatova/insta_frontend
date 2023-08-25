import Footer from "@/components/Footer";

export const metadata = {
  title: "Зарегистрироваться • Instagram",
};

export default function RegisterLayout({ children }) {
  return (
    <div className="container">
      {children};
      <Footer />
    </div>
  );
}
