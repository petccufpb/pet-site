"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  HiX,
  HiOutlineExclamationCircle,
  HiOutlineCheck,
  HiOutlinePencilAlt,
  HiOutlineClock,
  HiOutlineUser,
  HiPlus,
} from "react-icons/hi";
import { SDCEvent, SDCSpeaker, UpdateEventInput } from "sdc-admin";
import { updateEvent } from "@services/projects/eventsService";
import { fetchSpeakers } from "@services/projects/speakersService";
import { MOCK_SPEAKER_ID } from "@services/mocks/sdcMocks";
import { CreateSpeakerModal } from "../CreateSpeakerModal";

import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  Form,
  FormGroup,
  Row,
  Label,
  Input,
  Select,
  SelectActionRow,
  AddSpeakerButton,
  InputHint,
  ErrorAlert,
  ModalFooter,
  SubmitButton,
  CancelButton,
} from "./styles";

interface EditEventModalProps {
  isOpen: boolean;
  event: SDCEvent | null;
  onClose: () => void;
  onSuccess: (updatedEvent: SDCEvent) => void;
  editionDate?: string;
}

export function EditEventModal({
  isOpen,
  event,
  onClose,
  onSuccess,
  editionDate,
}: EditEventModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [speakers, setSpeakers] = useState<SDCSpeaker[]>([]);
  const [isLoadingSpeakers, setIsLoadingSpeakers] = useState<boolean>(false);

  // Estados dos campos solicitados
  const [name, setName] = useState<string>("");
  const [speakerId, setSpeakerId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [extraCapacity, setExtraCapacity] = useState<string>("0");
  const [location, setLocation] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreateSpeakerOpen, setIsCreateSpeakerOpen] = useState<boolean>(false);

  const handleSpeakerCreated = (newSpeaker: SDCSpeaker) => {
    setSpeakers((prev) => [newSpeaker, ...prev.filter((s) => s.id !== newSpeaker.id)]);
    setSpeakerId(newSpeaker.id);
  };

  // Carregar palestrantes
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsLoadingSpeakers(true);

    fetchSpeakers()
      .then((data: SDCSpeaker[]) => {
        if (!isMounted) return;
        setSpeakers(data);
      })
      .catch(() => {
        if (!isMounted) return;
      })
      .finally(() => {
        if (isMounted) setIsLoadingSpeakers(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Preencher campos quando o evento for selecionado
  useEffect(() => {
    if (isOpen && event) {
      setName(event.name || "");
      setSpeakerId(event.speakerId || MOCK_SPEAKER_ID);
      setCapacity(event.capacity ? String(event.capacity) : "");
      setExtraCapacity(event.extraCapacity ? String(event.extraCapacity) : "0");
      setLocation(event.location || "");
      setError(null);

      try {
        const start = new Date(event.startTime);
        const end = new Date(event.endTime);

        if (!isNaN(start.getTime())) {
          setDate(start.toISOString().split("T")[0]);
          setStartTime(
            start.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
          );
        }

        if (!isNaN(end.getTime())) {
          setEndTime(
            end.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
          );
        }
      } catch {
        setDate("");
        setStartTime("09:00");
        setEndTime("10:30");
      }
    }
  }, [isOpen, event]);

  // Fechar com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  // Travar scroll do body enquanto o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleContainerWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      formRef.current.scrollTop += e.deltaY;
    }
  };

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("O nome da atividade é obrigatório.");
      return;
    }

    if (!speakerId) {
      setError("Selecione um palestrante responsável.");
      return;
    }

    if (!date) {
      setError("A data da atividade é obrigatória.");
      return;
    }

    if (!startTime || !endTime) {
      setError("Os horários de início e término são obrigatórios.");
      return;
    }

    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      setError("Data ou horários informados são inválidos.");
      return;
    }

    if (endDateTime.getTime() <= startDateTime.getTime()) {
      setError("O horário de término deve ser posterior ao horário de início da atividade.");
      return;
    }

    // Validação de data da edição
    if (editionDate) {
      const edDate = new Date(editionDate);
      const startDay = new Date(startDateTime).setHours(0, 0, 0, 0);
      const editionDay = new Date(edDate).setHours(0, 0, 0, 0);

      if (startDay < editionDay) {
        setError(
          `A atividade não pode iniciar antes da data oficial de início da edição (${edDate.toLocaleDateString("pt-BR")}).`
        );
        return;
      }
    }

    if (event.onSite && !location.trim()) {
      setError("A localização física é obrigatória para eventos presenciais.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload: UpdateEventInput = {
        name: name.trim(),
        speakerId,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        capacity: capacity ? Math.max(1, Number(capacity)) : undefined,
        extraCapacity: extraCapacity ? Math.max(0, Number(extraCapacity)) : 0,
        location: location.trim() || undefined,
      };

      const updated = await updateEvent(event.id, payload);
      onSuccess(updated);
      onClose();
    } catch (err: any) {
      console.error("Erro ao atualizar evento:", err);

      if (err.response?.status === 401) {
        setError("Sessão expirada. Acesse /admin/login para autenticar-se.");
        return;
      }

      if (err.response?.status === 403) {
        setError("Conflito detectado: Um evento já existe no mesmo local e horário para esta edição.");
        return;
      }

      const backendMessage =
        err.response?.data?.message ||
        (Array.isArray(err.response?.data?.message)
          ? err.response.data.message.join(", ")
          : null);

      setError(
        backendMessage ||
          err.message ||
          "Não foi possível salvar as alterações da atividade. Verifique os campos e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalOverlay
      data-lenis-prevent="true"
      onClick={() => !isLoading && onClose()}
      onWheel={(e) => {
        if (e.target === e.currentTarget && formRef.current) {
          formRef.current.scrollTop += e.deltaY;
        }
      }}
    >
      <ModalContainer
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleContainerWheel}
      >
        <ModalHeader>
          <div>
            <h2>
              <HiOutlinePencilAlt color="#73E5E2" />
              Editar Atividade
            </h2>
            <p>Altere o nome, horários, palestrante ou limite de vagas da atividade.</p>
          </div>
          <CloseButton onClick={() => !isLoading && onClose()} aria-label="Fechar modal">
            <HiX size={20} />
          </CloseButton>
        </ModalHeader>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {error && (
            <ErrorAlert>
              <HiOutlineExclamationCircle size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>{error}</div>
            </ErrorAlert>
          )}

          {/* 1. Nome da Atividade */}
          <FormGroup>
            <Label htmlFor="edit-event-name">
              Nome da Atividade <span className="required">*</span>
            </Label>
            <Input
              id="edit-event-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Introdução ao Desenvolvimento com Rust"
            />
          </FormGroup>

          {/* 2. Horários e Data */}
          <Row $columns="1.2fr 1fr 1fr">
            <FormGroup>
              <Label htmlFor="edit-event-date">
                Data do Evento <span className="required">*</span>
              </Label>
              <Input
                id="edit-event-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="edit-event-start">
                Início <span className="required">*</span>
              </Label>
              <Input
                id="edit-event-start"
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="edit-event-end">
                Término <span className="required">*</span>
              </Label>
              <Input
                id="edit-event-end"
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormGroup>
          </Row>

          {/* 3. Palestrante Responsável */}
          <FormGroup>
            <Label htmlFor="edit-event-speaker">
              <span>
                Palestrante Responsável <span className="required">*</span>
              </span>
              {isLoadingSpeakers && <span className="helper">Carregando...</span>}
            </Label>
            <SelectActionRow>
              <Select
                id="edit-event-speaker"
                required
                value={speakerId}
                onChange={(e) => setSpeakerId(e.target.value)}
              >
                {speakers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} {s.id === MOCK_SPEAKER_ID ? "(Mock Postman Sprint)" : ""}
                  </option>
                ))}
                {!speakers.some((s) => s.id === MOCK_SPEAKER_ID) && (
                  <option value={MOCK_SPEAKER_ID}>
                    Palestrante Convidado (Mock Postman Desbloqueio: 9e2e2d4b-d044...)
                  </option>
                )}
              </Select>
              <AddSpeakerButton
                type="button"
                onClick={() => setIsCreateSpeakerOpen(true)}
                title="Cadastrar novo palestrante"
              >
                <HiPlus size={16} />
                <span>Novo</span>
              </AddSpeakerButton>
            </SelectActionRow>
            <InputHint>Selecione o palestrante ou instrutor encarregado.</InputHint>
          </FormGroup>

          {/* 4. Número de Vagas e Fila de Espera */}
          <Row>
            <FormGroup>
              <Label htmlFor="edit-event-capacity">
                Número de Vagas
                <span className="helper">Opcional</span>
              </Label>
              <Input
                id="edit-event-capacity"
                type="number"
                min="1"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Ex: 50 (deixe vazio para vagas livres)"
              />
              <InputHint>Capacidade máxima de alunos permitidos.</InputHint>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="edit-event-extra">
                Vagas Extras / Espera
                <span className="helper">Opcional</span>
              </Label>
              <Input
                id="edit-event-extra"
                type="number"
                min="0"
                value={extraCapacity}
                onChange={(e) => setExtraCapacity(e.target.value)}
                placeholder="Ex: 10"
              />
              <InputHint>Margem excedente para lista de espera.</InputHint>
            </FormGroup>
          </Row>

          {/* Localização */}
          <FormGroup>
            <Label htmlFor="edit-event-location">
              {event.onSite ? "Local / Sala" : "Link / Plataforma"}
              {event.onSite && <span className="required">*</span>}
            </Label>
            <Input
              id="edit-event-location"
              type="text"
              required={event.onSite}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={event.onSite ? "Ex: Auditório do CI, Lab 2" : "Ex: Google Meet"}
            />
          </FormGroup>

          <ModalFooter>
            <CancelButton type="button" onClick={onClose} disabled={isLoading}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit" disabled={isLoading} $loading={isLoading}>
              {isLoading ? (
                "Salvando..."
              ) : (
                <>
                  <HiOutlineCheck size={18} />
                  Salvar Alterações
                </>
              )}
            </SubmitButton>
          </ModalFooter>
        </Form>
      </ModalContainer>

      <CreateSpeakerModal
        isOpen={isCreateSpeakerOpen}
        onClose={() => setIsCreateSpeakerOpen(false)}
        onSuccess={handleSpeakerCreated}
      />
    </ModalOverlay>
  );
}

export default EditEventModal;
