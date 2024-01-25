"use client";

import styled from "styled-components";

export const FeatureListContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.sdc};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  margin: 7.5rem 1em 0;
  overflow-x: hidden;
  gap: 2rem;

  @media (max-width: 900px) {
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    justify-items: start;
    grid-template-columns: 1fr;
  }
`;

export const Feature = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: center;
  overflow-x: hidden;
  gap: 0.5rem;

  > svg {
    z-index: 10;
  }

  > span {
    display: inline-flex;
    flex-direction: column;
    gap: 0.5rem;
    /* justify-content: center; */
  }

  > span > div {
    opacity: 0.6;
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  }

  > span > h3 {
    font-weight: 500;
  }

  @media (min-width: 900px) {
    max-width: 15rem;
  }
`;
