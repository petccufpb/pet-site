"use client";
import styled from "styled-components";

export const LayoutContainer = styled.main`
  background: ${({ theme }) => theme.colors["base-black"]};
  width: 100%;
  max-width: 70rem;
  margin-right: auto;
  margin-left: auto;
`;
