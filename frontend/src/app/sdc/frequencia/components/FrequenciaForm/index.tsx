"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { distanceBetweenCoordinates } from "@hyoretsu/utils";
import { useForm } from "react-hook-form";
import { HiArrowRight } from "react-icons/hi2";
import { RiCalendarLine, RiTimeLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

import { GeolocationFinder } from "../GeolocationFinder";
import {
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  DateContainer,
  FormContainer,
  InputContainer,
} from "./styles";

import { useEffect, useState } from "react";

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

export function FrequenciaForm({
  date,
  sections,
  id,
  type = "normal",
  confirmType = "confirm",
  borderType = "static",
}: {
  type?: "normal" | "cancel";
  confirmType?: "next" | "confirm";
  borderType?: "static" | "gradient";
  date?: {
    day: string;
    time: string;
  };
  sections?: { title: string; placeholder: string; id: "name" | "email" }[];
  id: string;
}) {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);

  async function sendForm(data: any) {
    const i = toast.info("Carregando...");

    if (!userLocation) return;

    if (
      distanceBetweenCoordinates(
        [userLocation.coords.latitude, userLocation.coords.longitude],
        [-7.162116870906208, -34.81715445965711],
      ) > 1000
    ) {
      toast.dismiss(i);
      toast.error("Você está fora da área do Centro de Informática.", {
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
      return;
    }

    const res = await fetch("/api/attendance", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        eventId: id,
      }),
    });

    toast.dismiss(i);

    if (res.status === 200) {
      toast.success("Frequência cadastrada com sucesso!");
    } else {
      const d = await res.json();

      toast.error(d.message || "Falha no cadastro da frequência", {
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
  } = useForm<SendFormData>({
    resolver: zodResolver(sendFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    console.log(userLocation);
  }, [userLocation]);

  return (
    <>
      <GeolocationFinder onLocationAccess={setUserLocation} />
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
          <ConfirmButton disabled={!userLocation || !isValid} type="submit">
            <span>{confirmType === "next" ? "Próximo Passo" : "Confirmar"}</span>
            {confirmType === "next" && <HiArrowRight />}
          </ConfirmButton>
        </ButtonContainer>
      </FormContainer>
    </>
  );
}
