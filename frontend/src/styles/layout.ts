"use client";
import styled from "styled-components";

export const LayoutContainer = styled.main`
  background: ${({ theme }) => theme.colors["second-blue"]};
  width: 100%;
  max-width: 70rem;
  min-height: 100vh;
  margin-right: auto;
  margin-left: auto;

  @media (max-width: 70rem) {
    padding: 0 1rem;
  }
`;
