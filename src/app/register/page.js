import RegisterPage from "@/components/auth/RegisterPage";
import WithoutAuth from "@/components/layouts/WithoutAuth";

export const metadata = {
  title: "Зарегистрироваться | Instagram",
};

export default function Register() {
  return (
    <WithoutAuth>
      <RegisterPage />
    </WithoutAuth>
  );
}
