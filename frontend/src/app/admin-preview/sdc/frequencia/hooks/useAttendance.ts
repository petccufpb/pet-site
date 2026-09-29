import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import api from "@api";

import { Attendance, CheckInResult, Participant } from "../types";
import { getApiError } from "../utils";

const POLLING_INTERVAL = 5000;

export function useAttendance(eventId?: string) {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const pendingIds = useRef(new Set<string>());
  // Evita que respostas de um evento anterior sobrescrevam a lista do evento atual
  const currentEventId = useRef(eventId);
  // Com a API lenta, um polling não dispara outro por cima (respostas fora de ordem fariam a lista piscar)
  const inFlight = useRef(false);

  const refresh = useCallback(async () => {
    if (!eventId || inFlight.current) {
      return;
    }

    inFlight.current = true;
    try {
      const { data } = await api.get<{ attendances: Attendance[] }>("/projects/attendance", {
        // _t fura o cache do Redis e da edge
        params: { eventId, _t: Date.now() },
      });

      if (currentEventId.current !== eventId) {
        return;
      }

      // Mantém as linhas locais (pendentes ou recém-confirmadas) que um polling iniciado antes do POST ainda não traz
      setAttendances(previous => [
        ...previous.filter(
          attendance =>
            attendance.local && !data.attendances.some(a => a.participantId === attendance.participantId),
        ),
        ...data.attendances,
      ]);
    } catch {
      // O polling tenta de novo no próximo ciclo
    } finally {
      inFlight.current = false;
    }
  }, [eventId]);

  useEffect(() => {
    currentEventId.current = eventId;
    pendingIds.current.clear();
    inFlight.current = false;
    setAttendances([]);

    if (!eventId) {
      return;
    }

    setLoading(true);
    refresh().finally(() => {
      if (currentEventId.current === eventId) {
        setLoading(false);
      }
    });

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    }, POLLING_INTERVAL);

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [eventId, refresh]);

  const isPresent = useCallback(
    (participantId: string) =>
      pendingIds.current.has(participantId) ||
      attendances.some(attendance => attendance.participantId === participantId),
    [attendances],
  );

  const checkIn = useCallback(
    async (participant: Participant): Promise<CheckInResult> => {
      // Closure de um evento anterior (toast ou modal abertos antes da troca): a linha otimista cairia na lista errada
      if (!eventId || currentEventId.current !== eventId) {
        return "error";
      }

      if (isPresent(participant.id)) {
        toast.info(`${participant.name} já está presente`);

        return "duplicate";
      }

      const tempId = `temp-${eventId}-${participant.id}`;
      pendingIds.current.add(participant.id);
      setAttendances(previous => [
        {
          id: tempId,
          participantId: participant.id,
          eventId,
          createdAt: new Date().toISOString(),
          participant,
          local: true,
          pending: true,
        },
        ...previous,
      ]);

      // Se o operador trocou de evento no meio da requisição, a lista atual é de outro evento
      const stillCurrent = () => currentEventId.current === eventId;

      try {
        const { data } = await api.post<Omit<Attendance, "participant">>("/projects/attendance", {
          eventId,
          manual: true,
          participantId: participant.id,
        });

        if (stillCurrent()) {
          setAttendances(previous =>
            previous.map(attendance =>
              attendance.id === tempId ? { ...data, local: true, participant } : attendance,
            ),
          );
        }
        toast.success(`Presença marcada: ${participant.name}`);

        return "created";
      } catch (err) {
        if (stillCurrent()) {
          setAttendances(previous => previous.filter(attendance => attendance.id !== tempId));
        }
        const { message, status } = getApiError(err);

        if (status === 409) {
          toast.info(`${participant.name} já estava presente`);
          refresh();

          return "duplicate";
        }
        if (status === 403) {
          return "needs-enrollment";
        }

        toast.error(message || "Falha ao marcar presença");

        return "error";
      } finally {
        pendingIds.current.delete(participant.id);
      }
    },
    [eventId, isPresent, refresh],
  );

  return { attendances, checkIn, isPresent, loading, refresh };
}
