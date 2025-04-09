"use client";

import {
	ButtonContainer,
	ConfirmButton,
	InputContainer,
} from "@app/sdc/minicurso/components/MinicursoForm/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowRight } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

import { ValidCertificatePopup } from "../ValidCertificatePopup";
import { CertificadoFormContainer } from "./styles";

const sendFormSchema = z.object({
  certificateId: z.string().length(36, { message: "O código verificador deve ter 36 caracteres" }),
  matricula: z.preprocess(
    val => (val === "" ? undefined : val),
    z
      .string()
      .regex(/^\d+$/, { message: "Sua matrícula só pode conter números" })
      .length(11, { message: "Sua matrícula deve conter 11 dígitos" })
      .optional(),
  ),
});

type SendFormData = z.infer<typeof sendFormSchema>;

export function CertificadoForm() {
  let timeout: NodeJS.Timeout | undefined;
  const [showPopup, setShowPopup] = useState(false);
  const [certificateIsClosing, setCertificateIsClosing] = useState(false);

  function closePopup() {
    setCertificateIsClosing(true);
    if (timeout) clearTimeout(timeout);
    setTimeout(() => {
      setShowPopup(false);
      setCertificateIsClosing(false);
    }, 300);
  }

  async function sendForm(data: { matricula: number; certificateId: string }) {
    const i = toast.info("Carregando...");

    const res = await fetch("/api/certificates/validate", {
      method: "POST",
      body: JSON.stringify({
        certificateId: data.certificateId,
        ...(data.matricula ? { matricula: data.matricula.toString() } : {}),
      }),
    });

    toast.dismiss(i);

    if (res.status === 200 && (await res.json()) === true) {
      setShowPopup(true);
      timeout = setTimeout(() => closePopup(), 5000);
    } else {
      toast.error("Este certificado não consta na nossa base de dados", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          position: "sticky",
          textAlign: "center",
          color: "#fgfgfg",
        },
      });
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<SendFormData>({
    resolver: zodResolver(sendFormSchema),
    mode: "onChange",
  });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {showPopup && <ValidCertificatePopup isClosing={certificateIsClosing} onClose={() => closePopup()} />}
      <CertificadoFormContainer onSubmit={handleSubmit(sendForm)} borderType="gradient">
        <InputContainer>
          <div>Código Verificador</div>
          <input type="text" placeholder="4fc502d1702f63d0e8f4d4a2c59ef" {...register("certificateId")} />
          {errors.certificateId && <span>{errors.certificateId.message}</span>}
        </InputContainer>
        <InputContainer>
          <div>Matrícula</div>
          <input type="text" placeholder="20000115555" {...register("matricula")} />
          {errors.matricula && <span>{errors.matricula.message}</span>}
        </InputContainer>
        <ButtonContainer type="normal">
          <ConfirmButton disabled={!isValid} type="submit">
            <span>Verificar</span>
            <HiArrowRight />
          </ConfirmButton>
        </ButtonContainer>
      </CertificadoFormContainer>
    </>
  );
}
