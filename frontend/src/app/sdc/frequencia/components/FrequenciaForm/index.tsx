"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { distanceBetweenCoordinates } from "@hyoretsu/utils";
import { useForm } from "react-hook-form";
import { HiArrowRight } from "react-icons/hi2";
import { RiCalendarLine, RiTimeLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

import {
  ButtonContainer,
  CancelButton,
  CheckBox,
  CheckboxContainer,
  ConfirmButton,
  DateContainer,
  FormContainer,
  InputContainer,
} from "./styles";

import { differenceInMinutes } from "date-fns";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

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
    return <CancelButton href="/sdc">Cancelar</CancelButton>;
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
  email: z.string().trim().nonempty("O email é obrigatório").email("Formato de email inválido"),
});

type SendFormData = z.infer<typeof sendFormSchema>;

export function FrequenciaForm({
  date,
  endTime,
  isEventOnSite,
  sections,
  id,
  isFromUFPB,
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
  endTime?: Date;
  isEventOnSite?: boolean;
  sections?: { title: string; placeholder: string; id: "name" | "email" }[];
  id: string;
  isFromUFPB: boolean;
}) {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);

  async function sendForm(data: any) {
    const i = toast.info("Carregando...");

    if (isEventOnSite && !userLocation && !isFromUFPB) {
      toast.dismiss(i);
      toast.error("Você precisa habilitar a localização para marcar a frequência.", {
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

      return;
    }

    const eventEndTimeOffset = differenceInMinutes(new Date(), endTime as Date);

    let frequenciaDisabled = "";
    if (eventEndTimeOffset < -30) {
      frequenciaDisabled = "Você só pode marcar frequência 30min antes do término do evento";
    } else if (eventEndTimeOffset > 30) {
      frequenciaDisabled = "Lamentamos, mas a frequência para esse evento já fechou";
    }

    if (frequenciaDisabled) {
      toast.dismiss(i);
      toast.error(frequenciaDisabled, {
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

      return;
    }

    if (localStorage.getItem(id)) {
      toast.dismiss(i);
      toast.error("Você já cadastrou frequência para este evento.", {
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

      return;
    }

    if (
      distanceBetweenCoordinates(
        [userLocation.coords.latitude, userLocation.coords.longitude],
        [-7.16252, -34.8173],
      ) > 2000
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
          position: "sticky",
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
      localStorage.setItem(id, "true");
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
  } = useForm<SendFormData>({
    resolver: zodResolver(sendFormSchema),
    mode: "onChange",
  });

  const error: PositionErrorCallback = e => {
    toast.error("Não foi possível obter sua localização.", {
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
    setUserLocation(null);
  };

  useEffect(() => {
    if (navigator.geolocation && !userLocation) {
      navigator.geolocation.getCurrentPosition(setUserLocation, null);

      navigator.permissions.query({ name: "geolocation" }).then(permissionStatus => {
        permissionStatus.onchange = e => {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition(setUserLocation, null);
            return;
          }

          setUserLocation(null);
        };
      });
    }
  }, [userLocation]);

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
        <DateOrNothing date={date}></DateOrNothing>
        {sections &&
          sections.map(section => (
            <InputContainer key={section.title}>
              <div>{section.title}</div>
              <input type="text" placeholder={section.placeholder} {...register(section.id)} />
              {errors[section.id] && <span>{errors[section.id]?.message}</span>}
            </InputContainer>
          ))}
        {!isFromUFPB && (
          <CheckboxContainer onClick={() => navigator.geolocation.getCurrentPosition(setUserLocation, error)}>
            <CheckBox enabled={userLocation ? true : false}>
              <FaCheck size="0.7em" color="white"></FaCheck>
            </CheckBox>
            <span>Compartilhar localização</span>
          </CheckboxContainer>
        )}
        <ButtonContainer type={type}>
          <CancelButtonOrNothing type={type} />
          <ConfirmButton disabled={!(userLocation || isFromUFPB) || !isValid} type="submit">
            <span>{confirmType === "next" ? "Próximo Passo" : "Confirmar"}</span>
            {confirmType === "next" && <HiArrowRight />}
          </ConfirmButton>
        </ButtonContainer>
      </FormContainer>
    </>
  );
}
