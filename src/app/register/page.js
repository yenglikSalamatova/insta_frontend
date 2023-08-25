"use client";
import Link from "next/link";
import { useState } from "react";

import styles from "@/styles/register.module.scss";

import Step1 from "@/components/auth/Step1";
import Step2 from "@/components/auth/Step2";
import Step3 from "@/components/auth/Step3";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <main className={styles.main_center}>
      <form className={styles.form}>
        {currentStep === 1 && <Step1 onNext={nextStep} />}
        {currentStep === 2 && <Step2 onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 3 && <Step3 onNext={nextStep} onPrev={prevStep} />}
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
  );
}
