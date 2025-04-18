"use client";

import styled from "styled-components";

export const FrequenciaContainer = styled.div`
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
    margin-bottom: 1rem;
  }

  span:first-child {
    transform: translateX(-1rem);
  }

  button {
    display: inline-block;
    color: white;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.colors["fifth-blue"]};
    background: rgba(0, 114, 237, 0.2);
    max-width: 16rem;
    width: 100%;
    padding: 0.7rem 0;
    gap: 0.5rem;
    border-radius: 0.5rem;
    transition: 450ms;
    font-family: ${({ theme }) => theme.fonts.alt};

    &:hover {
      filter: brightness(0.8);
    }
  }

  @media (max-width: 1050px) {
    display: none;
  }
`;

export const FormContainer = styled.div`
  margin: auto 0;
  display: grid;
  gap: 1rem;
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
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 100%;
  }

  > div {
    color: #a9a9b2;
    font-family: ${({ theme }) => theme.fonts.sdc};
  }
`;

export const LocationWarning = styled.span`
  font-weight: 300;
  display: flex;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors["base-green"]};
  align-items: center;
`;
