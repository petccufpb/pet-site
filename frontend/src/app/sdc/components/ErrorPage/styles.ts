"use client";
import styled from "styled-components";

export const ErrorPageContainer = styled.div`
  width: 100%;
  height: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > span {
    font-size: 3.5rem;
    font-weight: bold;
  }

  > div {
    color: #ffffff80;
    font-weight: 300;
  }

  a {
    font-size: 0.9em;
    color: #ffffff95;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    border-bottom: 1px solid #ffffff95;
  }

  @media (max-width: 1050px) {
    h1 {
      font-size: 4rem;
    }

    text-align: center;
  }
`;
