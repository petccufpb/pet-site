"use client";

import styled from "styled-components";

export const Container = styled.div<{
  isErrored: boolean;
  isDragActive: boolean;
  isDragAccept: boolean;
  hasUpload: boolean;
}>`
  background-image: ${({ hasUpload, isErrored, theme }) =>
    `url("data:image/svg+xml,<svg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23${
      isErrored ? theme.colors["base-red"].slice(1) : hasUpload ? "ffffff" : "afafaf"
    }' stroke-width='2' stroke-dasharray='12%2c14' stroke-dashoffset='27' stroke-linecap='square'/></svg>")`};
  border-radius: 6px;
  padding: 1rem;
  position: relative;
  transition: color, outline-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  cursor: pointer;

  font-size: 0.875rem;

  margin-top: 0.5rem;

  svg,
  span {
    color: ${({ hasUpload, isErrored, theme }) =>
      isErrored ? theme.colors["base-red"] : hasUpload ? "#ffffff" : "#afafaf"};
  }

  span {
    font-family: Roboto;

    margin-left: 0.5rem;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    span + svg {
      width: 1.5rem !important;
      height: 1.5rem !important;

      margin-left: 0.5rem;
    }
  }
`;
