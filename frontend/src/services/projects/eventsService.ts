import api from "../api";
import { CreateEventInput, UpdateEventInput, SDCEvent } from "sdc-admin";
import { MOCK_EVENTS } from "../mocks/sdcMocks";

export async function fetchEvents(editionId: string): Promise<SDCEvent[]> {
  try {
    const response = await api.get<SDCEvent[]>("/projects/events", {
      params: { editionId },
    });

    return response.data;
  } catch (err) {
    console.warn("Falha ao buscar eventos do backend. Utilizando dados mock caso disponíveis.", err);
    const matchedMocks = MOCK_EVENTS.filter((e) => e.editionId === editionId);
    if (matchedMocks.length > 0) return matchedMocks;
    return [];
  }
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
      const error: any = new Error(
        (Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message) ||
          "Erro ao criar evento."
      );
      error.response = { data: errorData, status: response.status };
      throw error;
    }

    return response.json();
  }

  const response = await api.post<SDCEvent>("/projects/events", data);
  return response.data;
}

export async function updateEvent(id: string, data: UpdateEventInput): Promise<SDCEvent> {
  if (typeof window !== "undefined") {
    const response = await fetch(`/api/proxy/projects/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: any = new Error(
        (Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message) ||
          "Erro ao atualizar evento."
      );
      error.response = { data: errorData, status: response.status };
      throw error;
    }

    return response.json();
  }

  const response = await api.put<SDCEvent>(`/projects/events/${id}`, data);
  return response.data;
}
