"use client";

import styled from "styled-components";

export const Section = styled.div`
  padding: 0.8rem 1.2rem;

  word-break: break-word;
  overflow-x: hidden;
  display: grid;

  grid-template-rows: auto 1fr;

  width: 100%;
`;

export const Title = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
`;

export const SectionTitle = styled(Title)`
  margin-bottom: 1rem;
  width: 100%;
  text-align: left;
`;
