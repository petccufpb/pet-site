import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const SdcScheduleContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.sdc};
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

export const Table = styled.div`
  display: grid;

  > a:not(:last-child) {
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
  color: rgba(255, 255, 255, 0.6);

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
    font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const SpeakerPhoto = styled(Image)`
  border-radius: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

export const Availability = styled.div<{ available: boolean }>`
  display: inline-flex;
  gap: 0.2rem;
  color: ${({ theme, available }) => (available ? theme.colors["base-green"] : "inherit")};
  align-items: flex-end;

  margin-right: auto;

  border-width: 1px;
  border-bottom-style: ${({ available }) => (available ? "solid" : "none")};
  border-color: ${({ theme }) => theme.colors["base-green"]};
`;

export const DummyPicture = styled.div`
  width: 40px;
  height: 40px;
  aspect-ratio: 1/1;

  background-color: grey;
  color: #d3d3d3;

  border-radius: 100%;
`;
