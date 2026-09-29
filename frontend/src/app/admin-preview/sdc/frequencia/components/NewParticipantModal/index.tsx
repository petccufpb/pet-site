import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import { z } from "zod";

import api from "@api";

import { Participant } from "../../types";
import { getApiError } from "../../utils";
import { Actions, Dialog, Field, Overlay } from "./styles";

const courses = [
  { value: "cc", label: "Ciência da Computação" },
  { value: "ec", label: "Engenharia da Computação" },
  { value: "cdia", label: "Ciência de Dados" },
  { value: "ext", label: "Externo" },
  { value: "outro", label: "Outro" },
];

const schema = z.object({
  name: z.string().trim().nonempty("Preencha este campo"),
  email: z.string().trim().nonempty("O email é obrigatório").email("Formato de email inválido"),
  celular: z.string().min(17, "O número deve conter 9 dígitos"),
  birthDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida")
    .refine(value => {
      // new Date(2024, 1, 31) vira 02/03 silenciosamente; exige que a data volte igual
      const [day, month, year] = value.split("/").map(Number);
      const date = new Date(year, month - 1, day);

      return (
        year >= 1900 &&
        date <= new Date() &&
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }, "Data inválida"),
  course: z.string(),
  matricula: z
    .string()
    .trim()
    .regex(/^(\d{8}|\d{11})?$/, "A matrícula deve ter 8 ou 11 dígitos")
    .optional(),
});

type FormData = z.infer<typeof schema>;

interface NewParticipantModalProps {
  editionId: string;
  initialQuery?: string;
  onClose: () => void;
  onCreated: (participant: Participant) => void;
}

export function NewParticipantModal({
  editionId,
  initialQuery = "",
  onClose,
  onCreated,
}: NewParticipantModalProps) {
  const isEmail = initialQuery.includes("@");
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      course: "cc",
      email: isEmail ? initialQuery.trim() : "",
      name: isEmail ? "" : initialQuery.trim(),
    },
  });

  const dialogRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Tab" && dialogRef.current) {
        // Mantém o Tab dentro do modal
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          "input, select, button:not([disabled])",
        );
        const [first] = focusable;
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (!dialogRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const course = watch("course");

  async function submit({ birthDate, celular, course, email, matricula, name }: FormData) {
    if (course !== "ext" && !matricula) {
      setError("matricula", { message: "A matrícula é obrigatória" });

      return;
    }

    const [day, month, year] = birthDate.split("/").map(Number);

    try {
      // Upsert: se o e-mail/matrícula/celular já existir, o backend atualiza o cadastro
      const { data: participant } = await api.post<Participant>("/projects/participants", {
        birthDate: new Date(year, month - 1, day).toISOString(),
        course,
        email: email.toLowerCase(),
        matricula: course === "ext" ? null : matricula,
        name,
        phoneNumber: celular,
        university: course === "ext" ? "Externo" : "UFPB",
      });

      try {
        await api.post("/projects/participations", { editionId, participantId: participant.id });
      } catch (err) {
        // 403 aqui significa que já está inscrito na edição
        if (getApiError(err).status !== 403) {
          throw err;
        }
      }

      onCreated(participant);
      onClose();
    } catch (err) {
      toast.error(getApiError(err).message || "Falha ao cadastrar inscrito");
    }
  }

  return (
    <Overlay onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-participant-title"
        onSubmit={handleSubmit(submit)}
      >
        <h2 id="new-participant-title">Novo inscrito</h2>

        <Field>
          <label htmlFor="np-name">Nome completo</label>
          <input id="np-name" autoFocus={!isEmail} {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </Field>
        <Field>
          <label htmlFor="np-email">E-mail</label>
          <input id="np-email" type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </Field>
        <Field>
          <label htmlFor="np-celular">Celular</label>
          <InputMask
            id="np-celular"
            autoFocus={isEmail}
            placeholder="DDD + número"
            mask="(99) 99999 - 9999"
            maskChar={null}
            {...register("celular")}
          />
          {errors.celular && <span>{errors.celular.message}</span>}
        </Field>
        <Field>
          <label htmlFor="np-birth">Data de nascimento</label>
          <InputMask
            id="np-birth"
            placeholder="01/01/2000"
            mask="99/99/9999"
            maskChar={null}
            {...register("birthDate")}
          />
          {errors.birthDate && <span>{errors.birthDate.message}</span>}
        </Field>
        <Field>
          <label htmlFor="np-course">Curso</label>
          <select id="np-course" {...register("course")}>
            {courses.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        {course !== "ext" && (
          <Field>
            <label htmlFor="np-matricula">Matrícula</label>
            <InputMask id="np-matricula" mask="99999999999" maskChar={null} {...register("matricula")} />
            {errors.matricula && <span>{errors.matricula.message}</span>}
          </Field>
        )}

        <Actions>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Cadastrar e marcar presença"}
          </button>
        </Actions>
      </Dialog>
    </Overlay>
  );
}
