"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  /* O <main> do site cresce com o conteúdo; sem esse limite a tabela empurra a página para fora da tela */
  max-width: min(72rem, calc(100vw - 2rem));
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: ${({ theme }) => theme.fonts.alt};
`;

export const Header = styled.header`
  h1 {
    font-size: ${({ theme }) => theme.textSizes["text-title-l"]};
  }

  p {
    color: ${({ theme }) => theme.colors["sixth-grey"]};
  }
`;

export const Controls = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) auto;
  gap: 0.75rem;
  align-items: start;

  > button {
    height: 100%;
    padding: 0 1.25rem;
    border: 1px solid ${({ theme }) => theme.colors["fifth-blue"]};
    border-radius: 6px;
    background: rgba(0, 114, 237, 0.2);
    color: white;
    cursor: pointer;
    font-weight: 500;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    > button {
      padding: 0.875rem;
    }
  }
`;

export const Shortcuts = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  list-style: none;
  color: ${({ theme }) => theme.colors["base-grey"]};
  font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};

  kbd {
    padding: 0.125rem 0.375rem;
    border: 1px solid ${({ theme }) => theme.colors["second-grey"]};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors["sixth-grey"]};
    font-family: inherit;
  }
`;

export const EnrollToast = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  button {
    align-self: flex-start;
    padding: 0.375rem 0.75rem;
    border: none;
    border-radius: 4px;
    background: #0072ed;
    color: white;
    cursor: pointer;
  }
`;
