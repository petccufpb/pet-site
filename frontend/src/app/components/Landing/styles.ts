"use client";
import styled from "styled-components";

export const LandingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 10rem;
  padding-bottom: 3rem;

  font-family: "Lexend Variable", sans-serif;
  font-weight: 400;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #e1e1e6;
  width: 100%;
  position: relative;
  padding-top: 3rem;

  svg {
    position: absolute;
    left: calc(calc(calc(100vw - 70rem) / 2) * -1);
    top: -320px;
    z-index: -1;
  }

  div:first-of-type {
    color: #a8a8b3;
    font-weight: 400;
  }

  h1 {
    font-size: 4rem;
    font-weight: 600;
    line-height: 4.2rem;
  }

  a {
    margin-top: 3rem;
    background-color: #263b9c;
    color: white;
    padding: 0.8rem 3rem;
    display: inline;
    margin-right: auto;
    border-radius: 4rem;
    transition: background-color 250ms;

    &:hover {
      background-color: #1f2e8c;
    }
  }
`;

export const RightSide = styled.div`
  margin-right: -15rem;
  position: relative;

  width: min-content;

  svg {
    height: min-content;
  }
`;

export const BackgroundDaSilva = styled.svg`
  position: absolute;
  bottom: -15rem;
  left: -3rem;
  z-index: -1;
`;
