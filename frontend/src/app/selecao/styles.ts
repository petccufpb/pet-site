"use client";

import styled from "styled-components";

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(31rem, 1fr));
  width: 100%;
  height: 100%;
  padding: 2rem;
  gap: 4rem;
`;

export const FormDescription = styled.div`
  display: grid;
  width: 100%;
  margin: auto 0;
  gap: 0.5rem;

  span {
    display: flex;
    margin-bottom: 0.5rem;
    align-items: center;
  }
`;
