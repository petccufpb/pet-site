"use client";

import type { Member } from "backend";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { ToastContainer } from "react-toastify";

import { ApiError } from "@services/adminApi";
import { fetchMembers, fetchTutors } from "@services/members";

import MemberCard from "./components/MemberCard";
import MemberFormModal from "./components/MemberFormModal";
import {
  FilterSelect,
  Grid,
  PageButton,
  PageHeader,
  PageHeading,
  PageInfo,
  Pagination,
  PrimaryButton,
  ResultSummary,
  SearchWrapper,
  SecondaryButton,
  Spinner,
  StatePanel,
  Toolbar,
} from "./styles";

import "react-toastify/dist/ReactToastify.css";

const PAGE_SIZE = 12;

type LoadStatus = "loading" | "error" | "ready";

type MemberModal = { mode: "create" } | { mode: "edit"; member: Member } | null;

interface LoadOptions {
  /** Mantém a lista atual visível enquanto os dados são recarregados */
  silent?: boolean;
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState<MemberModal>(null);

  const load = useCallback(async (signal?: AbortSignal, options?: LoadOptions) => {
    if (!options?.silent) {
      setStatus("loading");
    }

    setErrorMessage("");

    try {
      const [memberList, tutorList] = await Promise.all([fetchMembers(signal), fetchTutors(signal)]);

      setMembers([...memberList, ...tutorList]);
      setStatus("ready");
    } catch (err) {
      if (signal?.aborted) return;

      setErrorMessage(err instanceof ApiError ? err.message : "Erro inesperado ao carregar os membros.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    load(controller.signal);

    return () => controller.abort();
  }, [load]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(searchInput.trim().toLowerCase());
      setPage(1);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const filteredMembers = useMemo(
    () =>
      members.filter(member => {
        const searchableText = `${member.name} ${member.about ?? ""}`.toLowerCase();
        const matchesQuery = query === "" || searchableText.includes(query);
        const matchesType =
          typeFilter === "all" ||
          (typeFilter === "none" ? member.type === null || member.type === "" : member.type === typeFilter);
        const matchesStatus =
          statusFilter === "all" || (statusFilter === "active" ? member.isActive : !member.isActive);

        return matchesQuery && matchesType && matchesStatus;
      }),
    [members, query, typeFilter, statusFilter],
  );

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleMembers = filteredMembers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const hasActiveFilters = query !== "" || typeFilter !== "all" || statusFilter !== "all";

  const clearFilters = useCallback(() => {
    setSearchInput("");
    setQuery("");
    setTypeFilter("all");
    setStatusFilter("all");
    setPage(1);
  }, []);

  const handleSaved = useCallback(() => {
    setModal(null);
    load(undefined, { silent: true });
  }, [load]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <PageHeader>
        <PageHeading>
          <h2>Membros</h2>
          <p>Gerencie os integrantes exibidos na página pública de equipe do PET.</p>
        </PageHeading>

        <PrimaryButton type="button" onClick={() => setModal({ mode: "create" })}>
          <HiOutlinePlus size={18} />
          Novo membro
        </PrimaryButton>
      </PageHeader>

      <Toolbar role="search">
        <SearchWrapper>
          <HiOutlineMagnifyingGlass size={18} aria-hidden="true" />
          <input
            type="search"
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
            placeholder="Buscar por nome ou descrição..."
            aria-label="Buscar membros"
          />
        </SearchWrapper>

        <FilterSelect
          value={typeFilter}
          onChange={event => {
            setTypeFilter(event.target.value);
            setPage(1);
          }}
          aria-label="Filtrar por tipo"
        >
          <option value="all">Todos os tipos</option>
          <option value="none">Sem tipo</option>
          <option value="decano">Decano</option>
          <option value="founder">Fundador</option>
          <option value="tutor">Tutor</option>
        </FilterSelect>

        <FilterSelect
          value={statusFilter}
          onChange={event => {
            setStatusFilter(event.target.value);
            setPage(1);
          }}
          aria-label="Filtrar por situação"
        >
          <option value="all">Todos os status</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </FilterSelect>

        {hasActiveFilters && (
          <SecondaryButton type="button" onClick={clearFilters}>
            <HiOutlineArrowPath size={15} />
            Limpar filtros
          </SecondaryButton>
        )}
      </Toolbar>

      {status === "loading" && (
        <StatePanel role="status" aria-live="polite">
          <Spinner aria-hidden="true" />
          <p>Carregando membros...</p>
        </StatePanel>
      )}

      {status === "error" && (
        <StatePanel $isError role="alert">
          <strong>Não foi possível carregar os membros</strong>
          <p>{errorMessage}</p>
          <SecondaryButton type="button" onClick={() => load()}>
            <HiOutlineArrowPath size={16} />
            Tentar novamente
          </SecondaryButton>
        </StatePanel>
      )}

      {status === "ready" && members.length === 0 && (
        <StatePanel>
          <strong>Nenhum membro cadastrado</strong>
          <p>Comece cadastrando os integrantes da equipe para que eles apareçam no site público.</p>
          <PrimaryButton type="button" onClick={() => setModal({ mode: "create" })}>
            <HiOutlinePlus size={18} />
            Cadastrar primeiro membro
          </PrimaryButton>
        </StatePanel>
      )}

      {status === "ready" && members.length > 0 && filteredMembers.length === 0 && (
        <StatePanel>
          <strong>Nenhum membro encontrado</strong>
          <p>Nenhum membro corresponde à busca ou aos filtros aplicados.</p>
          <SecondaryButton type="button" onClick={clearFilters}>
            <HiOutlineArrowPath size={16} />
            Limpar filtros
          </SecondaryButton>
        </StatePanel>
      )}

      {status === "ready" && filteredMembers.length > 0 && (
        <>
          <ResultSummary>
            {filteredMembers.length}{" "}
            {filteredMembers.length === 1 ? "membro encontrado" : "membros encontrados"}
            {filteredMembers.length !== members.length && ` de ${members.length} cadastrados`}
          </ResultSummary>

          <Grid>
            {visibleMembers.map(member => (
              <MemberCard
                key={member.id}
                member={member}
                onEdit={selected => setModal({ mode: "edit", member: selected })}
              />
            ))}
          </Grid>

          {totalPages > 1 && (
            <Pagination aria-label="Paginação de membros">
              <PageButton
                type="button"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Página anterior"
              >
                <HiOutlineChevronLeft size={16} />
              </PageButton>

              <PageInfo>
                Página {currentPage} de {totalPages}
              </PageInfo>

              <PageButton
                type="button"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Próxima página"
              >
                <HiOutlineChevronRight size={16} />
              </PageButton>
            </Pagination>
          )}
        </>
      )}

      {modal && (
        <MemberFormModal
          member={modal.mode === "edit" ? modal.member : null}
          onRequestClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}
