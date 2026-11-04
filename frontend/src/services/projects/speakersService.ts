import api from "../api";
import { SDCSpeaker } from "sdc-admin";
import { MOCK_SPEAKER } from "../mocks/sdcMocks";


export async function fetchSpeakers(): Promise<SDCSpeaker[]> {
  try {
    const response = await api.get<SDCSpeaker[]>("/projects/speakers");
    if (response.data && response.data.length > 0) {
      return response.data;
    }
    return [MOCK_SPEAKER];
  } catch (error) {
    console.warn(
      "Não foi possível carregar a lista de palestrantes da API. Utilizando o mock provisório do Postman para desbloqueio da sprint.",
      error
    );
    return [MOCK_SPEAKER];
  }
}

export interface CreateSpeakerInput {
  name: string;
  about?: string | null;
  photoUrl?: string;
}

export async function createSpeaker(data: CreateSpeakerInput): Promise<SDCSpeaker> {
  const payload: Record<string, any> = {
    name: data.name.trim(),
    about: data.about?.trim() || null,
  };

  let photo = data.photoUrl?.trim();
  if (photo) {
    if (!photo.includes("://") && /^[a-zA-Z0-9_-]+$/.test(photo)) {
      photo = `https://drive.google.com/uc?id=${encodeURIComponent(photo)}`;
    }
    payload.photoUrl = photo;
  }

  // No navegador (painel admin), usamos o /api/proxy para enviar o cookie HttpOnly de autenticação
  if (typeof window !== "undefined") {
    const response = await fetch("/api/proxy/projects/speakers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: any = new Error(
        (Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message) ||
          "Erro ao cadastrar palestrante."
      );
      error.response = { data: errorData, status: response.status };
      throw error;
    }

    return response.json();
  }

  const response = await api.post<SDCSpeaker>("/projects/speakers", payload);
  return response.data;
}
