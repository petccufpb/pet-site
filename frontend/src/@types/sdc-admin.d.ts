export type SDCEventType = "main" | "minicurso" | "palestra" | string;

export interface SDCSpeaker {
  id: string;
  name: string;
  about?: string | null;
  photoUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SDCEvent {
  id: string;
  name: string;
  about?: string | null;
  type?: SDCEventType | null;
  capacity?: number | null;
  extraCapacity: number;
  onSite: boolean;
  externalSignup?: string | null;
  location?: string | null;
  startTime: string;
  endTime: string;
  allowMultiple: boolean;
  speakerId: string;
  editionId: string;
  speaker?: SDCSpeaker;
  createdAt?: string;
  updatedAt?: string;
}

export interface SDCEdition {
  id: string;
  name?: string | null;
  number: number;
  date: string;
  logoUrl?: string | null;
  minimumAttendance: number;
  projectId: string;
  events?: SDCEvent[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEditionInput {
  number: number;
  name?: string;
  date: string; // ISO 8601
  minimumAttendance?: number;
  logoUrl?: string;
  projectId: string;
}

export interface CreateEventInput {
  name: string;
  editionId: string;
  speakerId: string;
  startTime: string; // ISO 8601
  endTime: string; // ISO 8601
  about?: string | null;
  type?: SDCEventType | null;
  location?: string | null;
  capacity?: number;
  extraCapacity?: number;
  onSite?: boolean;
  allowMultiple?: boolean;
  externalSignup?: string;
}

declare module "sdc-admin" {
  export type {
    SDCEventType,
    SDCSpeaker,
    SDCEvent,
    SDCEdition,
    CreateEditionInput,
    CreateEventInput,
  };
}
