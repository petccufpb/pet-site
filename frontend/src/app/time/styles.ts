"use client";
import styled from "styled-components";

export const Styling = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: calc(55rem - 7rem);

  @media (max-width: 480px) {
    padding-top: 13rem;
  }
`;
