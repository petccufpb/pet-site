"use client";

import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 3rem;
  padding: 3rem 1px;
  width: calc(100% - 2px);
  overflow: hidden;
`;

export const Card = styled.div`
  background-color: #010027;
  padding: 2rem 2.5rem;
  border-radius: 1rem;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: calc(100% + 2px);
    height: 100%;
    border-radius: 1rem;
    position: absolute;
    top: -1px;
    left: -1px;
    background: linear-gradient(to bottom, #e1e1e6, rgba(0, 0, 0, 0));
    z-index: -1;
  }
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  display: flex;
  justify-content: space-between;

  h3 {
    max-width: 90%;
    text-align: right;
  }

  svg {
    height: 3em;
  }
`;

export const Description = styled.div`
  margin: 2rem 0;
  color: #a8a8b3;
  font-family: "Inter Variable", sans-serif;
  text-align: center;
`;

export const PageTitle = styled.div`
  margin-top: 2rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }

  span {
    font-family: "Inter Variable", sans-serif;
    color: #a8a8b3;
  }
`;
