import styled from "styled-components";

export const PostHider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  transition: opacity 650ms ease-in-out;

  background: linear-gradient(to top, #010027, #010027c7 60%, #01002700);
`;

export const PostContainer = styled.a`
  width: 100%;
  max-width: 500px;
  height: 12rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.articles["base-post"]};
  border: 2px solid ${({ theme }) => theme.colors.articles["base-post"]};
  padding: 1.5rem;
  transition: 0.4s;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.articles["base-label"]};

    ${PostHider} {
      opacity: 0;
    }
  }

  div {
    display: flex;
    gap: 1rem;

    strong {
      flex: 1;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.articles["base-title"]};
      font-family: "Lexend Variable", sans-serif;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    span {
      width: max-content;
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.articles["base-text"]};
      font-family: "Inter Variable", sans-serif;
    }
  }

  p {
    //não passar de 4 linhas o texto de forma vertical, aplicando "..." string como continuação textual
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    color: #e1e1e6;
    font-size: 0.75rem;
    position: relative;
  }
`;
