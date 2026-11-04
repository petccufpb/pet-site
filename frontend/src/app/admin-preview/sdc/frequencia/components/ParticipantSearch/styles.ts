"use client";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors["second-grey"]};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors["fifth-black"]};
  color: white;
  font-family: ${({ theme }) => theme.fonts.alt};
  font-size: ${({ theme }) => theme.textSizes["text-regular-l"]};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const Results = styled.ul`
  position: absolute;
  z-index: 10;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  max-height: 22rem;
  overflow-y: auto;
  list-style: none;
  border: 1px solid ${({ theme }) => theme.colors["second-grey"]};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors["fifth-black"]};
`;

export const Result = styled.li<{ $active?: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.alt};

  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }

  span {
    color: ${({ theme }) => theme.colors["sixth-grey"]};
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
    overflow-wrap: anywhere;
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors["second-blue"]};
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
    `}
`;

export const Badge = styled.span`
  flex-shrink: 0;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors["opacity-green"]};
  color: ${({ theme }) => theme.colors["base-green"]} !important;
  font-size: ${({ theme }) => theme.textSizes["text-bold-s"]};
  font-weight: 600;
`;
