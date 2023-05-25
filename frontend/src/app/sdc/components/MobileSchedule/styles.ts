import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const SdcScheduleContainer = styled.div`
  margin-top: 6rem;

  // Apenas renderizar se a tela é menor que 900px.
  @media (min-width: 900px) {
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
  cursor: ${({ selected }) => (selected ? "default" : "pointer")};
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

export const Table = styled.div`
  display: grid;

  > div:not(:last-child) {
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.4);
  }
`;

export const EventContainer = styled(Link)`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;

  align-items: center;
`;

export const Event = styled.div<{ available: boolean }>`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 0.5rem;

  align-items: center;
  width: 100%;

  > div:first-child,
  > div:last-child {
    color: white;
    font-weight: 500;
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  }

  > div:nth-child(even) {
    text-align: right;
  }

  > div:nth-child(odd) {
    text-align: left;
  }

  > div,
  > span {
    color: rgba(255, 255, 255, 0.6);
    font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > span {
    display: flex;
    gap: 0.3rem;
    align-items: center;

    svg {
      color: ${({ theme, available }) => (available ? theme.colors["base-green"] : theme.colors["base-red"])};
    }
  }
`;

export const SpeakerPhoto = styled(Image)`
  border-radius: 100%;
`;
