"use client";

import styled from "styled-components";

export const MinicursoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  align-items: start;
  justify-content: center;
  padding-top: 7rem;
`;

export const DescriptionContainer = styled.div`
  display: grid;
  gap: 1rem;

  h1 {
    font-size: 3.5rem !important;
    font-weight: 800;
  }

  > h3 {
    font-weight: 400;
    color: ${({ theme }) => theme.colors["sixth-grey"]};
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
    padding: 1rem 0;
    gap: 0.5rem;
    border-radius: 0.5rem;
    transition: 450ms;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

export const FormContainer = styled.div`
  display: grid;
  gap: 1rem;
`;

export const SpeakerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.5rem;

  img {
    border-radius: 100%;
  }

  > div {
    color: #a9a9b2;
  }
`;
