"use client";
import styled from "styled-components";

export const VerticalLine = styled.span`
  border-left: 1px solid ${({ theme }) => theme.colors["base-white"]};
`;

export const PETHeader = styled.header<{ isSDC: boolean }>`
  position: absolute;
  overflow-x: hidden;
  z-index: 1;

  width: 100%;
  font-family: Bai Jamjuree;

  padding: 2rem 0 2rem 0;

  > div {
    display: flex;
    align-items: center;

    max-width: 70rem;

    margin: 0 auto;

    > nav {
      width: 100%;
    }

    > svg {
      width: 90px;
      opacity: 0.99;
    }
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
    bottom: -0.5rem;
    width: 0.25rem;
    height: 0.25rem;
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
