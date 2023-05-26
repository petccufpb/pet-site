import styled from "styled-components";

export const BackgroundContainer = styled.div`
  position: absolute !important;
  z-index: -100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("/images/sdc-background.svg");
  background-size: 100% 100%;

  svg {
    fill: #0072ed;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 900px) {
    background-image: url("/images/sdc-background-sm.svg");
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
