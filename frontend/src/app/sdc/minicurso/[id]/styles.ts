"use client";

import styled from "styled-components";

export const MinicursoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  height: 100%;

  h1 {
    font-size: 3.5rem !important;
    font-weight: 800;
  }

  > h3 {
    font-weight: 400;
    color: ${({ theme }) => theme.colors["sixth-grey"]};
    font-family: ${({ theme }) => theme.fonts.sdc};
  }

  @media (min-width: 1051px) {
    > div {
      transform: translateX(-1rem);
    }
  }

  @media (max-width: 1050px) {
    text-align: center;

    h1 {
      display: none;
    }
  }
`;

export const FormContainer = styled.div`
  margin: auto 0;
  display: grid;
  gap: 1rem;

  @media (max-width: 1050px) {
    margin-top: 1rem;
  }
`;

export const SpeakerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  text-align: center;
  overflow-x: hidden;

  h2 {
    overflow-wrap: break-word;
    overflow-x: hidden;
    width: 100%;
  }

  img {
    border-radius: 100%;
    object-fit: cover;
  }

  > div {
    color: #a9a9b2;
    font-family: ${({ theme }) => theme.fonts.sdc};
  }
`;
