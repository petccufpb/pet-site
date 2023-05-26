"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 1rem;
  margin-top: 3rem;
`;

export const Dashboard = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  height: 100%;
`;

export const AreaSelector = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;

  div {
    cursor: pointer;
    transition: color 300ms ease-in-out;
  }

  div:hover {
    color: #ffffff;
  }
`;

export const AreaOption = styled.div<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? "#ffffff" : "#ffffff80")};
`;

export const InputContainer = styled.span`
  display: inline-flex;
  flex-direction: column;
  gap: 1rem;

  input {
    /*  beautiful modern tech input */
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #202020;
    color: #ffffff;

    font-size: 1rem;
  }

  input[type="number"]:focus {
    outline: 2px ${({ theme }) => theme.colors["fifth-blue"]} solid;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
  input[type="date"]::-webkit-datetime-edit-fields-wrapper {
    color: #ffffff90;
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Area = styled.div`
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  display: grid;
  flex-wrap: wrap;
  column-gap: 2rem;
  row-gap: 1rem;
`;

export const Button = styled.div`
  border-radius: 0.5rem;
  outline: ${({ theme }) => theme.colors["fifth-blue"]} solid 1px;
  background-color: ${({ theme }) => `${theme.colors["fifth-blue"]}75`};
  padding: 0.5rem 1rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: small;
  transition: all 300ms ease-in-out;
  cursor: pointer;
`;

export const SelectButton = styled(Button)<{ selected: boolean }>`
  width: 100%;
  opacity: ${({ selected }) => (selected ? "100%" : "40%")};
  filter: ${({ selected }) => (selected ? "none" : "grayscale(100%)")};
  max-width: 5rem;
`;

export const AreaContainer = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SendButton = styled(Button)`
  gap: 0.5rem;
  font-size: medium;
  max-width: 13rem;
  background-color: ${({ theme }) => `${theme.colors["base-green"]}75`};
  outline-color: ${({ theme }) => theme.colors["base-green"]};

  &:hover {
    background-color: ${({ theme }) => `${theme.colors["base-green"]}90`};
  }
`;
