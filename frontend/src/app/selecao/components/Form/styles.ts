"use client";

import InputMask from "react-input-mask";
import styled from "styled-components";

export const Content = styled.div`
  border-radius: 1rem;
  width: min(100%, 31rem);
  max-height: 42rem;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent 70%);
  display: grid;
  padding: 3rem;
  gap: 3rem;
  position: relative;
  align-items: center;
  z-index: 1;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.3);
  border: auto 0;
  margin: auto;

  ::before {
    z-index: -1;
    content: "";
    position: absolute;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    top: 1px;
    left: 1px;
    border-radius: 1rem;
    background: ${({ theme }) => theme.colors["fourth-blue"]};
  }
`;

export const InputContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
  background-color: ${({ theme }) => theme.colors["third-black"]};
  border-radius: 0.3rem;
  padding: 0 1.2rem;
  border: solid 2px transparent;
  color: ${({ theme }) => theme.colors["base-grey"]};
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;

  :has(input:focus) {
    color: ${({ theme }) => theme.colors["base-blue"]};
    border-color: ${({ theme }) => theme.colors["base-blue"]};

    &.valid {
      border-color: ${({ theme }) => theme.colors["base-green"]} !important;
    }

    &.invalid {
      border-color: ${({ theme }) => theme.colors["base-red"]} !important;
    }
  }

  &.valid {
    color: ${({ theme }) => theme.colors["base-green"]} !important;
  }

  &.invalid {
    color: ${({ theme }) => theme.colors["base-red"]} !important;
  }
`;

export const MaskedFormInput = styled(InputMask)`
  width: 100%;
  border: none;
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  color: ${({ theme }) => theme.colors["base-grey"]};
  padding: 1rem 0;
  background: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :focus {
    color: ${({ theme }) => theme.colors["base-white"]};
  }
`;

export const FormInput = styled.input`
  width: 100%;
  border: none;
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  color: ${({ theme }) => theme.colors["base-grey"]};
  padding: 1rem 0;
  background: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :focus {
    color: ${({ theme }) => theme.colors["base-white"]} !important;
  }
`;

export const UploadTitle = styled.h2`
  text-align: center;
`;

export const Warning = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 0 1.5rem;

  place-items: center;
  gap: 0.5rem;

  div {
    color: ${({ theme }) => theme.colors["base-grey"]};
    text-align: center;
    font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};
  }

  svg {
    color: ${({ theme }) => theme.colors["base-red"]};
  }
`;

export const SendButton = styled.button<{ canSend: boolean }>`
  display: flex;
  gap: 1rem;
  justify-content: center;
  place-items: center;
  padding: 0.9rem 3rem;
  border-radius: 0.3rem;
  border: none;
  background: ${({ theme }) => theme.colors["third-black"]};
  color: ${({ theme, canSend }) => (canSend ? theme.colors["base-green"] : theme.colors["base-grey"])};
  font-weight: 600;
  margin: 0 auto;
  cursor: ${({ canSend }) => (canSend ? "pointer" : "default")};
  font-family: ${({ theme }) => theme.fonts.alt};
  transition: color 200ms ease-in-out;
`;

export const FormSection = styled.div`
  display: grid;
  gap: 1.5rem;
`;
