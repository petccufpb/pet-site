"use client";
import Link from "next/link";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors["fourth-black"]};
  color: ${({ theme }) => theme.colors["base-white"]};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Sidebar = styled.aside<{ $collapsed: boolean; $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 60;

  display: flex;
  flex-direction: column;

  width: 16rem;
  height: 100vh;
  padding: 1.25rem 0.75rem;

  background: ${({ theme }) => theme.colors["fifth-black"]};
  border-right: 1px solid ${({ theme }) => theme.colors["line-white"]};

  transition: width 250ms ease, transform 250ms ease;

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      width: 5.25rem;
    `}

  @media (max-width: 900px) {
    width: 16rem;
    transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
    box-shadow: ${({ $open }) => ($open ? "0 0 40px rgba(0, 0, 0, 0.65)" : "none")};
  }
`;

export const Brand = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  padding: 0.25rem 0.5rem 1.25rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors["line-white"]};

  svg {
    flex-shrink: 0;
  }

  span {
    font-size: 1rem;
    font-weight: 700;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors["base-white"]};

    ${({ $collapsed }) =>
      $collapsed &&
      css`
        display: none;
      `}
  }

  @media (max-width: 900px) {
    span {
      display: inline;
    }
  }
`;

export const NavSectionLabel = styled.p<{ $collapsed: boolean }>`
  margin: 0.5rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors["base-grey"]};
  white-space: nowrap;

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      display: none;
    `}

  @media (max-width: 900px) {
    display: block;
  }
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
`;

export const NavItem = styled(Link)<{ $active: boolean; $collapsed: boolean }>`
  position: relative;

  display: flex;
  align-items: center;
  gap: 0.85rem;

  padding: 0.7rem 0.85rem;
  border-radius: 10px;

  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;

  color: ${({ $active, theme }) => ($active ? theme.colors["base-white"] : theme.colors["second-white"])};
  background: ${({ $active }) => ($active ? "rgba(0, 114, 237, 0.18)" : "transparent")};

  transition: background 200ms ease, color 200ms ease;

  svg {
    flex-shrink: 0;
    font-size: 1.3rem;
    color: ${({ $active, theme }) => ($active ? theme.colors["third-blue"] : theme.colors["second-white"])};
  }

  ${({ $active }) =>
    $active &&
    css`
      &::before {
        content: "";
        position: absolute;
        left: 0.25rem;
        top: 20%;
        height: 60%;
        width: 3px;
        border-radius: 999px;
        background: ${({ theme }) => theme.colors["fifth-blue"]};
      }
    `}

  span {
    ${({ $collapsed }) =>
      $collapsed &&
      css`
        display: none;
      `}
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: ${({ theme }) => theme.colors["base-white"]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
    outline-offset: 2px;
  }

  @media (max-width: 900px) {
    span {
      display: inline;
    }
  }
`;

export const SidebarFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors["line-white"]};

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

export const CollapseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 2.4rem;
  height: 2.4rem;
  border-radius: 8px;

  color: ${({ theme }) => theme.colors["second-white"]};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};

  transition: background 200ms ease, color 200ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: ${({ theme }) => theme.colors["base-white"]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
    outline-offset: 2px;
  }
`;

export const MobileBackdrop = styled.button`
  position: fixed;
  inset: 0;
  z-index: 50;

  background: rgba(0, 0, 0, 0.6);
  border: none;
  backdrop-filter: blur(2px);
`;

export const Content = styled.div<{ $collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 100vh;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  padding: 0.9rem 1.75rem;

  background: rgba(9, 9, 11, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors["line-white"]};
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;

  h1 {
    font-size: 1.05rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors["base-white"]};
  }
`;

export const MenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;

  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;

  color: ${({ theme }) => theme.colors["base-white"]};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
    outline-offset: 2px;
  }

  @media (max-width: 900px) {
    display: inline-flex;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

export const UserMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  padding: 0.35rem 0.75rem 0.35rem 0.4rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};

  svg {
    color: ${({ theme }) => theme.colors["third-blue"]};
  }

  div {
    display: flex;
    flex-direction: column;
    line-height: 1.2;

    strong {
      font-size: 0.85rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors["base-white"]};
    }

    span {
      font-size: 0.7rem;
      color: ${({ theme }) => theme.colors["second-white"]};
    }
  }

  @media (max-width: 560px) {
    div {
      display: none;
    }
  }
`;

export const HeaderButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;

  padding: 0.5rem 0.9rem;
  border-radius: 8px;

  font-size: 0.85rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-decoration: none;
  white-space: nowrap;

  color: ${({ theme }) => theme.colors["base-white"]};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};

  transition: background 200ms ease, color 200ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
    outline-offset: 2px;
  }
`;

export const LogoutButton = styled(HeaderButton)`
  color: #ff8f8f;
  border-color: rgba(206, 74, 74, 0.35);

  &:hover {
    background: rgba(206, 74, 74, 0.15);
  }
`;

export const Main = styled.main<{ $fullWidth?: boolean }>`
  flex: 1;

  width: 100%;
  max-width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "76rem")};
  margin: 0 auto;
  padding: ${({ $fullWidth }) => ($fullWidth ? "0" : "2rem 1.75rem 3.5rem")};

  @media (max-width: 900px) {
    padding: ${({ $fullWidth }) => ($fullWidth ? "0" : "1.5rem 1rem 3rem")};
  }
`;

export const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  min-height: 100vh;
  color: ${({ theme }) => theme.colors["second-white"]};
`;

export const Spinner = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;

  border: 3px solid rgba(255, 255, 255, 0.12);
  border-top-color: ${({ theme }) => theme.colors["fifth-blue"]};

  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
