"use client";
import styled from "styled-components";

export const Counter = styled.p`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors["sixth-grey"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  font-size: ${({ theme }) => theme.textSizes["text-regular-l"]};

  strong {
    color: white;
    font-size: ${({ theme }) => theme.textSizes["text-title-m"]};
  }
`;

export const Empty = styled.p`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors["base-grey"]};
  font-family: ${({ theme }) => theme.fonts.alt};
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 6px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.fonts.alt};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};

  th,
  td {
    padding: 0.75rem 1rem;
    text-align: left;
    white-space: nowrap;
  }

  th {
    color: ${({ theme }) => theme.colors["sixth-grey"]};
    font-weight: 500;
    background: ${({ theme }) => theme.colors["fifth-black"]};
  }

  tbody tr {
    border-top: 1px solid ${({ theme }) => theme.colors["line-white"]};
  }

  tr.pending {
    opacity: 0.5;
  }

  td:first-child {
    font-variant-numeric: tabular-nums;
  }
`;
