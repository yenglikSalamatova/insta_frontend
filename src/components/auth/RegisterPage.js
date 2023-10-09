"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

import styles from "@/styles/register.module.scss";

import Step1 from "@/components/auth/Step1";
import Step2 from "@/components/auth/Step2";
import Step3 from "@/components/auth/Step3";
import Layout from "@/components/layouts/Layout";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    username: "",
    password: "",
    birthday_date: "",
  });

  const isAuth = useSelector((state) => state.auth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push("/posts");
    }
  }, [isAuth]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Layout>
      <main className={styles.main_center}>
        <form className={styles.form}>
          {currentStep === 1 && (
            <Step1
              onNext={nextStep}
              onInputChange={handleInputChange}
              formData={formData}
            />
          )}
          {currentStep === 2 && (
            <Step2
              onNext={nextStep}
              onPrev={prevStep}
              onInputChange={handleInputChange}
              formData={formData}
            />
          )}
          {currentStep === 3 && (
            <Step3 onPrev={prevStep} email={formData.email} />
          )}
        </form>
        <div className={styles.form}>
          <p className={styles.text}>
            Есть аккаунт?{" "}
            <Link href="/login" className={styles.link}>
              Вход
            </Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}
