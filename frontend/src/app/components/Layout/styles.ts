import styled from "styled-components";

export const LayoutContainer = styled.div`
  flex: 1;

  width: 100%;
  max-width: 70rem;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-rows: auto 1fr;

  font-family: "Inter Variable", sans-serif;

  padding-top: 7rem;

  @media (max-width: 70rem) {
    padding: 0 1rem;
  }
`;

export const Background = styled.div<{ limited?: boolean }>`
  width: 100vw;
  height: ${({ limited }) => (limited ? "85vh" : "100%")};
  position: absolute;
  z-index: -1;
  left: 0;
  /* ${({ limited }) => (limited ? "top: 0" : "bottom: 0")} */

  overflow: hidden;

  svg {
    position: absolute;
    left: 50%;

    ${({ limited }) => (limited ? "top: -50%" : "top: -20rem")};

    transform: translateX(-50%);
  }
`;

export const ContainerForBackground = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export const FishesHider = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(to top, #000000, #00000000);
`;

export const WavesContainer = styled.div`
  position: absolute;
  bottom: 0;
  /* left: 50%; */
  width: 150vw;
  opacity: 0.05;
  z-index: -1;
  transform: translateX(0%);
`;

export const WavesBackgroundMasker = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: linear-gradient(to bottom, #000000 30%, #00000000);
`;
