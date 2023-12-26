"use client";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-x: hidden;

  color: white;
`;

export const Description = styled.div`
  text-align: center;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > h1 {
    display: inline-block;
    font-size: 3em;
  }

  > div {
    display: inline-block;
    font-size: 1em;
    color: #ffffff85;
    font-weight: 300;
  }
`;
