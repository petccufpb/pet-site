"use client";

import styled from "styled-components";

export const DevelopersContainer = styled.div<{ color?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-bottom: 2rem;

  gap: 0.5rem;

  div {
    font-weight: bold;
    color: ${({ color }) => color || "#e1f9ff60"};
    font-family: ${({ theme }) => theme.fonts.sdc};
  }

  @media (max-width: 768px) {
    padding-bottom: 0.5rem;
  }
`;

export const DevelopersItem = styled.div`
  display: flex;

  a:not(:first-child) {
    margin-left: -0.5rem;
  }

  img {
    border-radius: 100%;
    border: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
  }

  /* Fazer as imagens terem ordem reversa de z-index */
  a:nth-child(1) {
    z-index: 3;
  }

  a:nth-child(2) {
    z-index: 2;
  }

  a:nth-child(3) {
    z-index: 1;
  }

  a:nth-child(4) {
    z-index: 0;
  }
`;
