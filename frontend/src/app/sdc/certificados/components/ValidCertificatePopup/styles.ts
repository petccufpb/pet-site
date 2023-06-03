"use client";

import styled from "styled-components";

export const CertificateContainer = styled.div<{ isClosing: boolean }>`
  animation: ${({ isClosing }) => (isClosing ? "fadeout" : "fadein")} 0.3s ease-in-out;
  opacity: ${({ isClosing }) => (isClosing ? 0 : 1)};

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  color: white;

  > div {
    display: inline-flex;
    flex-direction: column;
    gap: 1rem;

    h1 {
      font-size: 4em;
      color: white;
    }

    > span {
      color: #ffffff80;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      font-weight: 300;
      overflow-x: hidden;
    }
  }

  @media (max-width: 900px) {
    gap: 1rem;

    div {
      h1 {
        font-size: 2.5em;
      }
    }
  }
`;

export const ClickMe = styled.div`
  border-bottom: 1px solid white;
  cursor: pointer;
`;

export const CheckContainer = styled.div`
  position: relative;
  > svg {
    color: ${({ theme }) => theme.colors["base-green"]};
  }

  @media (max-width: 900px) {
    > svg {
      width: 7em;
    }
  }
`;

export const SVGBlur = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: -1;
  padding: 12rem;
  border-radius: 100%;
  background: radial-gradient(
    circle at center,
    ${({ theme }) => theme.colors["base-green"]}15,
    transparent 70%
  );
`;
