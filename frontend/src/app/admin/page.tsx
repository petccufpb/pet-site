"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineExternalLink,
  HiOutlineMicrophone,
  HiOutlinePlus,
  HiOutlineIdentification,
} from "react-icons/hi";

import {
  Container,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  StatsGrid,
  StatCard,
  StatIcon,
  StatContent,
  StatValue,
  StatLabel,
  QuickActionsBar,
  QuickActionLabel,
  QuickActionBtn,
  QuickLinksCard,
  QuickLink,
  LoadingState,
} from "./styles";

interface AdminUser {
  username: string;
}

interface DashboardStats {
  activeEditionNumber: number | null;
  activeEditionName: string | null;
  totalEvents: number;
  totalMembers: number;
  totalSpeakers: number;
}

export default function AdminHubPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<DashboardStats>({
    activeEditionNumber: 37,
    activeEditionName: "Semana da Computação",
    totalEvents: 0,
    totalMembers: 0,
    totalSpeakers: 0,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        // 1. Validar autenticação
        const authRes = await fetch("/api/proxy/auth/admin/me", {
          credentials: "include",
        });

        if (!authRes.ok) {
          window.location.href = "/admin/login";
          return;
        }

        const userData = await authRes.json();
        if (isMounted) {
          setAdminUser(userData);
        }

        // 2. Carregar estatísticas do sistema em paralelo
        const [editionsRes, membersRes, speakersRes] = await Promise.allSettled([
          fetch("/api/proxy/projects/editions", { credentials: "include" }),
          fetch("/api/proxy/team/members", { credentials: "include" }),
          fetch("/api/proxy/projects/speakers", { credentials: "include" }),
        ]);

        let editionNum: number | null = 37;
        let editionName: string | null = "Semana da Computação";
        let eventsCount = 0;
        let membersCount = 0;
        let speakersCount = 0;

        if (editionsRes.status === "fulfilled" && editionsRes.value.ok) {
          const editionsData = await editionsRes.value.json().catch(() => []);
          if (Array.isArray(editionsData) && editionsData.length > 0) {
            const latest = editionsData[0];
            editionNum = latest.number;
            editionName = latest.name || `SDC #${latest.number}`;

            // Buscar eventos da edição ativa
            try {
              const eventsRes = await fetch(`/api/proxy/projects/events?editionId=${latest.id}`, {
                credentials: "include",
              });
              if (eventsRes.ok) {
                const eventsData = await eventsRes.json().catch(() => []);
                if (Array.isArray(eventsData)) {
                  eventsCount = eventsData.length;
                }
              }
            } catch {}
          }
        }

        if (membersRes.status === "fulfilled" && membersRes.value.ok) {
          const membersData = await membersRes.value.json().catch(() => []);
          if (Array.isArray(membersData)) {
            membersCount = membersData.length;
          }
        }

        if (speakersRes.status === "fulfilled" && speakersRes.value.ok) {
          const speakersData = await speakersRes.value.json().catch(() => []);
          if (Array.isArray(speakersData)) {
            speakersCount = speakersData.length;
          }
        }

        if (isMounted) {
          setStats({
            activeEditionNumber: editionNum,
            activeEditionName: editionName,
            totalEvents: eventsCount,
            totalMembers: membersCount,
            totalSpeakers: speakersCount,
          });
          setLoading(false);
        }
      } catch (err) {
        console.error("Falha ao inicializar o painel pós-login:", err);
        window.location.href = "/admin/login";
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingState>
          <div className="spinner" />
          <p>Carregando painel de administração...</p>
        </LoadingState>
      </Container>
    );
  }

  return (
    <Container>
      <HeroSection>
        <HeroTitle>Painel de Administração</HeroTitle>
        <HeroSubtitle>
          Gerencie todos os aspectos do PET Computação UFPB e da Semana da Computação (SDC).
        </HeroSubtitle>
      </HeroSection>

      {/* Grid de Estatísticas Rápidas (KPIs) */}
      <StatsGrid>
        <StatCard $accentColor="#73E5E2">
          <StatIcon $color="#73E5E2">
            <HiOutlineCalendar size={22} />
          </StatIcon>
          <StatContent>
            <StatValue>SDC #{stats.activeEditionNumber ?? "--"}</StatValue>
            <StatLabel>Edição Ativa</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard $accentColor="#38BCDE">
          <StatIcon $color="#38BCDE">
            <HiOutlineClock size={22} />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalEvents}</StatValue>
            <StatLabel>Atividades na Grade</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard $accentColor="#0072ED">
          <StatIcon $color="#0072ED">
            <HiOutlineUserGroup size={22} />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalMembers}</StatValue>
            <StatLabel>Integrantes do PET</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard $accentColor="#A78BFA">
          <StatIcon $color="#A78BFA">
            <HiOutlineMicrophone size={22} />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.totalSpeakers}</StatValue>
            <StatLabel>Palestrantes SDC</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>

      {/* Barra de Ações Rápidas */}
      <QuickActionsBar>
        <QuickActionLabel>Ações Rápidas:</QuickActionLabel>
        <QuickActionBtn href="/admin/sdc/eventos">
          <HiOutlinePlus size={15} />
          Nova Atividade
        </QuickActionBtn>
        <QuickActionBtn href="/admin/sdc/edicoes">
          <HiOutlinePlus size={15} />
          Nova Edição
        </QuickActionBtn>
        <QuickActionBtn href="/admin/membros">
          <HiOutlinePlus size={15} />
          Novo Integrante
        </QuickActionBtn>
        <QuickActionBtn href="/sdc/minha-inscricao" target="_blank" rel="noopener noreferrer">
          <HiOutlineIdentification size={15} />
          Portal do Inscrito
        </QuickActionBtn>
      </QuickActionsBar>

      {/* Atalhos Rápidos Públicos */}
      <QuickLinksCard>
        <div className="label-group">
          <div>
            <h4>Visualizar Telas Públicas</h4>
            <p>Confira como as alterações e programações aparecem para os participantes</p>
          </div>
        </div>
        <div className="links-group">
          <QuickLink href="/sdc" target="_blank" rel="noopener noreferrer">
            Portal SDC <HiOutlineExternalLink size={14} />
          </QuickLink>
          <QuickLink href="/sdc/minha-inscricao" target="_blank" rel="noopener noreferrer">
            Área do Inscrito <HiOutlineExternalLink size={14} />
          </QuickLink>
          <QuickLink href="/time" target="_blank" rel="noopener noreferrer">
            Equipe PET <HiOutlineExternalLink size={14} />
          </QuickLink>
          <QuickLink href="/artigos" target="_blank" rel="noopener noreferrer">
            Artigos <HiOutlineExternalLink size={14} />
          </QuickLink>
        </div>
      </QuickLinksCard>
    </Container>
  );
}
