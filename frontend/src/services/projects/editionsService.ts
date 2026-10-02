import api from "../api";
import { CreateEditionInput, SDCEdition } from "sdc-admin";

export const DEFAULT_PROJECT = "SDC";

export async function fetchEditions(project: string = DEFAULT_PROJECT): Promise<SDCEdition[]> {
  const response = await api.get<SDCEdition[]>("/projects/editions", {
    params: { project },
  });

  return response.data;
}

export async function fetchLatestEdition(project: string = DEFAULT_PROJECT): Promise<SDCEdition> {
  const response = await api.get<SDCEdition>("/projects/editions/latest", {
    params: { project },
  });

  return response.data;
}

export async function createEdition(data: CreateEditionInput): Promise<SDCEdition> {
  // No navegador (painel admin), usamos o /api/proxy para enviar o cookie HttpOnly de autenticação
  if (typeof window !== "undefined") {
    const response = await fetch("/api/proxy/projects/editions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: any = new Error(errorData.message || "Erro ao criar edição.");
      error.response = { data: errorData, status: response.status };
      throw error;
    }

    return response.json();
  }

  const response = await api.post<SDCEdition>("/projects/editions", data);
  return response.data;
}
