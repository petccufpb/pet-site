"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineLogout,
  HiOutlineArrowRight,
  HiOutlineUserGroup,
  HiOutlineExternalLink,
  HiOutlineShieldCheck,
  HiOutlineMicrophone,
  HiOutlineClipboardCheck,
  HiOutlineAcademicCap,
  HiOutlinePlus,
  HiOutlineIdentification,
} from "react-icons/hi";

import {
  Container,
  Header,
  UserSection,
  UserAvatar,
  UserMeta,
  StatusDot,
  HeaderActions,
  HeaderButton,
  HeroSection,
  HeroBadge,
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
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  ModulesGrid,
  ModuleCard,
  CardTop,
  IconContainer,
  CardTag,
  CardContent,
  CardFooter,
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

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";
  return "Boa noite";
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

  const handleLogout = async () => {
    try {
      await fetch("/api/proxy/auth/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Erro ao encerrar sessão:", err);
    }
    window.location.href = "/admin/login";
  };

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

  const greeting = getGreeting();

  // Módulos da Semana de Computação
  const sdcModules = [
    {
      title: "Edições da SDC",
      description:
        "Gerencie o histórico de edições da Semana de Computação, configure o tema, datas e defina a edição ativa no painel.",
      href: "/admin/sdc/edicoes",
      routeLabel: "/admin/sdc/edicoes",
      tag: "Dev 3 • Edições",
      icon: <HiOutlineCalendar size={28} />,
      accentColor: "#73E5E2",
      buttonText: "Gerenciar Edições",
    },
    {
      title: "Cronograma de Atividades",
      description:
        "Organize palestras e minicursos, associe salas, configure horários, vagas e vincule palestrantes da edição.",
      href: "/admin/sdc/eventos",
      routeLabel: "/admin/sdc/eventos",
      tag: "Dev 3 • Cronograma",
      icon: <HiOutlineClock size={28} />,
      accentColor: "#38BCDE",
      buttonText: "Gerenciar Atividades",
    },
    {
      title: "Palestrantes Convidados",
      description:
        "Cadastro e listagem de palestrantes da SDC, com upload de fotos, mini-biografias e redes sociais.",
      href: "/admin/sdc/palestrantes",
      routeLabel: "/admin/sdc/palestrantes",
      tag: "Dev 2 • Uploads",
      icon: <HiOutlineMicrophone size={28} />,
      accentColor: "#A78BFA",
      buttonText: "Ver Palestrantes",
    },
    {
      title: "Check-in & Frequência",
      description:
        "Painel operacional de presença em tempo real por atividade e conferência de inscritos com atalhos de teclado.",
      href: "/admin/sdc/frequencia",
      routeLabel: "/admin/sdc/frequencia",
      tag: "Dev 4 • Presença",
      icon: <HiOutlineClipboardCheck size={28} />,
      accentColor: "#34D399",
      buttonText: "Frequência Manual",
    },
    {
      title: "Elegibilidade & Certificados",
      description:
        "Cálculo automático de frequência mínima, disparo de certificados por lote e geração individual manual.",
      href: "/admin/sdc/certificados",
      routeLabel: "/admin/sdc/certificados",
      tag: "Dev 5 • Certificados",
      icon: <HiOutlineAcademicCap size={28} />,
      accentColor: "#FBBF24",
      buttonText: "Painel de Certificados",
    },
  ];

  // Módulos Institucionais PET
  const petModules = [
    {
      title: "Gestão do Time PET",
      description:
        "Controle de integrantes ativos, tutores, fotos, biografias e redes sociais dos bolsistas e voluntários.",
      href: "/admin/time",
      routeLabel: "/admin/time",
      tag: "Dev 1 • Equipe",
      icon: <HiOutlineUserGroup size={28} />,
      accentColor: "#0072ED",
      buttonText: "Gerenciar Time",
    },
  ];

  return (
    <Container>
      <Header>
        <UserSection>
          <UserAvatar>
            <HiOutlineShieldCheck size={26} />
          </UserAvatar>
          <UserMeta>
            <h3>
              {adminUser?.username
                ? `${greeting}, ${adminUser.username}`
                : `${greeting}, Administrador`}
            </h3>
            <span>
              <StatusDot /> Sessão autenticada e protegida
            </span>
          </UserMeta>
        </UserSection>

        <HeaderActions>
          <HeaderButton as="a" href="/" target="_blank" rel="noopener noreferrer">
            <HiOutlineExternalLink size={17} />
            <span>Ver Site Público</span>
          </HeaderButton>

          <HeaderButton $variant="danger" onClick={handleLogout}>
            <HiOutlineLogout size={17} />
            <span>Encerrar Sessão</span>
          </HeaderButton>
        </HeaderActions>
      </Header>

      <HeroSection>
        <HeroBadge>
          <HiOutlineSparkles size={16} />
          Central Administrativa Unificada
        </HeroBadge>
        <HeroTitle>
          Painel de <span>Administração</span>
        </HeroTitle>
        <HeroSubtitle>
          Gerencie todos os aspectos do PET Computação UFPB e da Semana da Computação (SDC).
          Selecione uma área abaixo para começar.
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
        <QuickActionBtn href="/admin/time">
          <HiOutlinePlus size={15} />
          Novo Integrante
        </QuickActionBtn>
        <QuickActionBtn href="/sdc/minha-inscricao" target="_blank" rel="noopener noreferrer">
          <HiOutlineIdentification size={15} />
          Portal do Inscrito
        </QuickActionBtn>
      </QuickActionsBar>

      {/* Seção 1: Semana da Computação (SDC) */}
      <SectionHeader>
        <div>
          <SectionTitle>
            <HiOutlineCalendar />
            Semana da Computação (SDC)
          </SectionTitle>
          <SectionSubtitle>
            Módulos para gestão completa de edições, cronograma, palestras, credenciamento e emissão de certificados.
          </SectionSubtitle>
        </div>
      </SectionHeader>

      <ModulesGrid>
        {sdcModules.map((mod) => (
          <ModuleCard
            key={mod.href}
            as={Link}
            href={mod.href}
            $accentColor={mod.accentColor}
          >
            <div>
              <CardTop>
                <IconContainer $color={mod.accentColor}>
                  {mod.icon}
                </IconContainer>
                <CardTag $color={mod.accentColor}>{mod.tag}</CardTag>
              </CardTop>

              <CardContent>
                <h2>{mod.title}</h2>
                <p>{mod.description}</p>
              </CardContent>
            </div>

            <CardFooter $color={mod.accentColor}>
              <span className="route-label">{mod.routeLabel}</span>
              <span className="action-btn">
                {mod.buttonText}
                <HiOutlineArrowRight size={16} className="card-arrow" />
              </span>
            </CardFooter>
          </ModuleCard>
        ))}
      </ModulesGrid>

      {/* Seção 2: Gestão Institucional PET */}
      <SectionHeader>
        <div>
          <SectionTitle>
            <HiOutlineUserGroup />
            Gestão Institucional
          </SectionTitle>
          <SectionSubtitle>
            Administração dos bolsistas, voluntários, tutores e dados do PET Computação.
          </SectionSubtitle>
        </div>
      </SectionHeader>

      <ModulesGrid>
        {petModules.map((mod) => (
          <ModuleCard
            key={mod.href}
            as={Link}
            href={mod.href}
            $accentColor={mod.accentColor}
          >
            <div>
              <CardTop>
                <IconContainer $color={mod.accentColor}>
                  {mod.icon}
                </IconContainer>
                <CardTag $color={mod.accentColor}>{mod.tag}</CardTag>
              </CardTop>

              <CardContent>
                <h2>{mod.title}</h2>
                <p>{mod.description}</p>
              </CardContent>
            </div>

            <CardFooter $color={mod.accentColor}>
              <span className="route-label">{mod.routeLabel}</span>
              <span className="action-btn">
                {mod.buttonText}
                <HiOutlineArrowRight size={16} className="card-arrow" />
              </span>
            </CardFooter>
          </ModuleCard>
        ))}
      </ModulesGrid>

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
