"use client";
import styled from "styled-components";

export const VerticalLine = styled.span`
  border-left: 1px solid ${({ theme }) => theme.colors["base-white"]};
`;

export const PETHeader = styled.header<{ isSDC: boolean; black?: boolean }>`
  position: absolute;
  overflow-x: hidden;
  z-index: 1;

  width: 100%;
  font-family: Bai Jamjuree;
  background-color: ${({ black }) => black && "#000205e6"};

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

interface RouteLinkProps {
  active: boolean;
}

export const RouteLink = styled.a<RouteLinkProps>`
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ theme }) => theme.colors["base-white"]};
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  position: relative;
  transition: filter 250ms ease-in-out;

  ::after {
    content: "";
    display: ${({ active }) => (active ? "block" : "none")};
    position: absolute;
    bottom: -0.5rem;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 3rem;
    background: ${({ href, theme }) =>
      href?.startsWith("/sdc") ? theme.colors["fifth-blue"] : theme.colors["base-blue"]};
  }

  &:hover {
    filter: ${({ active }) => (active ? "none" : "brightness(0.8)")};
  }
`;
