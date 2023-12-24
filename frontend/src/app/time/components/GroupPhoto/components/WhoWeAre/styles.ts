"use client";
import styled from "styled-components";

export const Styling = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;

  width: 100vw;
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
    left: calc(50% - 2rem / 2);
    top: -35%;
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
      top: 0;

      content: "Nós somos o PET Computação!";
      filter: blur(20.25px);
    }
  }

  @media (max-width: 468px) {
    position: relative;

    padding: 1rem 0;
    margin-left: -1rem;

    div {
      top: -75%;

      background-color: #00020555;
    }

    p {
      font-size: 1.5rem;
    }
  }
`;

export const EllipseBlur = styled.i`
  position: absolute;
  bottom: calc(-61rem / 2.5);
  left: calc(50% - 61rem / 2);
  z-index: 1;

  height: 38.5rem;
  width: 61rem;

  background-color: ${({ theme }) => theme.colors["fifth-blue"]};
  filter: blur(275px);

  @media (max-width: 468px) {
    height: 15rem;
    width: 30rem;
  }
`;
