"use client";
import styled from "styled-components";

export const LayoutContainer = styled.div`
  width: 100%;
  max-width: 70rem;
  min-height: 100vh;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-rows: auto 1fr;

  @media (max-width: 70rem) {
    padding: 0 1rem;
  }
`;

export const Background = styled.div`
  width: 100vw;
  height: 100%;
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 0;

  overflow: hidden;

  svg {
    position: absolute;
    top: -20rem;
    left: 50%;

    transform: translateX(-50%);
  }
`;

export const ContainerForBackground = styled.div`
  width: 100%;
  height: 100%;
`;
