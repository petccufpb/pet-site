"use client";
import styled from "styled-components";

export const SdcScheduleContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.sdc};
  margin-top: 5.5rem;

  // Apenas renderizar se a tela é maior que 900px.
  @media (max-width: 900px) {
    display: none;
  }
`;

export const ScheduleContainer = styled.div`
  display: grid;
`;

export const DaySelector = styled.div`
  display: flex;
  gap: 1.3rem;
  margin-bottom: 2rem;
`;

export const Day = styled.div<{ selected: boolean }>`
  cursor: pointer;
  background: ${({ selected }) => (selected ? "rgba(0, 114, 237, 0.2)" : "rgba(34, 34, 34, 0.6)")};
  border-radius: 2rem;
  border: 1px solid;
  border-color: ${({ selected, theme }) =>
    selected ? theme.colors["fifth-blue"] : theme.colors["fourth-grey"]};
  padding: 0.3rem;
  max-width: 5.8rem;
  width: 100%;
  text-align: center;
  font-weight: 300;
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  transition: 450ms;

  &:hover {
    filter: ${({ selected }) => (selected ? "" : "brightness(.8)")};
  }
`;

export const Table = styled.table`
  font-family: ${({ theme }) => theme.fonts.sdc};
  width: 100%;
  color: rgba(255, 255, 255, 0.6);

  // Linhas
  tr {
    display: grid;
    grid-template-columns: 2fr 4fr 1fr 1fr 2fr 2.2fr;
    text-align: center;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);

    // Primeira coluna de cada linha
    th:first-child {
      text-align: left;
      color: white;
      font-weight: 600;
    }
  }

  // Primeira linha (legenda)
  tr:first-child {
    font-weight: 500;
    color: white;
  }

  // Colunas
  th {
    overflow-x: hidden;
    word-break: break-word;
    font-weight: 300;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    position: relative;

    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};

    > div {
      margin-right: 20px;
    }

    button {
      position: absolute;
      right: 0;

      color: #fff9;

      &:hover {
        color: #fff;
      }

      &:active {
        color: #fff6;
      }
    }

    // *PALESTRA*
    b {
      font-weight: 600;
    }
  }

  th:first-child {
    justify-content: start;
  }

  tr:last-child {
    border-bottom-style: none;
  }
`;
