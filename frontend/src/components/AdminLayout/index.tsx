"use client";

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineArrowRightOnRectangle,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineBars3,
  HiOutlineCalendarDays,
  HiOutlineChevronLeft,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClock,
  HiOutlineMicrophone,
  HiOutlineSquares2X2,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineXMark,
} from "react-icons/hi2";

import { getAdminSession, logoutAdmin } from "@services/adminAuth";

import Logo from "@assets/images/logo.svg?svgr";

import {
  Brand,
  CollapseButton,
  Container,
  Content,
  Header,
  HeaderActions,
  HeaderButton,
  HeaderLeft,
  LoadingScreen,
  LogoutButton,
  Main,
  MenuButton,
  MobileBackdrop,
  NavItem,
  NavList,
  NavSectionLabel,
  Sidebar,
  SidebarFooter,
  Spinner,
  UserMeta,
} from "./styles";

const SIDEBAR_STORAGE_KEY = "pet-admin-sidebar-collapsed";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: ReactNode;
  /** Breve descrição exibida no painel inicial */
  description?: string;
  /** Destacar apenas quando o caminho for exatamente este */
  exact?: boolean;
}

/**
 * Módulos disponíveis no painel. Outras equipes podem acrescentar novas
 * entradas aqui para que apareçam automaticamente na barra lateral.
 */
export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Painel",
    href: "/admin",
    icon: <HiOutlineSquares2X2 />,
    description: "Visão geral dos módulos administrativos do site.",
    exact: true,
  },
  {
    label: "Membros",
    href: "/admin/membros",
    icon: <HiOutlineUserGroup />,
    description: "Cadastro, edição e listagem dos integrantes da equipe.",
  },
  {
    label: "Edições SDC",
    href: "/admin/sdc/edicoes",
    icon: <HiOutlineCalendarDays />,
    description: "Histórico e configuração de edições da Semana da Computação.",
  },
  {
    label: "Cronograma SDC",
    href: "/admin/sdc/eventos",
    icon: <HiOutlineClock />,
    description: "Grade de palestras, minicursos, salas e vagas.",
  },
  {
    label: "Palestrantes",
    href: "/admin/sdc/palestrantes",
    icon: <HiOutlineMicrophone />,
    description: "Cadastro e listagem de palestrantes convidados.",
  },
  {
    label: "Frequência",
    href: "/admin/sdc/frequencia",
    icon: <HiOutlineClipboardDocumentCheck />,
    description: "Check-in operacional e registro de presenças.",
  },
  {
    label: "Certificados",
    href: "/admin/sdc/certificados",
    icon: <HiOutlineAcademicCap />,
    description: "Emissão e disparo em lote de certificados de participação.",
  },
];

export default function AdminLayout({ children }: PropsWithChildren) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const isLoginPage = pathname.startsWith("/admin/login");

  const activeItem = useMemo(
    () =>
      ADMIN_NAV_ITEMS.find(item => (item.exact ? pathname === item.href : pathname.startsWith(item.href))),
    [pathname],
  );

  useEffect(() => {
    const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);

    if (stored === "true") {
      setCollapsed(true);
    }
  }, []);

  useEffect(() => {
    if (isLoginPage) return;

    let isActive = true;

    getAdminSession()
      .then(session => {
        if (isActive) setUsername(session.username);
      })
      .catch(() => {
        if (isActive) {
          const nextPath = window.location.pathname;
          const nextParam =
            nextPath && nextPath !== "/admin"
              ? `?next=${encodeURIComponent(`${nextPath}${window.location.search}`)}`
              : "";

          router.replace(`/admin/login${nextParam}`);
        }
      });

    return () => {
      isActive = false;
    };
  }, [isLoginPage, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleToggleCollapse = useCallback(() => {
    setCollapsed(current => {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(!current));

      return !current;
    });
  }, []);

  const handleLogout = useCallback(async () => {
    await logoutAdmin();
    window.location.assign("/admin/login");
  }, []);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (username === null) {
    return (
      <LoadingScreen role="status" aria-live="polite">
        <Spinner aria-hidden="true" />
        <p>Validando sessão administrativa...</p>
      </LoadingScreen>
    );
  }

  return (
    <Container>
      <Sidebar id="admin-sidebar" $collapsed={collapsed} $open={mobileOpen} aria-label="Menu administrativo">
        <Brand $collapsed={collapsed}>
          <Logo alt="Logo PET Computação" width={40} />
          <span>PET Admin</span>
        </Brand>

        <NavSectionLabel $collapsed={collapsed}>Módulos</NavSectionLabel>

        <NavList aria-label="Módulos administrativos">
          {ADMIN_NAV_ITEMS.map(item => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

            return (
              <NavItem
                key={item.href}
                href={item.href}
                $active={isActive}
                $collapsed={collapsed}
                aria-current={isActive ? "page" : undefined}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavItem>
            );
          })}
        </NavList>

        <SidebarFooter>
          <CollapseButton
            type="button"
            onClick={handleToggleCollapse}
            aria-expanded={!collapsed}
            aria-controls="admin-sidebar"
            aria-label={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
            title={collapsed ? "Expandir menu" : "Recolher menu"}
          >
            <HiOutlineChevronLeft
              size={20}
              style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform 200ms ease" }}
            />
          </CollapseButton>
        </SidebarFooter>
      </Sidebar>

      {mobileOpen && (
        <MobileBackdrop type="button" aria-label="Fechar menu lateral" onClick={() => setMobileOpen(false)} />
      )}

      <Content $collapsed={collapsed}>
        <Header>
          <HeaderLeft>
            <MenuButton
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu lateral"
              aria-controls="admin-sidebar"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <HiOutlineXMark size={22} /> : <HiOutlineBars3 size={22} />}
            </MenuButton>
            <h1>{activeItem?.label ?? "Administração"}</h1>
          </HeaderLeft>

          <HeaderActions>
            <HeaderButton
              as="a"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver site público em nova aba"
            >
              <HiOutlineArrowTopRightOnSquare size={16} />
              Site público
            </HeaderButton>

            <UserMeta title="Sessão autenticada">
              <HiOutlineUser size={22} aria-hidden="true" />
              <div>
                <strong>{username}</strong>
                <span>Administrador</span>
              </div>
            </UserMeta>

            <LogoutButton type="button" onClick={handleLogout} aria-label="Encerrar sessão">
              <HiOutlineArrowRightOnRectangle size={16} />
              Sair
            </LogoutButton>
          </HeaderActions>
        </Header>

        <Main id="admin-main" $fullWidth={pathname.startsWith("/admin/sdc") || pathname.startsWith("/admin/membros")}>{children}</Main>
      </Content>
    </Container>
  );
}
