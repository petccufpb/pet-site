import { SDCEdition, SDCEvent, SDCSpeaker } from "sdc-admin";

/**
 * ID fixo de palestrante da coleção Postman para testes do formulário de eventos,
 * conforme Seção 4 da Matriz de Dependências do Plano de Projeto:
 * "Dev 3 depende de Dev 2 (Palestrantes): speakerId para registrar evento ->
 * Mecanismo de Desbloqueio (MOCK): Usar ID fixo da coleção Postman (9e2e2d4b-d044...)"
 */
export const MOCK_SPEAKER_ID = "9e2e2d4b-d044-46b7-8977-1d2a2a0c4f82";

/**
 * Título e ID padrão do projeto SDC (projectId) para criação e consulta de edições.
 */
export const DEFAULT_PROJECT_TITLE = "SDC";
export const DEFAULT_SDC_PROJECT_ID = "00000000-0000-0000-0000-000000000001";

/**
 * Mock de palestrante para exibição de fallback visual em selects/previews.
 */
export const MOCK_SPEAKER: SDCSpeaker = {
  id: MOCK_SPEAKER_ID,
  name: "Palestrante Convidado (Postman Mock)",
  about: "Palestrante de testes provisório para desbloqueio da sprint.",
  photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
};

/**
 * Mocks de edições para desenvolvimento e testes locais isolados.
 */
export const MOCK_EDITIONS: SDCEdition[] = [
  {
    id: "mock-edition-12",
    name: "Semana de Computação 2024",
    number: 12,
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    logoUrl: null,
    minimumAttendance: 75,
    projectId: DEFAULT_SDC_PROJECT_ID,
    events: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-edition-11",
    name: "Semana de Computação 2023",
    number: 11,
    date: "2023-11-20T09:00:00.000Z",
    logoUrl: null,
    minimumAttendance: 75,
    projectId: DEFAULT_SDC_PROJECT_ID,
    events: [],
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-11-25T00:00:00.000Z",
  },
];

/**
 * Mocks de eventos para testes da listagem e grade de horários.
 */
export const MOCK_EVENTS: SDCEvent[] = [
  {
    id: "mock-event-1",
    name: "Introdução ao Desenvolvimento com Next.js",
    about: "Aprenda a construir aplicações modernas com React Server Components.",
    type: "palestra",
    location: "Auditório do CI",
    startTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    capacity: 100,
    extraCapacity: 10,
    onSite: true,
    allowMultiple: false,
    speakerId: MOCK_SPEAKER_ID,
    editionId: "mock-edition-12",
    speaker: MOCK_SPEAKER,
  },
];
