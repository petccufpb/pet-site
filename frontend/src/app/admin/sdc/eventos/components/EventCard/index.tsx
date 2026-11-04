"use client";

import React, { useState } from "react";
import {
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineUserGroup,
  HiOutlineClipboardCopy,
  HiOutlineCheck,
  HiOutlineGlobeAlt,
  HiOutlineExternalLink,
  HiOutlinePencilAlt,
} from "react-icons/hi";
import { SDCEvent, SDCSpeaker } from "sdc-admin";

import {
  CardContainer,
  CardHeader,
  TimeBadge,
  TypeBadge,
  Title,
  Description,
  SpeakerInfo,
  SpeakerAvatar,
  SpeakerMeta,
  MetaBar,
  MetaItem,
  CopyIdButton,
  ActionButtonGroup,
  EditButton,
} from "./styles";

interface EventCardProps {
  event: SDCEvent;
  speaker?: SDCSpeaker;
  onEdit?: (event: SDCEvent) => void;
}

function formatTimeOnly(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return isoString;
  }
}

export function EventCard({ event, speaker, onEdit }: EventCardProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const effectiveSpeaker = event.speaker || speaker;
  const startTimeFormatted = formatTimeOnly(event.startTime);
  const endTimeFormatted = formatTimeOnly(event.endTime);

  const handleCopyId = () => {
    if (!event.id) return;
    navigator.clipboard.writeText(event.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const typeLabel =
    event.type === "minicurso"
      ? "Minicurso"
      : event.type === "palestra"
      ? "Palestra"
      : "Geral / Abertura";

  return (
    <CardContainer $type={event.type || "palestra"}>
      <CardHeader>
        <TimeBadge>
          <HiOutlineClock size={16} />
          {startTimeFormatted} - {endTimeFormatted}
        </TimeBadge>

        <TypeBadge $type={event.type || "palestra"}>
          {typeLabel}
        </TypeBadge>
      </CardHeader>

      <div>
        <Title>{event.name}</Title>
        {event.about && <Description>{event.about}</Description>}
      </div>

      {effectiveSpeaker && (
        <SpeakerInfo>
          <SpeakerAvatar>
            {effectiveSpeaker.photoUrl ? (
              <img src={effectiveSpeaker.photoUrl} alt={effectiveSpeaker.name} />
            ) : (
              effectiveSpeaker.name.charAt(0).toUpperCase()
            )}
          </SpeakerAvatar>
          <SpeakerMeta>
            <strong>{effectiveSpeaker.name}</strong>
            <span>{effectiveSpeaker.about || "Palestrante Convidado da SDC"}</span>
          </SpeakerMeta>
        </SpeakerInfo>
      )}

      <MetaBar>
        <MetaItem>
          {event.onSite ? (
            <>
              <HiOutlineLocationMarker size={16} />
              <span>{event.location || "Presencial"}</span>
            </>
          ) : (
            <>
              <HiOutlineGlobeAlt size={16} />
              <span>{event.location ? `Remoto (${event.location})` : "Transmissão Online"}</span>
            </>
          )}
        </MetaItem>

        <MetaItem>
          <HiOutlineUserGroup size={16} />
          <span>
            {event.capacity ? `${event.capacity} vagas` : "Vagas ilimitadas"}
            {event.extraCapacity ? ` (+${event.extraCapacity} espera)` : ""}
          </span>
        </MetaItem>

        {event.externalSignup && (
          <MetaItem>
            <a
              href={event.externalSignup}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#73E5E2", display: "inline-flex", alignItems: "center", gap: "0.25rem", textDecoration: "none" }}
            >
              <HiOutlineExternalLink size={15} />
              Inscrição Externa
            </a>
          </MetaItem>
        )}

        <ActionButtonGroup>
          {onEdit && (
            <EditButton
              type="button"
              onClick={() => onEdit(event)}
              title="Editar nome, horários, palestrante ou vagas desta atividade"
            >
              <HiOutlinePencilAlt size={14} />
              Editar
            </EditButton>
          )}

          <CopyIdButton onClick={handleCopyId} title="Copiar ID deste evento para testes (Dev 4 / Dev 5)">
            {copied ? (
              <>
                <HiOutlineCheck size={14} color="#5cf396" />
                <span style={{ color: "#5cf396" }}>ID copiado</span>
              </>
            ) : (
              <>
                <HiOutlineClipboardCopy size={14} />
                <span>Copiar ID</span>
              </>
            )}
          </CopyIdButton>
        </ActionButtonGroup>
      </MetaBar>
    </CardContainer>
  );
}

export default EventCard;
