import Footer from "./Parts/Footer";

function LayoutLogin({ children }) {
  return (
    <div className="container_login">
      {children}
      <Footer />
    </div>
  );
}

export default LayoutLogin;
