"use client";
import styled from "styled-components";

export const Styling = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  width: 100%;
  height: 55rem;

  img {
    position: absolute;
    left: -8%;
    top: 0;

    width: 116%;
    height: 55rem;
  }

  @media (max-width: 468px) {
    top: 7rem;

    height: 20rem;
    text-align: center;
  }
`;
