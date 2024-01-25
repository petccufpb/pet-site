"use client";
import styled from "styled-components";

export const BackgroundContainer = styled.div`
  position: absolute !important;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  overflow: hidden;

  display: flex;
  justify-content: center;

  > * {
    max-width: 100%;
  }
`;

export const Grid = styled.div`
  position: absolute !important;
  z-index: -1;
  top: 10%;
  left: 15%;

  svg {
    position: absolute;
    z-index: -1;
  }
`;

export const SVGBackground = styled.svg`
  background: black;
  opacity: 30%;
  width: 100%;
  height: 100%;
  z-index: -10;
  /* max-width: 1920px; */
  margin: 0 auto;

  overflow-x: visible;
`;

export const GlowEllipse = styled.ellipse`
  @media (max-width: 1050px) {
    rx: 400;
    ry: 400;

    rx: 400px;
    ry: 400px;
  }
`;
