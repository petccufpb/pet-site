"use client";
import Link from "next/link";
import styled from "styled-components";

export const VerticalLine = styled.span`
  border-left: 1px solid ${({ theme }) => theme.colors["base-white"]};
  margin: 0 auto 0 auto;
`;

export const PETHeader = styled.header`
  padding: 2rem 0 2rem 0;
  display: flex;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100%;

  overflow-x: hidden;

  > nav {
    width: 100%;
  }

  @media (max-width: 1080px) {
    display: none;
  }
`;

export const RouteList = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 2rem;

  width: 100%;
  justify-content: flex-end;
`;

export const ListItem = styled.li`
  list-style: none;
  text-decoration: none;
`;

export const Route = styled.div`
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.colors["base-white"]};
`;

export const RouteLink = styled(Link)<{ tab: string }>`
  font-weight: ${({ tab, href }) => (tab === href.toString() ? "bold" : "normal")};
  color: ${({ theme }) => theme.colors["base-white"]};
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  position: relative;
  transition: filter 250ms ease-in-out;

  ::after {
    content: "";
    display: ${({ tab, href }) => (tab === href.toString() ? "block" : "none")};
    position: absolute;
    width: 1rem;
    bottom: -0.5rem;
    height: 4px;
    border-radius: 3rem;
    background: ${({ theme, tab }) =>
      tab.startsWith("/sdc") ? theme.colors["fifth-blue"] : theme.colors["base-blue"]};
  }

  &:hover {
    filter: ${({ tab, href }) => (tab === href.toString() ? "none" : "brightness(0.8)")};
  }
`;
