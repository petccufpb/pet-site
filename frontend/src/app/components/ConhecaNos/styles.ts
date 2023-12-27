"use client";
import styled from "styled-components";

export const ConhecaContainer = styled.div`
  background-color: #182240;
  width: 100%;
  height: 100vh;
  padding: 4rem 0;
  display: grid;
  grid-template-rows: 1fr 1fr;
  z-index: 100;
  position: relative;
`;

export const UpperSide = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const BGExtender = styled.div`
  position: absolute;
  left: calc((100vw - 70rem) / -2);
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: #182240;
  z-index: -1;
`;

export const LeftSide = styled.div`
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
  }

  > div {
    font-family: "Inter Variable", sans-serif;
  }
`;

export const RightSide = styled.div`
  margin-left: auto;
  margin-right: -10rem;

  img {
    margin-top: -4rem;
  }
`;

export const BottomSide = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 2rem 0;
  gap: 2rem;
  font-family: "Inter Variable", sans-serif;
`;

export const Card = styled.div`
  padding: 3rem 2rem;
  aspect-ratio: 1/1;
  width: 100%;
  height: 100%;
  background-color: #040422;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
