"use client";

import styled from "styled-components";

export const Container = styled.div`
  background-color: #182240;
  padding: 6rem 1.5rem;
  width: 100%;
`;

export const NoticiasContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;

  margin: 1rem 0;
  height: 40rem;
  width: 100%;

  > * {
    border-radius: 0.6rem;
  }
`;

export const NoticiaEmDestaque = styled.div`
  grid-column: span 2;
  background-color: #38bcde;
`;

export const Noticia = styled.div`
  background-color: #1f2f8d;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin-top: 2rem;

  > svg {
    cursor: pointer;
  }
`;
