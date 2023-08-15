"use client";
import styled from "styled-components";

export const Styling = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto;

  iframe {
    @media (max-width: 500px) {
      display: none;
    }
  }

  > a {
    text-align: center;
    margin-top: 3.5vh;

    @media (max-width: 500px) {
      margin-top: 36vh;
    }
  }
`;
