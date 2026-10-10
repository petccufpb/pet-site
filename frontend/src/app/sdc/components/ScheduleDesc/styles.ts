"use client";

import { Title } from "@app/sdc/styles";
import styled from "styled-components";

export const ScheduleTitle = styled.div`
  width: 100%;
  font-size: 2.25rem;
  color: #0072ed;
  margin: 0.5rem 0;
  font-weight: 500;

  font-family: Bai Jamjuree;
`;

export const SectionTitle = styled(Title)`
  margin-bottom: 1rem;
  font-size: 0.75rem;
  width: 100%;
  text-align: left;
  letter-spacing: 1px;
`;

export const ScheduleDescContainer = styled.div`
  margin-top: 5rem;

  div {
    text-align: center;
  }

  > div:nth-child(1) {
    margin-bottom: 0;
  }
`;

export const ScheduleSubtitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.alt};
  opacity: 80%;
  font-size: 0.875em;
`;

export const Informative = styled.div`
  padding: 0.5em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1ch;

  width: fit-content;
  margin: auto;
  margin-top: 2em;

  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  color: ${({ theme }) => theme.colors["base-blue"]};
  font-weight: 600;

  border: 2px solid ${({ theme }) => theme.colors["base-blue"]};
  border-radius: 25px;
`;
