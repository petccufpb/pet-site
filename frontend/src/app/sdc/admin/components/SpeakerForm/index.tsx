"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { z } from "zod";

import { ImageUpload } from "@components/ImageUpload";
import api from "@services/api";

import { Area, AreaContainer, InputContainer, SendButton } from "../../styles";

const speakerSchema = z.object({
  name: z.string().trim().min(2, "Nome obrigatório"),
  about: z.string().trim().max(500, "Descrição muito longa").optional(),
});

type SpeakerFormData = z.infer<typeof speakerSchema>;

export function SpeakerForm() {
  const [speakerPhoto, setSpeakerPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpeakerFormData>({
    resolver: zodResolver(speakerSchema),
    defaultValues: { name: "", about: "" },
  });

  const onSubmit = async (data: SpeakerFormData) => {
    try {
      setIsSubmitting(true);
      setStatus(null);

      await api.post("/projects/speakers", {
        name: data.name,
        about: data.about || null,
      });

      reset();
      setSpeakerPhoto(null);
      setStatus({ type: "success", message: "Palestrante cadastrado com sucesso." });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Não foi possível cadastrar o palestrante." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AreaContainer>
      <Area>
        <InputContainer>
          <h3>Nome do palestrante</h3>
          <input placeholder="Ex.: Luiz Silva" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </InputContainer>

        <InputContainer>
          <h3>Sobre</h3>
          <input placeholder="Breve descrição" {...register("about")} />
          {errors.about && <span>{errors.about.message}</span>}
        </InputContainer>

        <InputContainer>
          <ImageUpload value={speakerPhoto} onChange={setSpeakerPhoto} label="Foto do palestrante" />
        </InputContainer>
      </Area>

      {status && <div style={{ color: status.type === "success" ? "#4ade80" : "#f87171" }}>{status.message}</div>}

      <SendButton type="button" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
        <span>{isSubmitting ? "Cadastrando..." : "Cadastrar Palestrante"}</span>
        <HiOutlineCheckBadge size="1.1em" />
      </SendButton>
    </AreaContainer>
  );
}
