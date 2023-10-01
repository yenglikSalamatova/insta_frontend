import LoginPage from "@/app/login/login.js";

// NOTE: Метадата только для серверной части сайта

export const metadata = {
  title: "Войти | Instagram",
};

const Login = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Login;
