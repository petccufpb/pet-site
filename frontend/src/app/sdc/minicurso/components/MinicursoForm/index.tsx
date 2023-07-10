"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiArrowRight } from "react-icons/hi2";
import { RiCalendarLine, RiTimeLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

import {
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  DateContainer,
  InputContainer,
  FormContainer,
} from "./styles";

import Link from "next/link";

function DateOrNothing({ date }: { date?: { day: string; time: string } }) {
  if (date) {
    return (
      <DateContainer>
        <span>
          <RiCalendarLine />
          <span>{date.day}</span>
        </span>
        <span>
          <RiTimeLine />
          <span>{date.time}</span>
        </span>
      </DateContainer>
    );
  } else {
    return <></>;
  }
}

function CancelButtonOrNothing({ type }: { type: "normal" | "cancel" }) {
  if (type === "cancel") {
    return <CancelButton>Cancelar</CancelButton>;
  } else {
    return <></>;
  }
}

const sendFormSchema = z.object({
  name: z
    .string()
    .nonempty("Preencha este campo")
    .transform(name => {
      return name
        .trim()
        .split(" ")
        .map(word => {
          return word[0]?.toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z.string().nonempty("O email é obrigatório").email("Formato de email inválido"),
});

type SendFormData = z.infer<typeof sendFormSchema>;

export function MinicursoForm({
  date,
  sections,
  id,
  extrasAvailable,
  /*   formAction,
   */ type = "normal",
  confirmType = "confirm",
  borderType = "static",
}: {
  type?: "normal" | "cancel";
  confirmType?: "next" | "confirm";
  borderType?: "static" | "gradient";
  extrasAvailable?: boolean;
  date?: {
    day: string;
    time: string;
  };
  sections?: { title: string; placeholder: string; id: "name" | "email" }[];
  id: string;
  /*   formAction: () => void;
   */
}) {
  async function sendForm(data: any) {
    const i = toast.info("Carregando...");

    const res = await fetch("/api/subscribe/event", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        event: id,
      }),
    });

    const d = await res.json();
    toast.dismiss(i);

    if (res.status === 200) {
      toast.success("Inscrição realizada com sucesso!");
    } else {
      toast.error(d.message || "Falha na inscrição", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
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
    watch,
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
      <FormContainer borderType={borderType} onSubmit={handleSubmit(sendForm)}>
        {extrasAvailable && (
          <span>
            Obs: Esse minicurso está com as vagas de computador cheio. Ao se inscrever, você se compromete em
            levar seu próprio notebook.
          </span>
        )}
        <DateOrNothing date={date}></DateOrNothing>
        {sections &&
          sections.map(section => (
            <InputContainer key={section.title}>
              <div>{section.title}</div>
              <input type="text" placeholder={section.placeholder} {...register(section.id)} />
              {errors[section.id] && <span>{errors[section.id]?.message}</span>}
            </InputContainer>
          ))}
        <ButtonContainer type={type}>
          <CancelButtonOrNothing type={type} />
          <ConfirmButton disabled={!isValid} type="submit">
            <span>{confirmType === "next" ? "Próximo Passo" : "Confirmar"}</span>
            {confirmType === "next" && <HiArrowRight />}
          </ConfirmButton>
        </ButtonContainer>
      </FormContainer>
    </>
  );
}
