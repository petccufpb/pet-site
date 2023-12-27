"use client";
import { Flex } from "@app/styles";
import styled from "styled-components";

export const Card = styled(Flex)<{ index: number; highlighted: boolean; zIndex: number }>`
  flex-direction: column;
  width: 390px;
  height: 450px;
  position: absolute;
  left: ${({ index }) => index * 90}px;
  background: ${({ highlighted }) => (highlighted ? "#e1e1e6" : "black")};
  color: ${({ highlighted }) => (highlighted ? "black" : "#e1e1e6")};
  transition: 0.2s;
  transition-property: transform background color;
  transition-timing-function: ease-out;
  z-index: ${({ zIndex, highlighted }) => (highlighted ? 100 : zIndex)};
  ${({ highlighted }) => highlighted && "border: 1px solid #0000004d;"}

  &:hover {
    transform: scale(1.035);
    z-index: 10;
  }
`;

export const CardHeader = styled.div`
  height: 90px;
  width: 100%;
  border-bottom: 1px solid #0000004d;
  font-family: "Bai Jamjuree", sans-serif;
  display: flex;
`;

export const CardTitle = styled.h1`
  padding: 1.5rem;
  font-weight: bold;
  color: black;
  font-size: 1.5rem;
  margin: auto 0;
`;

export const CardIndex = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 2rem;
  border-right: 1px solid #0000004d;
`;
