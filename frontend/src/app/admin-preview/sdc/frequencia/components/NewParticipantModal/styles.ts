"use client";
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  /* Acima do rodapé global (z-index 110) e abaixo dos toasts (9999) */
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
`;

export const Dialog = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 32rem;
  max-height: 100%;
  overflow-y: auto;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors["second-grey"]};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors["base-black"]};
  font-family: ${({ theme }) => theme.fonts.alt};

  h2 {
    font-size: ${({ theme }) => theme.textSizes["text-title-m"]};
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  label {
    color: ${({ theme }) => theme.colors["sixth-grey"]};
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  }

  input,
  select {
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors["second-grey"]};
    border-radius: 4px;
    background: ${({ theme }) => theme.colors["fifth-black"]};
    color: white;
    font-size: ${({ theme }) => theme.textSizes["text-regular-m"]};

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
    }
  }

  span {
    color: ${({ theme }) => theme.colors["third-red"]};
    font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;

  button {
    padding: 0.75rem 1.25rem;
    border: 1px solid ${({ theme }) => theme.colors["fifth-blue"]};
    border-radius: 6px;
    background: transparent;
    color: white;
    cursor: pointer;
    font-weight: 500;
  }

  button[type="submit"] {
    background: ${({ theme }) => theme.colors["fifth-blue"]};
  }

  button:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;
