"use client";

import styled from "styled-components";

export const Container = styled.div<{
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
  hasUpload: boolean;
}>`
  width: 100%;
  background: linear-gradient(to right, ${({ theme }) => theme.colors["fourth-blue"]}, transparent);
  outline: 2px dashed
    ${({ theme, isDragActive }) => (isDragActive ? theme.colors["base-white"] : theme.colors["base-grey"])};
  padding: 0.8rem;
  border-radius: 0.5rem;
  color: ${({ isDragActive, theme }) =>
    isDragActive ? theme.colors["base-white"] : theme.colors["base-grey"]};
  position: relative;
  transition: color, outline-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }

  /* 
    Essa div é criada para fazer com que o background seja afetado pela transição também.
    Por padrão, CSS não faz transição com gradientes, por isso, deixarei um gradiente fixo
    que vai da cor do container do formulário até transparente, e apenas o que mudará será a cor que está
    atrás desse gradiente. Sendo uma cor fixa, ela será afetada pela transição.
  */
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ isDragReject, isDragAccept, theme, hasUpload }) =>
      isDragReject
        ? theme.colors["third-red"]
        : isDragAccept || hasUpload
        ? theme.colors["base-green"]
        : "none"};
    transition: background-color;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
    opacity: 0.4;
    z-index: -1;
  }
`;
