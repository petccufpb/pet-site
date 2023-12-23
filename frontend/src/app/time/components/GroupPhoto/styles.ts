"use client";
import styled from "styled-components";

export const groupPhotoHeight = "55rem";

export const Styling = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  width: 100%;
  height: ${groupPhotoHeight};

  img {
    position: absolute;
    left: -8%;
    top: 0;

    width: 116%;
    height: ${groupPhotoHeight};
  }

  > div {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    background-color: #000205e6;

    padding: 2rem 0;

    div {
      @keyframes bounce {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-15%);
        }
        100% {
          transform: translateY(0);
        }
      }

      position: absolute;
      left: 50%;
      top: -38%;
      z-index: 2;
      cursor: pointer;

      animation: bounce 2s ease infinite;
      border: 1px solid #afafaf;
      border-radius: 1rem;

      padding: 1rem 0.5rem;

      svg {
        color: #afafaf;
      }
    }

    p {
      position: relative;
      z-index: 2;

      font-family: Bai Jamjuree;
      font-size: 3rem;
      font-style: italic;
      font-weight: bold;

      :after {
        position: absolute;
        left: 0;

        content: "Nós somos o PET Computação!";
        filter: blur(20.25px);
      }
    }
  }
`;

export const EllipseBlur = styled.i`
  position: absolute;
  bottom: -35%;
  left: calc(50% - 61rem / 2);
  z-index: 1;

  height: 38.5rem;
  width: 61rem;

  background-color: ${({ theme }) => theme.colors["fifth-blue"]};
  filter: blur(275px);
`;
