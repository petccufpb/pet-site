import Link from "next/link";
import styled from "styled-components";

export const PostContainer = styled.a`
  width: 100%;
  height: 16.25rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.articles["base-post"]};
  border: 2px solid ${({ theme }) => theme.colors.articles["base-post"]};
  padding: 2rem;
  transition: 0.4s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.articles["base-label"]};
  }

  div {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.25rem;

    strong {
      flex: 1;
      font-size: ${({ theme }) => theme.textSizes.articles["title-title-m"]};
      color: ${({ theme }) => theme.colors.articles["base-title"]};
      font-family: "Lexend", sans-serif;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    span {
      width: max-content;
      font-size: ${({ theme }) => theme.textSizes.articles["text-text-s"]};
      color: ${({ theme }) => theme.colors.articles["base-span"]};
    }
  }

  p {
    //não passar de 4 linhas o texto de forma vertical, aplicando "..." string como continuação textual
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    color: #ffffff60;
  }
`;
