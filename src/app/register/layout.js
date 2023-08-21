import Footer from "@/components/Footer";

export default function RegisterLayout({ children }) {
  return (
    <>
      <section>{children}</section>;
      <Footer />
    </>
  );
}
