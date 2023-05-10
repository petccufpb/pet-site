import styled from "styled-components";

export const BackgroundContainer = styled.div`
  position: absolute !important;
  z-index: -1;
  filter: blur(10rem);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  svg:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
  }

  svg:nth-child(2) {
    position: absolute;
    translate: -60% 0;
    top: 20%;
    left: 100%;
  }

  svg:nth-child(3) {
    position: absolute;
    translate: 0% 0;
    top: 66%;
    left: 60%;
  }

  svg:nth-child(4) {
    position: absolute;
    translate: -60% 0;
    bottom: 0;
    left: 10%;
  }

  svg:nth-child(5) {
    position: absolute;
    translate: -60% 0;
    top: 48%;
    left: 0;
    opacity: 50%;
  }
`;
