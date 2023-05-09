"use client";

import styled from "styled-components";

export const Section = styled.div`
  padding: 0.8rem 1.2rem;
`;

export const Title = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
`;

export const SectionTitle = styled(Title)`
  margin-bottom: 1rem;
`;
