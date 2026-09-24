"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { SDCProvider, useSDC } from "../../../contexts/SDCContext";
import { HiOutlineCalendar, HiOutlineClock, HiOutlineExternalLink, HiOutlineSparkles } from "react-icons/hi";

const ShellContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors["base-black"]};
  color: ${({ theme }) => theme.colors["base-white"]};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

const SubHeader = styled.header`
  background: rgba(24, 34, 64, 0.4);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors["line-white"]};
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 40;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h2 {
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ActiveEditionBadge = styled.div<{ hasEdition: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.alt};
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavItem = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  color: ${({ active, theme }) =>
    active ? theme.colors["third-blue"] : theme.colors["second-white"]};
  background: ${({ active }) => (active ? "rgba(115, 229, 226, 0.1)" : "transparent")};
  border: 1px solid ${({ active }) => (active ? "rgba(115, 229, 226, 0.25)" : "transparent")};

  &:hover {
    color: ${({ theme }) => theme.colors["base-white"]};
    background: rgba(255, 255, 255, 0.06);
  }
`;

const ExternalLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.colors["second-white"]};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors["base-white"]};
  }
`;

function SDCHeaderBar() {
  const pathname = usePathname();
  const { currentEdition, isLoading } = useSDC();

  return (
    <SubHeader>
      <HeaderContent>
        <BrandSection>
          <h2>
            Painel SDC
          </h2>
          <ActiveEditionBadge hasEdition={!!currentEdition}>
            <HiOutlineCalendar />
            {isLoading
              ? "Carregando edição..."
              : currentEdition
              ? `Edição Selecionada: SDC #${currentEdition.number}`
              : "Nenhuma edição ativa"}
          </ActiveEditionBadge>
        </BrandSection>

        <NavLinks>
          <NavItem
            href="/admin/sdc/edicoes"
            active={pathname?.startsWith("/admin/sdc/edicoes") ?? false}
          >
            <HiOutlineCalendar size={17} />
            Edições
          </NavItem>

          <NavItem
            href="/admin/sdc/eventos"
            active={pathname?.startsWith("/admin/sdc/eventos") ?? false}
          >
            <HiOutlineClock size={17} />
            Cronograma de Eventos
          </NavItem>

          <ExternalLink href="/sdc" target="_blank" rel="noopener noreferrer">
            <HiOutlineExternalLink size={16} />
            Portal Público
          </ExternalLink>
        </NavLinks>
      </HeaderContent>
    </SubHeader>
  );
}

export default function SDCAdminLayout({ children }: { children: ReactNode }) {
  return (
    <SDCProvider>
      <ShellContainer>
        <SDCHeaderBar />
        <main>{children}</main>
      </ShellContainer>
    </SDCProvider>
  );
}
