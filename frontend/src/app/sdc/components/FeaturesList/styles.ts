import styled from "styled-components";

export const FeatureListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  margin: 7.5rem 1em;
  gap: 2rem;
`;

export const Feature = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  > div > div {
    opacity: 0.6;
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  }

  > div > h3 {
    font-weight: 500;
  }
`;
