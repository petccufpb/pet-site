import styled from "styled-components";

export const FeatureListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  margin: 7.5rem 1em;
  overflow-x: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Feature = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: center;
  overflow-x: hidden;
  gap: 0.5rem;
  max-width: 15rem;

  > svg {
    z-index: 10;
  }

  > span {
    display: inline-flex;
    flex-direction: column;
    gap: 0.5rem;
    /* justify-content: center; */
  }

  > span > div {
    opacity: 0.6;
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  }

  > span > h3 {
    font-weight: 500;
  }
`;
