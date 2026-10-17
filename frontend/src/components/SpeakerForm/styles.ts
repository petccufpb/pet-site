"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

export const AreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const Area = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1.5rem;
  row-gap: 1.5rem;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  h3 {
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
    color: #e5e7eb;
  }

  input {
    border: none;
    border-radius: 0.5rem;
    padding: 0.65rem 1rem;
    background-color: #202020;
    color: #ffffff;
    font-size: 0.95rem;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
    }
  }

  span {
    color: #f87171;
    font-size: 0.85rem;
  }
`;

const Button = styled.button`
  border-radius: 0.5rem;
  border: none;
  outline: ${({ theme }) => theme.colors["fifth-blue"]} solid 1px;
  background-color: ${({ theme }) => `${theme.colors["fifth-blue"]}75`};
  padding: 0.5rem 1rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: small;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  color: #ffffff;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SendButton = styled(Button)`
  gap: 0.5rem;
  font-size: medium;
  max-width: 13rem;
  background-color: ${({ theme }) => `${theme.colors["base-green"]}75`};
  outline-color: ${({ theme }) => theme.colors["base-green"]};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => `${theme.colors["base-green"]}60`};
  }
`;
