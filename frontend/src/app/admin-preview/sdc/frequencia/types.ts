export type EventType = "main" | "minicurso" | "palestra";

export interface SdcEvent {
  id: string;
  name: string;
  type: EventType | null;
  location: string | null;
  startTime: string;
  endTime: string;
}

export interface SdcEdition {
  id: string;
  number: number;
  events: SdcEvent[];
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  matricula: string | null;
  course: string;
  /** Presente apenas nos resultados da busca, quando um eventId é enviado */
  attended?: boolean;
}

export interface Attendance {
  id: string;
  participantId: string;
  eventId: string;
  createdAt: string;
  participant: Participant;
  /** Check-in otimista aguardando resposta da API */
  pending?: boolean;
  /** Criada nesta aba; sobrevive a um polling que ainda não a conhece */
  local?: boolean;
}

export type CheckInResult = "created" | "duplicate" | "needs-enrollment" | "error";
