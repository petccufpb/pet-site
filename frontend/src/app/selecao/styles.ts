"use client";

import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5rem;

  margin-top: 6rem;

  > section {
    width: 45%;

    + section {
      width: 55%;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;

    text-align: center;

    margin-top: 3rem;

    section {
      width: 100% !important;
    }
  }
`;

export const FormDescription = styled.section`
  display: grid;
  gap: 0.5rem;

  margin-top: 5.75rem;

  div {
    display: flex;
    align-items: center;
  }

  h1 {
    color: #ffffff;
    font-family: Bai Jamjuree;
    font-size: 3.5rem;
    line-height: 120%;
  }

  p {
    color: ${({ theme }) => theme.colors["sixth-grey"]};
    font-size: 1rem;
    line-height: 140%;
  }

  @media (max-width: 480px) {
    margin-top: 0;

    svg {
      display: none;
    }
  }
`;
