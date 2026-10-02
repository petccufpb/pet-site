import api from "../api";
import { CreateEventInput, SDCEvent } from "sdc-admin";

export async function fetchEvents(editionId: string): Promise<SDCEvent[]> {
  const response = await api.get<SDCEvent[]>("/projects/events", {
    params: { editionId },
  });

  return response.data;
}

export async function createEvent(data: CreateEventInput): Promise<SDCEvent> {
  // No navegador (painel admin), usamos o /api/proxy para enviar o cookie HttpOnly de autenticação
  if (typeof window !== "undefined") {
    const response = await fetch("/api/proxy/projects/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: any = new Error(errorData.message || "Erro ao criar evento.");
      error.response = { data: errorData, status: response.status };
      throw error;
    }

    return response.json();
  }

  const response = await api.post<SDCEvent>("/projects/events", data);
  return response.data;
}
