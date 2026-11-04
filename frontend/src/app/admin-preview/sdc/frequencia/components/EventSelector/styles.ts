"use client";
import styled from "styled-components";

export const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors["second-grey"]};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors["fifth-black"]};
  color: white;
  font-family: ${({ theme }) => theme.fonts.alt};
  font-size: ${({ theme }) => theme.textSizes["text-regular-m"]};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
  }
`;
