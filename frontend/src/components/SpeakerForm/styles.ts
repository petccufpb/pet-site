"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

export const AreaContainer = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Area = styled.div`
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  display: grid;
  column-gap: 1rem;
  row-gap: 2rem;

  @media (max-width: 1050px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: none;
    grid-template-rows: repeat(1fr);
  }
`;

export const InputContainer = styled.span`
  display: inline-flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  overflow: hidden;

  input {
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #202020;
    color: #ffffff;
    font-size: 1rem;
  }

  span {
    color: #f87171;
    font-size: 0.875rem;
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
