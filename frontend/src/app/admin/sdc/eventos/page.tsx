"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { SDCEvent, SDCSpeaker } from "sdc-admin";
import { useSDC } from "../../../../contexts/SDCContext";
import { fetchEvents } from "@services/projects/eventsService";
import { fetchSpeakers } from "@services/projects/speakersService";
import { EventFormModal } from "./components/EventFormModal";
import { EditEventModal } from "./components/EditEventModal";
import { EventCard } from "./components/EventCard";
import { EventFilters } from "./components/EventFilters";

import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineRefresh,
  HiPlus,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
} from "react-icons/hi";

import {
  Container,
  Header,
  TitleArea,
  ActionGroup,
  Button,
  EditionSelectorCard,
  EditionInfo,
  EditionDropdown,
  DaySection,
  DayHeading,
  EventsGrid,
  EmptyState,
  LoadingContainer,
  SuccessToast,
} from "./styles";

function formatDayHeading(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Data a definir";

    const formatted = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    }).format(date);

    // Capitalizar primeira letra do dia da semana
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  } catch {
    return "Data a definir";
  }
}

export default function SdcEventosPage() {
  const { currentEdition, editions, isLoading: isEditionLoading, selectEdition } = useSDC();

  const [events, setEvents] = useState<SDCEvent[]>([]);
  const [speakersMap, setSpeakersMap] = useState<Map<string, SDCSpeaker>>(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [eventToEdit, setEventToEdit] = useState<SDCEvent | null>(null);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedWeekday, setSelectedWeekday] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Carregar eventos da edição e lista de palestrantes
  const loadData = useCallback(async () => {
    if (!currentEdition?.id) {
      setEvents([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [eventsList, speakersList] = await Promise.all([
        fetchEvents(currentEdition.id),
        fetchSpeakers(),
      ]);

      const map = new Map<string, SDCSpeaker>();
      speakersList.forEach((s) => map.set(s.id, s));
      setSpeakersMap(map);

      setEvents(eventsList);
    } catch (err: any) {
      console.error("Erro ao carregar cronograma de eventos:", err);
      setError(err?.message || "Não foi possível carregar os eventos da edição.");
    } finally {
      setIsLoading(false);
    }
  }, [currentEdition?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Exibir toast temporário
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Contagens por tipo de evento
  const counts = useMemo(() => {
    return {
      all: events.length,
      palestra: events.filter((e) => e.type === "palestra").length,
      minicurso: events.filter((e) => e.type === "minicurso").length,
      main: events.filter((e) => e.type === "main" || (!e.type && e.type !== "palestra" && e.type !== "minicurso")).length,
    };
  }, [events]);

  // Contagens por dia da semana (0=Domingo, 1=Segunda, ..., 6=Sábado)
  const weekdayCounts = useMemo(() => {
    const countsMap: { [key: number]: number } = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    events.forEach((e) => {
      try {
        const d = new Date(e.startTime);
        const day = d.getDay();
        countsMap[day] = (countsMap[day] || 0) + 1;
      } catch {}
    });
    return countsMap;
  }, [events]);

  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Filtro por tipo
    if (selectedType !== "all") {
      if (selectedType === "main") {
        result = result.filter((e) => e.type === "main" || (!e.type && e.type !== "palestra" && e.type !== "minicurso"));
      } else {
        result = result.filter((e) => e.type === selectedType);
      }
    }

    // Filtro por dia da semana (0=Domingo, 1=Segunda, etc.)
    if (selectedWeekday !== "all") {
      const targetDay = Number(selectedWeekday);
      result = result.filter((e) => {
        try {
          const d = new Date(e.startTime);
          return d.getDay() === targetDay;
        } catch {
          return false;
        }
      });
    }

    // Busca textual por título, palestrante ou sala
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((e) => {
        const titleMatch = e.name.toLowerCase().includes(q);
        const locationMatch = e.location?.toLowerCase().includes(q) ?? false;
        const speaker = e.speaker || (e.speakerId ? speakersMap.get(e.speakerId) : null);
        const speakerMatch = speaker?.name.toLowerCase().includes(q) ?? false;
        return titleMatch || locationMatch || speakerMatch;
      });
    }

    // Ordenar cronologicamente
    result.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    return result;
  }, [events, selectedType, selectedWeekday, searchQuery, speakersMap]);

  // Agrupamento por dia do evento
  const eventsByDay = useMemo(() => {
    const groups: { [key: string]: { label: string; items: SDCEvent[] } } = {};

    filteredEvents.forEach((ev) => {
      let dayKey = "data-indefinida";
      try {
        const d = new Date(ev.startTime);
        dayKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      } catch {
        dayKey = "data-indefinida";
      }

      if (!groups[dayKey]) {
        groups[dayKey] = {
          label: formatDayHeading(ev.startTime),
          items: [],
        };
      }
      groups[dayKey].items.push(ev);
    });

    return Object.entries(groups).map(([dayKey, data]) => ({
      dayKey,
      label: data.label,
      items: data.items,
    }));
  }, [filteredEvents]);

  return (
    <Container>
      <Header>
        <TitleArea>
          <h1>
            <HiOutlineClock color="#73E5E2" />
            Cronograma de Atividades
          </h1>
          <p>
            Gestão do cronograma de palestras, minicursos e horários da Semana de Computação.
            Associe palestrantes, salas e controle a capacidade de cada atividade.
          </p>
        </TitleArea>

        <ActionGroup>
          <Button variant="outline" onClick={() => loadData()} disabled={isLoading}>
            <HiOutlineRefresh size={16} />
            Recarregar
          </Button>

          <Button primary onClick={() => setIsModalOpen(true)}>
            <HiPlus size={18} />
            Nova Atividade
          </Button>
        </ActionGroup>
      </Header>

      {/* Card da Edição Ativa */}
      {currentEdition ? (
        <EditionSelectorCard>
          <EditionInfo>
            <span className="badge">SDC #{currentEdition.number}</span>
            <div className="details">
              <strong>{currentEdition.name || `Semana de Computação #${currentEdition.number}`}</strong>
              <span>
                {currentEdition.date
                  ? `Início oficial da edição: ${new Date(currentEdition.date).toLocaleDateString("pt-BR")}`
                  : "Edição Ativa"}
                {" • "}
                {events.length} {events.length === 1 ? "atividade agendada" : "atividades agendadas"}
              </span>
            </div>
          </EditionInfo>

          {editions.length > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.6)" }}>
                Alternar Edição:
              </span>
              <EditionDropdown
                value={currentEdition.id}
                onChange={(e) => selectEdition(e.target.value)}
              >
                {editions.map((ed) => (
                  <option key={ed.id} value={ed.id}>
                    SDC #{ed.number} {ed.name ? `- ${ed.name}` : ""}
                  </option>
                ))}
              </EditionDropdown>
            </div>
          )}
        </EditionSelectorCard>
      ) : !isEditionLoading ? (
        <EmptyState style={{ marginBottom: "2rem" }}>
          <h3>Nenhuma edição ativa selecionada</h3>
          <p>
            Para agendar e visualizar palestras e minicursos, selecione ou cadastre uma edição da SDC.
          </p>
          <Link href="/admin/sdc/edicoes" style={{ textDecoration: "none" }}>
            <Button primary>
              Ir para Edições da SDC
              <HiOutlineArrowRight size={16} />
            </Button>
          </Link>
        </EmptyState>
      ) : null}

      {/* Barra de Filtros e Busca */}
      <EventFilters
        selectedType={selectedType}
        onSelectType={setSelectedType}
        selectedWeekday={selectedWeekday}
        onSelectWeekday={setSelectedWeekday}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        counts={counts}
        weekdayCounts={weekdayCounts}
      />

      {/* Conteúdo Principal */}
      {isLoading || isEditionLoading ? (
        <LoadingContainer>
          <HiOutlineRefresh size={32} className="animate-spin" />
          <p>Carregando cronograma de atividades...</p>
        </LoadingContainer>
      ) : error ? (
        <EmptyState>
          <h3>Erro ao carregar o cronograma</h3>
          <p>{error}</p>
          <Button onClick={() => loadData()}>Tentar novamente</Button>
        </EmptyState>
      ) : filteredEvents.length === 0 ? (
        <EmptyState>
          <h3>
            {searchQuery || selectedType !== "all" || selectedWeekday !== "all"
              ? "Nenhuma atividade encontrada para os filtros aplicados"
              : "Nenhuma atividade agendada nesta edição"}
          </h3>
          <p>
            {searchQuery || selectedType !== "all" || selectedWeekday !== "all"
              ? "Tente selecionar outro dia da semana, tipo de atividade ou limpar a busca."
              : "Comece montando a grade da SDC: cadastre a primeira palestra ou minicurso."}
          </p>
          {!searchQuery && selectedType === "all" && selectedWeekday === "all" && (
            <Button primary onClick={() => setIsModalOpen(true)}>
              <HiPlus size={18} />
              Agendar Primeira Atividade
            </Button>
          )}
        </EmptyState>
      ) : (
        eventsByDay.map(({ dayKey, label, items }) => (
          <DaySection key={dayKey}>
            <DayHeading>
              <h2>
                <HiOutlineCalendar />
                {label}
              </h2>
              <span className="count">
                {items.length} {items.length === 1 ? "atividade" : "atividades"}
              </span>
            </DayHeading>

            <EventsGrid>
              {items.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  speaker={event.speakerId ? speakersMap.get(event.speakerId) : undefined}
                  onEdit={(ev) => setEventToEdit(ev)}
                />
              ))}
            </EventsGrid>
          </DaySection>
        ))
      )}

      {/* Modal de Cadastro */}
      <EventFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(newEvent) => {
          showToast(`Atividade "${newEvent.name}" agendada com sucesso!`);
          loadData();
        }}
        currentEdition={currentEdition}
        existingEvents={events}
      />

      {/* Modal de Edição */}
      <EditEventModal
        isOpen={!!eventToEdit}
        event={eventToEdit}
        onClose={() => setEventToEdit(null)}
        onSuccess={(updatedEvent) => {
          showToast(`Atividade "${updatedEvent.name}" atualizada com sucesso!`);
          loadData();
        }}
        editionDate={currentEdition?.date}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <SuccessToast>
          <HiOutlineCheckCircle size={20} color="#5cf396" />
          <span>{toastMessage}</span>
        </SuccessToast>
      )}
    </Container>
  );
}
