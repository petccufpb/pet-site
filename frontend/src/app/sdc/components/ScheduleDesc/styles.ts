"use client";

import styled from "styled-components";

export const ScheduleTitle = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.textSizes["text-title-xl"]};
  color: #0072ed;
  margin: 0.5rem 0;
  font-weight: 500;
`;

export const ScheduleDescContainer = styled.div`
  margin-bottom: 7rem;
  div {
    text-align: center;
  }

  > div:nth-child(1) {
    margin-bottom: 0;
  }
`;

export const ScheduleSubtitle = styled.div`
  opacity: 80%;
  font-size: 0.9em;
`;
