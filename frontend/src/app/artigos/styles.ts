import styled from "styled-components";

export const PostsListContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  height: 38rem;
`;

export const ArticleContainer = styled.div`
  padding-top: 3rem;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 7rem;
  z-index: 100;

  * {
    z-index: 100;
  }
`;
