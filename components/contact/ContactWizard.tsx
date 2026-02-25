"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { WIZARD_STEPS } from "@/lib/constants";
import WizardProgress from "./WizardProgress";
import WizardNavigation from "./WizardNavigation";
import CompletionScreen from "./CompletionScreen";
import Step1Name from "./steps/Step1Name";
import Step2Phone from "./steps/Step2Phone";
import Step3Email from "./steps/Step3Email";
import Step4HomepageType from "./steps/Step4HomepageType";
import Step5AdditionalOption from "./steps/Step5AdditionalOption";
import Step6Message from "./steps/Step6Message";
import Step7Reference from "./steps/Step7Reference";
import Step8FileUpload from "./steps/Step8FileUpload";

export interface WizardFormData {
  name: string;
  phone: string;
  email: string;
  homepageType: string;
  homepagePrice: string;
  additionalOption: string;
  additionalPrice: string;
  message: string;
  referenceLink: string;
  fileName: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

export default function ContactWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<WizardFormData>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      homepageType: "",
      homepagePrice: "",
      additionalOption: "",
      additionalPrice: "",
      message: "",
      referenceLink: "",
      fileName: "",
    },
  });

  const requiredFieldsByStep: Record<number, (keyof WizardFormData)[]> = {
    0: ["name"],
    1: ["phone"],
  };

  const goNext = async () => {
    const fields = requiredFieldsByStep[currentStep];
    if (fields) {
      const valid = await trigger(fields);
      if (!valid) return;
    }
    if (currentStep < WIZARD_STEPS.length - 1) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  const onSubmit = async (data: WizardFormData) => {
    setIsSubmitting(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      const promises: Promise<unknown>[] = [];

      if (serviceId && templateId && publicKey) {
        promises.push(
          emailjs.send(
            serviceId,
            templateId,
            {
              from_name: data.name,
              phone: data.phone,
              email: data.email,
              homepage_type: data.homepageType,
              homepage_price: data.homepagePrice,
              additional_option: data.additionalOption,
              additional_price: data.additionalPrice,
              message: data.message,
              reference_link: data.referenceLink,
              file_name: data.fileName,
            },
            publicKey
          )
        );
      }

      promises.push(
        fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      );

      const results = await Promise.allSettled(promises);
      const hasSuccess = results.some((r) => r.status === "fulfilled");

      if (hasSuccess) {
        setIsCompleted(true);
      } else {
        alert("전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch {
      alert("전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <CompletionScreen />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1Name register={register} errors={errors} />;
      case 1:
        return <Step2Phone register={register} errors={errors} />;
      case 2:
        return <Step3Email register={register} errors={errors} />;
      case 3:
        return <Step4HomepageType watch={watch} setValue={setValue} />;
      case 4:
        return <Step5AdditionalOption watch={watch} setValue={setValue} />;
      case 5:
        return <Step6Message register={register} />;
      case 6:
        return <Step7Reference register={register} />;
      case 7:
        return <Step8FileUpload watch={watch} setValue={setValue} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center max-w-[600px] mx-auto px-6 py-20">
      <WizardProgress currentStep={currentStep} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        <WizardNavigation
          currentStep={currentStep}
          onPrev={goPrev}
          onNext={goNext}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}
