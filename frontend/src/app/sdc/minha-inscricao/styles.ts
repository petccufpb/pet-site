"use client";
import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  span {
    color: #d5232d;
    font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};
  }

  select {
    color: white;
    background-color: ${({ theme }) => theme.colors["fifth-black"]};
  }
`;

export const Container = styled.div`
  font-family: ${({ theme }) => theme.fonts.alt};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  border-radius: 0.5rem;
  width: min(100%, 31rem);
  max-height: 42rem;
  border: 1px solid #323238;
  display: grid;
  padding: 2rem;
  gap: 1.2rem;
  position: relative;
  align-items: center;
  z-index: 1;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.3);
  margin: 0 auto;

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

  input {
    width: 100%;
    background-color: ${({ theme }) => theme.colors["fifth-black"]};
    border-radius: 0.5rem;
    padding: 1rem;
    border: none;
    outline: none;
    color: white;
    font-family: inherit;
    font-size: inherit;

    ::placeholder {
      color: ${({ theme }) => theme.colors["fifth-grey"]};
    }
  }

  button {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors["base-green"]};
    background: rgba(4, 211, 97, 0.2);
    font-family: inherit;
    font-size: inherit;
    color: white;
    padding: 0.8rem 0;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:disabled {
      opacity: 40%;
      cursor: not-allowed;
    }
  }

  @media (max-width: 900px) {
    padding: 2rem 1rem;
  }
`;
