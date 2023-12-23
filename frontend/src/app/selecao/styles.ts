"use client";

import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5rem;

  margin-top: 13rem;

  @media (max-width: 35rem) {
    padding: 2rem 0;
  }

  > section {
    width: 45%;

    + section {
      width: 55%;
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
    line-height: 140%;
  }
`;
