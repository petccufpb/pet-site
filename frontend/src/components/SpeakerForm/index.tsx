"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { z } from "zod";

import { ImageUpload } from "@components/ImageUpload";
import api from "@services/api";

import {
  Area,
  AreaContainer,
  InputContainer,
  SendButton,
} from "./styles";

export interface SpeakerFormProps {
  onCreated?: () => void;
}

const extractDriveId = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return "";
  // Formato: /d/<ID>/...
  const match = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  // Formato: id=<ID>
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];
  // Se for apenas o ID puro
  if (/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    return trimmed;
  }
  return "";
};

const speakerSchema = z.object({
  name: z.string().trim().min(2, "Nome obrigatório"),
  about: z.string().trim().max(500, "Descrição muito longa").optional(),
  photoId: z.string().trim().optional(),
});

type SpeakerFormData = z.infer<typeof speakerSchema>;

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

export function SpeakerForm({ onCreated }: SpeakerFormProps) {
  const [speakerPhoto, setSpeakerPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SpeakerFormData>({
    resolver: zodResolver(speakerSchema),
    defaultValues: { name: "", about: "", photoId: "" },
  });

  const rawPhotoInput = watch("photoId") || "";
  const cleanedId = extractDriveId(rawPhotoInput);
  const drivePreviewUrl = cleanedId
    ? `https://lh3.googleusercontent.com/d/${encodeURIComponent(cleanedId)}`
    : null;

  const onSubmit = async (data: SpeakerFormData) => {
    try {
      setIsSubmitting(true);
      setStatus(null);

      let photoUrl: string | undefined = undefined;

      if (speakerPhoto) {
        photoUrl = await fileToBase64(speakerPhoto);
      } else {
        const targetId = extractDriveId(data.photoId || "");
        if (targetId) {
          photoUrl = `https://lh3.googleusercontent.com/d/${encodeURIComponent(targetId)}`;
        }
      }

      await api.post("/projects/speakers", {
        name: data.name,
        about: data.about || null,
        photoUrl,
      });

      reset();
      setSpeakerPhoto(null);
      setStatus({ type: "success", message: "Palestrante cadastrado com sucesso." });
      onCreated?.();
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
          <h3>ID ou Link da foto no Google Drive</h3>
          <input placeholder="Cole o ID ou o link do Google Drive" {...register("photoId")} />
          {errors.photoId && <span>{errors.photoId.message}</span>}
        </InputContainer>

        <InputContainer>
          <ImageUpload
            value={speakerPhoto}
            onChange={setSpeakerPhoto}
            externalPreviewUrl={drivePreviewUrl}
            label="Foto do palestrante (preview)"
          />
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
