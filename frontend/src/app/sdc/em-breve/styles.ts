"use client";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h1 {
    font-size: 5rem;
  }

  > div {
    color: #ffffff80;
    font-weight: 300;
  }

  @media (max-width: 1050px) {
    h1 {
      font-size: 4rem;
    }

    text-align: center;
  }
`;
