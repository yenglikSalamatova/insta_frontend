import LoginPage from "@/components/auth/LoginPage";
import WithoutAuth from "@/components/layouts/WithoutAuth";

// NOTE: Метадата только для серверной части сайта

export const metadata = {
  title: "Войти | Instagram",
};

const Login = () => {
  return (
    <WithoutAuth>
      <LoginPage />
    </WithoutAuth>
  );
};

export default Login;
