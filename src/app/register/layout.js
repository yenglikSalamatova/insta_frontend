import Footer from "@/components/Footer";

export const metadata = {
  title: "Зарегистрироваться • Instagram",
};

export default function RegisterLayout({ children }) {
  return (
    <>
      <section>{children}</section>;
      <Footer />
    </>
  );
}
