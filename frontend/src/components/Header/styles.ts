"use client";
import Link from "next/link";
import styled from "styled-components";

export const VerticalLine = styled.span`
  border-left: 1px solid ${({ theme }) => theme.colors["base-white"]};
  margin: 0 auto 0 auto;
`;

export const PETHeader = styled.header<{ isSDC: boolean }>`
  font-family: ${({ theme, isSDC }) => (isSDC ? theme.fonts.sdc : theme.fonts.alt)};
  padding: 2rem 0 2rem 0;
  display: flex;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100%;

  overflow-x: hidden;

  > nav {
    width: 100%;
  }

  > svg {
    width: 90px;
    opacity: 0.99;
  }

  @media (max-width: 768px) {
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

export const ListItem = styled.div`
  list-style: none;
  text-decoration: none;
`;

export const Route = styled.div`
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.colors["base-white"]};
`;

export const RouteLink = styled.a<{ tab: string }>`
  font-weight: ${({ tab, href }) =>
    (href === "/" ? tab === href?.toString() : tab.startsWith(href.toString())) ? "bold" : "normal"};
  color: ${({ theme }) => theme.colors["base-white"]};
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  position: relative;
  transition: filter 250ms ease-in-out;

  ::after {
    content: "";
    display: ${({ tab, href }) =>
      (href === "/" ? tab === href?.toString() : tab.startsWith(href.toString())) ? "block" : "none"};
    position: absolute;
    width: 1rem;
    bottom: -0.5rem;
    height: 4px;
    border-radius: 3rem;
    background: ${({ theme, tab }) =>
      tab.startsWith("/sdc") ? theme.colors["fifth-blue"] : theme.colors["base-blue"]};
  }

  &:hover {
    filter: ${({ tab, href }) =>
      (href === "/" ? tab === href?.toString() : tab.startsWith(href.toString()))
        ? "none"
        : "brightness(0.8)"};
  }
`;
