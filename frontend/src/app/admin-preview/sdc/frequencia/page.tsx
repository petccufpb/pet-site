"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "@api";

import { CheckInTable } from "./components/CheckInTable";
import { EventSelector } from "./components/EventSelector";
import { NewParticipantModal } from "./components/NewParticipantModal";
import { ParticipantSearch } from "./components/ParticipantSearch";
import { useActiveEdition } from "./hooks/useActiveEdition";
import { useAttendance } from "./hooks/useAttendance";
import { Container, Controls, EnrollToast, Header, Shortcuts } from "./styles";
import { Participant, SdcEvent } from "./types";
import { getApiError } from "./utils";

const SELECTED_EVENT_KEY = "admin:sdc:frequencia:eventId";

/** Evento acontecendo agora, senão o próximo, senão o último */
function pickDefaultEvent(events: SdcEvent[]): SdcEvent | undefined {
  const now = Date.now();

  return (
    events.find(
      event => new Date(event.startTime).getTime() <= now && now <= new Date(event.endTime).getTime(),
    ) ??
    events.find(event => new Date(event.startTime).getTime() > now) ??
    events[events.length - 1]
  );
}

export default function AdminFrequencia() {
  const { edition, error } = useActiveEdition();
  const [eventId, setEventId] = useState<string>();
  const [enrolled, setEnrolled] = useState<number>();
  const [modalOpen, setModalOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const queryRef = useRef("");

  const events = useMemo(
    () =>
      [...(edition?.events ?? [])].sort(
        (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      ),
    [edition],
  );
  const event = events.find(({ id }) => id === eventId);

  const { attendances, checkIn, isPresent, loading } = useAttendance(eventId);

  useEffect(() => {
    if (!events.length || eventId) {
      return;
    }

    let saved: string | null = null;
    try {
      saved = localStorage.getItem(SELECTED_EVENT_KEY);
    } catch {}

    setEventId(events.find(({ id }) => id === saved)?.id ?? pickDefaultEvent(events)?.id);
  }, [eventId, events]);

  function selectEvent(id: string) {
    // Toasts de "Inscrever e marcar" se referem ao evento anterior
    toast.dismiss();
    setEventId(id);
    try {
      localStorage.setItem(SELECTED_EVENT_KEY, id);
    } catch {}
    searchRef.current?.focus();
  }

  const refreshEnrolled = useCallback(async () => {
    if (!edition || !event) {
      setEnrolled(undefined);

      return;
    }

    try {
      // Minicursos têm inscrição própria; os demais eventos contam os inscritos na edição
      const { data } = await api.get<{ total: number }>("/projects/participants", {
        params: {
          ...(event.type === "minicurso" ? { eventId: event.id } : { editionId: edition.id }),
          _t: Date.now(),
        },
      });
      setEnrolled(data.total);
    } catch {
      setEnrolled(undefined);
    }
  }, [edition, event]);

  useEffect(() => {
    refreshEnrolled();
  }, [refreshEnrolled]);

  const enrollAndCheckIn = useCallback(
    async (participant: Participant) => {
      try {
        // manual: o minicurso já começou, então o prazo e as vagas da inscrição pública não se aplicam
        await api.post("/projects/participations", { eventId, manual: true, participantId: participant.id });
        refreshEnrolled();
        await checkIn(participant);
      } catch (err) {
        toast.error(getApiError(err).message || "Falha ao inscrever no minicurso");
      }
    },
    [checkIn, eventId, refreshEnrolled],
  );

  const handleCheckIn = useCallback(
    async (participant: Participant) => {
      const result = await checkIn(participant);

      if (result === "needs-enrollment") {
        toast.warn(
          ({ closeToast }) => (
            <EnrollToast>
              <p>{participant.name} não está inscrito(a) neste minicurso.</p>
              <button
                type="button"
                onClick={() => {
                  closeToast?.();
                  enrollAndCheckIn(participant);
                }}
              >
                Inscrever e marcar
              </button>
            </EnrollToast>
          ),
          { autoClose: false, closeOnClick: false },
        );
      }

      searchRef.current?.focus();
    },
    [checkIn, enrollAndCheckIn],
  );

  const handleCreated = useCallback(
    (participant: Participant) => {
      refreshEnrolled();
      handleCheckIn(participant);
    },
    [handleCheckIn, refreshEnrolled],
  );

  const handleQueryChange = useCallback((query: string) => {
    queryRef.current = query;
  }, []);

  // Atalhos globais
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Com o modal aberto, os atalhos levariam o foco para a busca escondida atrás dele
      if (modalOpen) {
        return;
      }

      const target = e.target as HTMLElement;
      const typing = ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName);

      if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      } else if (e.altKey && e.code === "KeyN" && edition && eventId) {
        e.preventDefault();
        setModalOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [edition, eventId, modalOpen]);

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} newestOnTop theme="dark" />

      <Header>
        <h1>Frequência{edition && ` · SDC ${edition.number}`}</h1>
        <p>Check-in manual por evento</p>
      </Header>

      {error && <p>Não foi possível carregar a edição ativa da SDC.</p>}

      <Controls>
        <EventSelector events={events} value={eventId} onChange={selectEvent} />
        <ParticipantSearch
          ref={searchRef}
          editionId={event?.type === "minicurso" ? undefined : edition?.id}
          eventId={eventId}
          isPresent={isPresent}
          onCheckIn={handleCheckIn}
          onQueryChange={handleQueryChange}
        />
        <button type="button" disabled={!edition || !eventId} onClick={() => setModalOpen(true)}>
          Novo inscrito
        </button>
      </Controls>

      <Shortcuts aria-label="Atalhos de teclado">
        <li>
          <kbd>/</kbd> ou <kbd>Ctrl</kbd>+<kbd>K</kbd> buscar
        </li>
        <li>
          <kbd>↑</kbd> <kbd>↓</kbd> navegar
        </li>
        <li>
          <kbd>Enter</kbd> marcar presença
        </li>
        <li>
          <kbd>Alt</kbd>+<kbd>N</kbd> novo inscrito
        </li>
        <li>
          <kbd>Esc</kbd> limpar/fechar
        </li>
      </Shortcuts>

      <CheckInTable attendances={attendances} enrolled={enrolled} loading={loading} />

      {modalOpen && edition && (
        <NewParticipantModal
          editionId={edition.id}
          initialQuery={queryRef.current}
          onClose={() => {
            setModalOpen(false);
            searchRef.current?.focus();
          }}
          onCreated={handleCreated}
        />
      )}
    </Container>
  );
}
