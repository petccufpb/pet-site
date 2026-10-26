"use client";

import type { Member } from "backend";
import { HiOutlinePencil } from "react-icons/hi2";

import { memberTypeLabel } from "@services/members";

import {
  About,
  Avatar,
  Badge,
  BadgeRow,
  Card,
  CardFooter,
  CardIdentity,
  CardMeta,
  CardTop,
  ContactList,
  IconButton,
} from "../../styles";

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join("");
}

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

interface MemberCardProps {
  member: Member;
  onEdit: (member: Member) => void;
}

export default function MemberCard({ member, onEdit }: MemberCardProps) {
  return (
    <Card>
      <CardTop>
        <Avatar aria-hidden="true">
          {getInitials(member.name)}
          {member.photoUrl && (
            <img
              src={member.photoUrl}
              alt={`Foto de ${member.name}`}
              onError={event => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}
        </Avatar>

        <CardIdentity>
          <h3 title={member.name}>{member.name}</h3>
          <BadgeRow>
            <Badge $tone="neutral">{memberTypeLabel(member.type)}</Badge>
            <Badge $tone={member.isActive ? "green" : "red"}>{member.isActive ? "Ativo" : "Inativo"}</Badge>
          </BadgeRow>
        </CardIdentity>
      </CardTop>

      <About title={member.about ?? undefined}>{member.about ?? "Sem descrição."}</About>

      {member.contactInfo.length > 0 && (
        <ContactList>
          {member.contactInfo.slice(0, 3).map(contact => (
            <span key={contact.id}>
              <strong>{contact.name}:</strong> {contact.snsId}
            </span>
          ))}
          {member.contactInfo.length > 3 && <span>+{member.contactInfo.length - 3} contato(s)</span>}
        </ContactList>
      )}

      <CardFooter>
        <CardMeta>Atualizado em {formatDate(member.updatedAt)}</CardMeta>
        <IconButton type="button" onClick={() => onEdit(member)} aria-label={`Editar ${member.name}`}>
          <HiOutlinePencil size={15} />
          Editar
        </IconButton>
      </CardFooter>
    </Card>
  );
}
