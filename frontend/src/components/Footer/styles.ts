"use client";
import styled from "styled-components";

export const Container = styled.div<{ pathname: string }>`
  display: flex;
  justify-content: space-between;
  z-index: 110;

  * {
    z-index: 110;
  }

  font-family: ${({ theme }) => theme.fonts.alt};
  max-width: 70rem;

  border-top: 1px solid #afafaf;
  padding: 3rem 0;
  margin: 8.625rem auto 0;

  > div {
    display: flex;
    align-items: center;
  }

  > div:first-child {
    > svg {
      margin-left: 3.75rem;
    }

    div:last-child {
      font-family: Bai Jamjuree;
      font-weight: 500;
      font-size: 1rem;

      margin-left: 3rem;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    padding: 3rem;

    > div:first-child {
      justify-content: space-between;

      div:last-child {
        margin: 0;
      }

      + div {
        gap: 1rem;

        margin: 2rem auto 0;
      }
    }
  }
`;

export const ScrollToTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  width: 2.5rem;
  height: 2.5rem;

  border: 1px solid #ffffff;
  border-radius: 6px;
`;
