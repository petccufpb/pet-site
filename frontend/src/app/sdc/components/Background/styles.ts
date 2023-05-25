import styled from "styled-components";

export const BackgroundContainer = styled.div`
  position: absolute !important;
  z-index: -100;
  top: 0;
  left: 0;
  width: 1920px;
  height: 100%;
  opacity: 30%;
  overflow: hidden;

  filter: blur(200px);
  filter: url(#blur);
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='200');
  filter: url("data:image/svg+xml;utf9,<svg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'><filter%20id='blur'><feGaussianBlur%20stdDeviation='200'%20/></filter></svg>#blur");

  svg {
    position: absolute;
    fill: #0072ed;
    backface-visibility: hidden;
    translate: -20% -20%;
  }

  svg:nth-child(1) {
    top: 0;
    left: 0;
  }

  svg:nth-child(2) {
    translate: -60% 0;
    top: 20%;
    left: 100%;
  }

  svg:nth-child(3) {
    translate: 0% 0;
    top: 66%;
    left: 60%;
  }

  svg:nth-child(4) {
    translate: -60% 0;
    bottom: 0;
    left: 10%;
  }

  svg:nth-child(5) {
    translate: -60% 0;
    top: 48%;
    left: 0;
    opacity: 50%;
  }

  @media (max-width: 900px) {
    display: none;
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
