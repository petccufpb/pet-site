"use client";
import styled from "styled-components";

export const SearchContainer = styled.form`
  width: 100%;
  margin-top: 4.5rem;
  margin-bottom: 3rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;

    h3 {
      font-size: ${({ theme }) => theme.textSizes.articles["title-title-m"]};
      color: ${({ theme }) => theme.colors.articles["base-title"]};
      font-weight: 600;
    }
    span {
      font-size: ${({ theme }) => theme.textSizes.articles["text-text-s"]};
      color: ${({ theme }) => theme.colors.articles["base-span"]};
      font-family: "Inter Variable", sans-serif;
    }
  }

  input {
    width: 100%;
    padding: 1rem 2rem;
    border-radius: 0.625rem;
    background: ${({ theme }) => theme.colors.articles["base-input"]};
    border: 1px solid ${({ theme }) => theme.colors.articles["base-border"]};
    color: ${({ theme }) => theme.colors.articles["base-text"]};
    transition: 0.4s;
    font-family: "Inter Variable", sans-serif;
    font-size: 0.875rem;

    &:focus {
      border-color: ${({ theme }) => theme.colors.articles["brand-hover"]};
      outline: none;
      color: #e1e1e6;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.articles["base-label"]};
    }
  }
`;
