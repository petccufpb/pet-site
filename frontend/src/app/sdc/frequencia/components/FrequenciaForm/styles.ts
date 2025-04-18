"use client";

import styled from "styled-components";

export const FormContainer = styled.form<{ borderType: "static" | "gradient" }>`
  font-family: ${({ theme }) => theme.fonts.sdc};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  border-radius: 0.5rem;
  width: min(100%, 31rem);
  background: ${({ borderType }) =>
    borderType === "static"
      ? "#323238"
      : "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), transparent 70%)"};
  display: grid;
  padding: 2rem;
  gap: 1.2rem;
  position: relative;
  align-items: center;
  z-index: 1;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.3);
  border: auto 0;
  margin: auto;
  color: #e1e1e6;

  ::before {
    z-index: -1;
    content: "";
    position: absolute;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    top: 1px;
    left: 1px;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.colors["fourth-black"]};
  }

  input,
  p {
    width: 100%;
    background-color: ${({ theme }) => theme.colors["fifth-black"]};
    border-radius: 0.5rem;
    padding: 1rem;
    border: none;
    outline: none;
    color: white;
    font-family: inherit;
    font-size: inherit;
    overflow-wrap: anywhere;

    ::placeholder {
      color: ${({ theme }) => theme.colors["fifth-grey"]};
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  > span {
    min-height: 1em;
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
    color: #d5232d;
  }
`;

export const ButtonContainer = styled.div<{ type: "normal" | "cancel" }>`
  display: flex;
  justify-content: ${({ type }) => (type === "cancel" ? "flex-end" : "stretch")};
  gap: 2rem;

  > button,
  a {
    width: ${({ type }) => (type === "cancel" ? "auto" : "100%")};
  }

  > button:disabled {
    opacity: 40%;
    cursor: not-allowed;
  }
`;

export const ConfirmButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors["base-green"]};
  background: rgba(4, 211, 97, 0.2);
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: 450ms;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const CancelButton = styled.a`
  background: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  border: none;
  display: flex;
  align-items: center;
`;

export const DateContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.sdc};
  display: flex;
  gap: 1rem;
  padding-bottom: 1.3rem;
  border-bottom: 1px solid #323238;
  font-size: ${({ theme }) => theme.textSizes["text-regular-m"]};

  > span {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  svg {
    color: #a9a9b2;
  }
`;

export const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  gap: 1em;
  cursor: pointer;
`;

export const CheckBox = styled.div<{ enabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.2em;
  border: 2px solid ${({ theme, enabled }) => (enabled ? theme.colors["base-green"] : "grey")};
  width: 1rem;
  height: 1rem;

  background: ${({ enabled }) => (enabled ? "rgba(4, 211, 97, 0.2)" : "transparent")};

  svg {
    visibility: ${({ enabled }) => (enabled ? "visible" : "hidden")};
  }
`;
