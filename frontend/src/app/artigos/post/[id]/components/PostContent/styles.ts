"use client";
import styled from "styled-components";

export const PostContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.5rem 2rem;
  margin-bottom: 8rem;
  font-weight: 400;

  img {
    width: 100%;
  }

  h1,
  h2,
  h3 {
    color: ${({ theme }) => theme.colors.articles["external-link"]};
    font-family: "Lexend", sans-serif;
  }

  ul {
    list-style: inherit;
    padding-left: 1.5rem;
  }

  p {
    color: #d1d1d4;
  }

  pre {
    background-color: ${({ theme }) => theme.colors.articles["base-post"]};
    padding: 1rem;
    border-radius: 5px;

    > div {
      background: none !important;
      padding: 0 !important;
      margin: 0 !important;

      code {
        font-family: "FiraCode", monospace !important;
        line-height: 180% !important;
      }
    }
  }
`;
