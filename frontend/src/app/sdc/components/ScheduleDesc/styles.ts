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
