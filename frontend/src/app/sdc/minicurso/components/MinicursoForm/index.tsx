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
  DeleteButton,
  FormContainer,
  InputContainer,
} from "./styles";

import { FaExclamationTriangle, FaUsers } from "react-icons/fa";
import { useRouter } from "next/navigation";

function DateOrNothing({
  date,
  slotsRemaining,
}: {
  date?: { day: string; time: string };
  slotsRemaining: number | null;
}) {
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
        {slotsRemaining && (
          <span>
            <FaUsers />
            <span>{slotsRemaining} vagas</span>
          </span>
        )}
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
  matricula: z
    .string()
    .transform(m => parseInt(m))
    .pipe(
      z
        .number({
          invalid_type_error: "A matrícula deve ser um número",
          required_error: "A matrícula é obrigatória",
        })
        .min(10000000, { message: "Sua matrícula deve conter no mínimo 8 dígitos (antigas)" })
        .max(99999999999, { message: "Sua matrícula deve conter 11 dígitos" }),
    ),
  email: z.string().trim().nonempty("O email é obrigatório").email("Formato de email inválido"),
});

type SendFormData = z.infer<typeof sendFormSchema>;

export function MinicursoForm({
  date,
  sections,
  id,
  extrasAvailable,
  slotsRemaining,
  type = "normal",
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
  sections?: { title: string; placeholder: string; id: keyof SendFormData }[];
  id: string;
  slotsRemaining: number | null;
}) {
  const { back } = useRouter();

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
      setTimeout(back, 5500);
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
          position: "sticky",
          textAlign: "center",
          color: "#fgfgfg",
        },
      });
    }
  }

  const {
    register,
    getValues,
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
        <DateOrNothing date={date} slotsRemaining={slotsRemaining} />
        {sections &&
          sections.map(section => (
            <InputContainer key={section.title}>
              <div>{section.title}</div>
              <input type="text" placeholder={section.placeholder} {...register(section.id)} />
              {errors[section.id] && <span>{errors[section.id]?.message}</span>}
            </InputContainer>
          ))}
        {extrasAvailable && (
          <span>
            <FaExclamationTriangle />
            <span>
              Esse minicurso está com as vagas de computador cheias. Ao se inscrever, você se compromete em
              levar seu próprio notebook.
            </span>
          </span>
        )}
        <ButtonContainer type={type}>
          <DeleteButton
            type="button"
            disabled={!isValid}
            onClick={async e => {
              e.preventDefault();
              const i = toast.info("Carregando...");

              const { email, matricula } = getValues();

              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/projects/participations?email=${email}&eventId=${id}&matricula=${matricula}`,
                {
                  method: "DELETE",
                },
              );

              toast.dismiss(i);

              if (res.status === 200) {
                toast.success("Inscrição deletada com sucesso!");
                setTimeout(back, 5500);
              } else {
                toast.error((await res.json()).message || "Falha ao se desinscrever, tente novamente.");
              }
            }}
          >
            Desinscrever-se
          </DeleteButton>

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
