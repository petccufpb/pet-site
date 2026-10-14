"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  HiX,
  HiOutlineExclamationCircle,
  HiOutlineCheck,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiOutlineSparkles,
  HiPlus,
} from "react-icons/hi";
import { SDCEdition, SDCEvent, SDCSpeaker, SDCEventType, CreateEventInput } from "sdc-admin";
import { createEvent } from "@services/projects/eventsService";
import { fetchSpeakers } from "@services/projects/speakersService";
import { MOCK_SPEAKER_ID } from "@services/mocks/sdcMocks";
import { CreateSpeakerModal } from "../CreateSpeakerModal";

import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  Form,
  EditionBanner,
  FormGroup,
  Row,
  Label,
  Input,
  Select,
  SelectActionRow,
  AddSpeakerButton,
  TextArea,
  TypeSelector,
  TypeButton,
  ToggleContainer,
  ToggleButton,
  InputHint,
  ErrorAlert,
  WarningAlert,
  ModalFooter,
  SubmitButton,
  CancelButton,
} from "./styles";

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newEvent: SDCEvent) => void;
  currentEdition: SDCEdition | null;
  existingEvents?: SDCEvent[];
}

export function EventFormModal({
  isOpen,
  onClose,
  onSuccess,
  currentEdition,
  existingEvents = [],
}: EventFormModalProps) {
  const formRef = useRef<HTMLFormElement>(null);

  // Lista de palestrantes
  const [speakers, setSpeakers] = useState<SDCSpeaker[]>([]);
  const [isLoadingSpeakers, setIsLoadingSpeakers] = useState<boolean>(false);

  // Estados do formulário
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<SDCEventType>("palestra");
  const [speakerId, setSpeakerId] = useState<string>(MOCK_SPEAKER_ID);
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("10:30");
  const [onSite, setOnSite] = useState<boolean>(true);
  const [location, setLocation] = useState<string>("Auditório do CI");
  const [capacity, setCapacity] = useState<string>("80");
  const [extraCapacity, setExtraCapacity] = useState<string>("10");
  const [allowMultiple, setAllowMultiple] = useState<boolean>(false);
  const [about, setAbout] = useState<string>("");
  const [externalSignup, setExternalSignup] = useState<string>("");

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
        if (data.length > 0) {
          setSpeakerId(data[0].id);
        } else {
          setSpeakerId(MOCK_SPEAKER_ID);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setSpeakerId(MOCK_SPEAKER_ID);
      })
      .finally(() => {
        if (isMounted) setIsLoadingSpeakers(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Resetar campos ao abrir
  useEffect(() => {
    if (isOpen) {
      setName("");
      setType("palestra");
      setOnSite(true);
      setLocation("Auditório do CI");
      setCapacity("80");
      setExtraCapacity("10");
      setAllowMultiple(false);
      setAbout("");
      setExternalSignup("");
      setError(null);

      // Data padrão: data da edição atual se existir, senão data de amanhã
      if (currentEdition?.date) {
        try {
          const editionDate = new Date(currentEdition.date);
          setDate(editionDate.toISOString().split("T")[0]);
        } catch {
          setDate(new Date().toISOString().split("T")[0]);
        }
      } else {
        setDate(new Date().toISOString().split("T")[0]);
      }

      setStartTime("09:00");
      setEndTime("10:30");
    }
  }, [isOpen, currentEdition]);

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  // Travar scroll do body enquanto o modal estiver aberto para capturar o scroll
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
    // Encaminha a rolagem da roda do mouse para o formulário caso o cursor esteja no header ou bordas
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      formRef.current.scrollTop += e.deltaY;
    }
  };

  if (!isOpen) return null;

  // Validação preventiva de conflito local
  const hasLocalRoomConflict = Boolean(
    onSite &&
      location.trim() &&
      date &&
      startTime &&
      existingEvents.some((event) => {
        if (!event.onSite || !event.location) return false;
        if (event.location.trim().toLowerCase() !== location.trim().toLowerCase()) return false;
        try {
          const evStart = new Date(event.startTime);
          const currentStart = new Date(`${date}T${startTime}:00`);
          return evStart.getTime() === currentStart.getTime();
        } catch {
          return false;
        }
      })
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentEdition?.id) {
      setError("Nenhuma edição da SDC está selecionada. Selecione uma edição em /admin/sdc/edicoes antes de cadastrar eventos.");
      return;
    }

    if (!name.trim()) {
      setError("O título da atividade é obrigatório.");
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

    // Validação em relação à data da edição
    if (currentEdition.date) {
      const editionDate = new Date(currentEdition.date);
      // Zerando horas para comparar datas do calendário
      const startDay = new Date(startDateTime).setHours(0, 0, 0, 0);
      const editionDay = new Date(editionDate).setHours(0, 0, 0, 0);

      if (startDay < editionDay) {
        setError(
          `A atividade não pode iniciar antes da data oficial de início da edição (SDC #${currentEdition.number}: ${editionDate.toLocaleDateString("pt-BR")}).`
        );
        return;
      }
    }

    if (onSite && !location.trim()) {
      setError("A localização física é obrigatória para eventos presenciais (ex: Auditório do CI, Laboratório 2).");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload: CreateEventInput = {
        name: name.trim(),
        editionId: currentEdition.id,
        speakerId,
        type,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        onSite,
        location: onSite ? location.trim() : location.trim() || undefined,
        capacity: capacity ? Math.max(1, Number(capacity)) : undefined,
        extraCapacity: extraCapacity ? Math.max(0, Number(extraCapacity)) : 0,
        allowMultiple,
        about: about.trim() || undefined,
        externalSignup: externalSignup.trim() || undefined,
      };

      const newEvent = await createEvent(payload);
      onSuccess(newEvent);
      onClose();
    } catch (err: any) {
      console.error("Erro ao criar evento:", err);

      if (err.response?.status === 401) {
        setError("Sessão expirada ou não autenticada. Acesse /admin/login para autenticar-se.");
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
          "Não foi possível salvar a atividade. Verifique os campos e tente novamente."
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
              <HiOutlineClock color="#73E5E2" />
              Agendar Nova Atividade
            </h2>
            <p>Cadastre uma palestra, minicurso ou atividade na grade da SDC.</p>
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
          {currentEdition ? (
            <EditionBanner>
              <span className="badge">SDC #{currentEdition.number}</span>
              <span>
                Vinculando à edição ativa: <strong>{currentEdition.name || `Edição #${currentEdition.number}`}</strong>
              </span>
            </EditionBanner>
          ) : (
            <WarningAlert>
              <HiOutlineExclamationCircle size={20} />
              <div>
                <strong>Atenção:</strong> Nenhuma edição ativa selecionada. Recomendamos selecionar uma edição no cabeçalho antes de cadastrar.
              </div>
            </WarningAlert>
          )}

          {error && (
            <ErrorAlert>
              <HiOutlineExclamationCircle size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>{error}</div>
            </ErrorAlert>
          )}

          {hasLocalRoomConflict && (
            <WarningAlert>
              <HiOutlineExclamationCircle size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong>Aviso de Sobreposição:</strong> Já existe outra atividade agendada em &ldquo;{location}&rdquo; às {startTime}. Verifique se não há duplicidade de espaço.
              </div>
            </WarningAlert>
          )}

          {/* Tipo de Atividade */}
          <FormGroup>
            <Label>Tipo de Atividade <span className="required">*</span></Label>
            <TypeSelector>
              <TypeButton
                type="button"
                $active={type === "palestra"}
                $colorType="palestra"
                onClick={() => {
                  setType("palestra");
                  if (capacity === "40") setCapacity("80");
                }}
              >
                Palestra
              </TypeButton>
              <TypeButton
                type="button"
                $active={type === "minicurso"}
                $colorType="minicurso"
                onClick={() => {
                  setType("minicurso");
                  if (capacity === "80") setCapacity("40");
                }}
              >
                Minicurso
              </TypeButton>
              <TypeButton
                type="button"
                $active={type === "main"}
                $colorType="main"
                onClick={() => setType("main")}
              >
                Geral / Abertura
              </TypeButton>
            </TypeSelector>
          </FormGroup>

          {/* Título da Atividade */}
          <FormGroup>
            <Label htmlFor="event-name">
              Título da Atividade <span className="required">*</span>
            </Label>
            <Input
              id="event-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Introdução ao Desenvolvimento com Rust e WebAssembly"
            />
          </FormGroup>

          {/* Palestrante Responsável */}
          <FormGroup>
            <Label htmlFor="event-speaker">
              <span>
                Palestrante Responsável <span className="required">*</span>
              </span>
              {isLoadingSpeakers && <span className="helper">Carregando...</span>}
            </Label>
            <SelectActionRow>
              <Select
                id="event-speaker"
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
            <InputHint>
              Se a tela de palestrantes ainda estiver em desenvolvimento pelo Dev 2, utilize o mock provisório para testes.
            </InputHint>
          </FormGroup>

          {/* Data e Horários */}
          <Row $columns="1.2fr 1fr 1fr">
            <FormGroup>
              <Label htmlFor="event-date">
                Data do Evento <span className="required">*</span>
              </Label>
              <Input
                id="event-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="event-start">
                Início <span className="required">*</span>
              </Label>
              <Input
                id="event-start"
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="event-end">
                Término <span className="required">*</span>
              </Label>
              <Input
                id="event-end"
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormGroup>
          </Row>

          {/* Modalidade e Localização */}
          <Row $columns="1.2fr 1fr">
            <FormGroup>
              <Label>Modalidade <span className="required">*</span></Label>
              <ToggleContainer>
                <ToggleButton
                  type="button"
                  $active={onSite}
                  onClick={() => setOnSite(true)}
                >
                  Presencial
                </ToggleButton>
                <ToggleButton
                  type="button"
                  $active={!onSite}
                  onClick={() => setOnSite(false)}
                >
                  Online / Remoto
                </ToggleButton>
              </ToggleContainer>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="event-location">
                {onSite ? "Local / Sala" : "Link / Plataforma"}
                {onSite && <span className="required">*</span>}
              </Label>
              <Input
                id="event-location"
                type="text"
                required={onSite}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={onSite ? "Ex: Auditório do CI, Sala 102" : "Ex: Google Meet, YouTube Live"}
                $hasError={hasLocalRoomConflict}
              />
            </FormGroup>
          </Row>

          {/* Capacidade e Vagas */}
          <Row>
            <FormGroup>
              <Label htmlFor="event-capacity">
                Capacidade de Vagas
                <span className="helper">Opcional</span>
              </Label>
              <Input
                id="event-capacity"
                type="number"
                min="1"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Ex: 50"
              />
              <InputHint>Limite de alunos que podem se inscrever nesta atividade.</InputHint>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="event-extra">
                Fila de Espera / Vagas Extras
                <span className="helper">Opcional</span>
              </Label>
              <Input
                id="event-extra"
                type="number"
                min="0"
                value={extraCapacity}
                onChange={(e) => setExtraCapacity(e.target.value)}
                placeholder="Ex: 10"
              />
              <InputHint>Vagas excedentes permitidas antes do encerramento das inscrições.</InputHint>
            </FormGroup>
          </Row>

          {/* Descrição / Ementa */}
          <FormGroup>
            <Label htmlFor="event-about">
              Ementa / Descrição da Atividade
              <span className="helper">Opcional</span>
            </Label>
            <TextArea
              id="event-about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Descreva o conteúdo abordado, requisitos de software, pré-requisitos recomendados, etc."
            />
          </FormGroup>

          {/* Link Externo de Inscrição */}
          <FormGroup>
            <Label htmlFor="event-external">
              Link de Inscrição Externa (Forms / Sympla)
              <span className="helper">Opcional</span>
            </Label>
            <Input
              id="event-external"
              type="url"
              value={externalSignup}
              onChange={(e) => setExternalSignup(e.target.value)}
              placeholder="https://forms.gle/... (deixe vazio se a inscrição for no próprio portal)"
            />
          </FormGroup>

          <ModalFooter>
            <CancelButton type="button" onClick={onClose} disabled={isLoading}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit" disabled={isLoading} $loading={isLoading}>
              {isLoading ? (
                "Salvando atividade..."
              ) : (
                <>
                  <HiOutlineCheck size={18} />
                  Agendar Atividade
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

export default EventFormModal;
