import api from "../api";
import { CreateEventInput, SDCEvent } from "sdc-admin";

export async function fetchEvents(editionId: string): Promise<SDCEvent[]> {
  const response = await api.get<SDCEvent[]>("/projects/events", {
    params: { editionId },
  });

  return response.data;
}

export async function createEvent(data: CreateEventInput): Promise<SDCEvent> {
  const response = await api.post<SDCEvent>("/projects/events", data);

  return response.data;
}
