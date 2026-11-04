import type { Member } from "backend";

import { adminRequest } from "./adminApi";

export type MemberType = "decano" | "founder" | "tutor";

export interface MemberContactPayload {
  name: string;
  snsId: string;
}

export interface MemberPayload {
  name: string;
  about?: string | null;
  photoUrl?: string | null;
  type?: MemberType | null;
  isActive?: boolean;
  contactInfo?: MemberContactPayload[];
}

export async function fetchMembers(signal?: AbortSignal): Promise<Member[]> {
  return adminRequest<Member[]>("/team/members", { signal });
}

export async function fetchTutors(signal?: AbortSignal): Promise<Member[]> {
  return adminRequest<Member[]>("/team/tutors", { signal });
}

export async function createMember(payload: MemberPayload): Promise<Member> {
  return adminRequest<Member>("/team/members", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateMember(id: string, payload: MemberPayload): Promise<Member> {
  return adminRequest<Member>(`/team/members/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function memberTypeLabel(type?: string | null): string {
  switch (type) {
    case "decano":
      return "Decano";
    case "founder":
      return "Fundador";
    case "tutor":
      return "Tutor";
    default:
      return "Membro";
  }
}
