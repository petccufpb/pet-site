"use client";

import { FaSpinner } from "react-icons/fa";
import styled from "styled-components";

export const Members = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 70rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 50rem) {
    grid-template-columns: 1fr;
  }
`;

export const SectionTitle = styled.h1`
  margin-top: 2rem;
`;

export const LoadingIconContainer = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  padding: 2rem;
`;

export const LoadingIcon = styled(FaSpinner)`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation-name: spin;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;
