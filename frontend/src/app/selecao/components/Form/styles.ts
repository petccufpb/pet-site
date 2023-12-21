"use client";

import { FaCircleNotch } from "react-icons/fa6";
import InputMask from "react-input-mask";
import styled, { keyframes } from "styled-components";

export const Container = styled.section`
  > div:first-of-type {
    h4,
    p {
      line-height: 160%;
    }

    padding: 0 1.5rem;

    h4 {
      font-family: Inter Variable;
      font-size: 1.5rem;
      color: #fff;
    }

    p {
      font-family: Bai Jamjuree;
      color: ${({ theme }) => theme.colors["sixth-grey"]};
    }
  }
`;

export const Content = styled.div`
  border-radius: 6px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent 70%);
  display: grid;
  padding: 1.5rem;
  gap: 1rem;
  position: relative;
  align-items: center;
  z-index: 1;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.3);
  border: auto 0;
  border-width: 5px;
  margin-top: 1.5rem;

  color: #e1e1e6;
  font-family: Roboto;
  line-height: 160%;

  ::before {
    z-index: -1;
    content: "";
    position: absolute;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    top: 1px;
    left: 1px;
    border-radius: 6px;
    background: ${({ theme }) => theme.colors["fourth-black"]};
  }

  > div {
    display: flex;
    flex-direction: column;
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
  display: block;
  background-color: ${({ theme }) => theme.colors["fifth-black"]};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  color: #ffffff;

  border: solid 2px transparent;
  border-radius: 6px;
  padding: calc(1rem - 2px) 1rem;
  margin-top: 0.5rem;

  ::placeholder {
    color: #7c7c8a;
  }

  :focus {
    border-color: ${({ theme }) => theme.colors["base-blue"]};
  }

  &.invalid {
    border-color: ${({ theme }) => theme.colors["base-red"]} !important;
  }
`;

export const Attachments = styled.div``;

export const Warning = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 4rem;

  margin-top: 1rem;

  gap: 0.5rem;

  p {
    color: #afafaf;
    font-family: Inter Variable;
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
    text-align: center;
    line-height: initial;
  }
`;

export const SendButton = styled.button<{ canSend: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 200ms ease-in-out;

  color: #ffffff;
  background-color: ${({ theme, canSend }) => `${theme.colors["base-green"]}${canSend ? "99" : "33"}`};
  font-family: ${({ theme }) => theme.fonts.alt};
  font-weight: 600;
  cursor: ${({ canSend }) => (canSend ? "pointer" : "default")};

  gap: 0.5rem;
  padding: 0.75rem 0;
  border-radius: 0.3rem;
  border: 1px solid ${({ theme }) => theme.colors["base-green"]};
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingIcon = styled(FaCircleNotch)`
  animation: ${spin} 1s linear infinite;
`;
