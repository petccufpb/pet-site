"use client";

import styled from "styled-components";

export const Container = styled.div`
  text-align: center;

  > h1 {
    font-size: 3rem;
  }

  > div {
    font-family: "Inter", sans-serif;
    padding: 2.5rem 0;
    font-size: 1.25rem;
  }
`;

export const Divisor = styled.div`
  height: 4rem;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #ffffff50;
`;

export const SponsorsContainer = styled.span`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Contribute = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 4rem 0;
  padding-left: 2.5rem;
  height: 20rem;

  > svg {
    background-color: #285e6c;
    width: 100%;
    height: 100%;
    border-radius: 1rem;

    > ellipse {
      cx: calc(100% + 5rem);
    }
  }

  > div {
    font-family: "Lexend Variable", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    display: flex;
    position: absolute;
    align-items: center;
    gap: 1rem;
    background-color: #2e6e7e;
    border-radius: 2rem;
    padding: 0.5rem 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    right: 10.5rem;
    cursor: pointer;
    transform-origin: center;
    transition: 250ms all ease-in-out;

    &:hover {
      transform: translateY(-50%) scale(1.05);
    }
  }
`;
