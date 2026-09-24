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
  const response = await api.post<SDCEdition>("/projects/editions", data);

  return response.data;
}
