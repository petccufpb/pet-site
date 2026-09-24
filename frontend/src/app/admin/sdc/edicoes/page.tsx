"use client";

import React from "react";
import Link from "next/link";
import { SDCEdition } from "sdc-admin";
import { useSDC } from "../../../../contexts/SDCContext";
import {
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineRefresh,
  HiPlus,
  HiOutlineClock,
  HiCheck,
} from "react-icons/hi";

import {
  Container,
  Header,
  TitleArea,
  ActionGroup,
  Button,
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  EditionNumber,
  EditionTitle,
  EditionSubtitle,
  StatusBadge,
  SelectActionBtn,
  EmptyState,
  LoadingContainer,
} from "./styles";

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export default function SdcEdicoesPage() {
  const { editions, currentEdition, isLoading, error, selectEdition, refreshEditions } = useSDC();

  return (
    <Container>
      <Header>
        <TitleArea>
          <h1>Edições da SDC</h1>
          <p>
            Gerencie o histórico de edições da Semana de Computação e defina qual edição está ativa
            em todo o painel administrativo.
          </p>
        </TitleArea>

        <ActionGroup>
          <Button variant="outline" onClick={() => refreshEditions()} disabled={isLoading}>
            <HiOutlineRefresh size={16} />
            Recarregar
          </Button>
          <Button primary onClick={() => alert("O formulário de criação de edição será aberto no próximo passo!")}>
            <HiPlus size={18} />
            Nova Edição
          </Button>
        </ActionGroup>
      </Header>

      {isLoading ? (
        <LoadingContainer>
          <HiOutlineRefresh size={32} className="animate-spin" />
          <p>Carregando edições da SDC...</p>
        </LoadingContainer>
      ) : error ? (
        <EmptyState>
          <h3>Erro ao carregar edições</h3>
          <p>{error}</p>
          <Button onClick={() => refreshEditions()}>Tentar novamente</Button>
        </EmptyState>
      ) : editions.length === 0 ? (
        <EmptyState>
          <h3>Nenhuma edição cadastrada</h3>
          <p>Cadastre a primeira edição da SDC para começar a gerenciar o cronograma e palestras.</p>
        </EmptyState>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Edição</TableHeader>
                <TableHeader>Nome / Tema</TableHeader>
                <TableHeader>Data do Evento</TableHeader>
                <TableHeader>Presença Mínima</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader style={{ textAlign: "right" }}>Ações</TableHeader>
              </tr>
            </thead>
            <tbody>
              {editions.map((edition: SDCEdition) => {
                const isCurrent = currentEdition?.id === edition.id;

                return (
                  <TableRow key={edition.id} isSelected={isCurrent}>
                    <TableCell>
                      <EditionNumber>SDC #{edition.number}</EditionNumber>
                    </TableCell>

                    <TableCell>
                      <EditionTitle>{edition.name || `Semana de Computação #${edition.number}`}</EditionTitle>
                      <EditionSubtitle>ID: {edition.id}</EditionSubtitle>
                    </TableCell>

                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <HiOutlineCalendar color="#73E5E2" />
                        <span>{formatDate(edition.date)}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span>{edition.minimumAttendance ?? 100}%</span>
                    </TableCell>

                    <TableCell>
                      <StatusBadge active={isCurrent}>
                        {isCurrent ? (
                          <>
                            <HiCheck size={14} />
                            Ativa no Painel
                          </>
                        ) : (
                          "Histórico"
                        )}
                      </StatusBadge>
                    </TableCell>

                    <TableCell style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center" }}>
                        <SelectActionBtn
                          selected={isCurrent}
                          onClick={() => selectEdition(edition.id)}
                          title={isCurrent ? "Edição atualmente ativa" : "Definir como edição ativa no painel"}
                        >
                          <HiOutlineCheckCircle size={15} />
                          {isCurrent ? "Selecionada" : "Selecionar"}
                        </SelectActionBtn>

                        <Link href="/admin/sdc/eventos" style={{ textDecoration: "none" }}>
                          <SelectActionBtn selected={false} title="Ver cronograma de eventos desta edição">
                            <HiOutlineClock size={15} />
                            Eventos
                          </SelectActionBtn>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
