import styled from "styled-components";

export const PostsListContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
  gap: 2rem;
  margin-bottom: 14rem;
`;

export const ArticleContainer = styled.div`
  padding-top: 5rem;
  max-width: 55rem;
  width: 100%;
  margin: 0 auto;
`;
