"use client";
import styled from "styled-components";

export const Styling = styled.div`
  margin-top: 4rem;

  section {
    h2 {
      color: #ffffff;
      font-size: 3.25rem;
      font-weight: 600;
    }

    > div {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      row-gap: 2.5rem;

      margin-top: 3rem;
    }

    + section {
      margin-top: 4rem;
    }
  }
`;

const photoSize = "6rem";
export const MemberDiv = styled.div`
  position: relative;

  height: ${photoSize};

  padding-left: ${photoSize};

  img {
    width: ${photoSize} !important;
    height: ${photoSize} !important;

    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;

    height: 100%;

    margin-left: 1rem;

    > div {
      display: flex;
      align-items: center;

      span {
        color: #e1e1e6;
        font-family: Bai Jamjuree;
        font-size: 1.5rem;
        font-weight: 600;
      }

      span + span {
        background-color: ${({ theme }) => theme.colors["fifth-blue"]};
        color: #ffffff;
        font-family: Bai Jamjuree;
        font-size: 0.875rem;
        font-weight: bold;
        line-height: 160%;

        padding: 0 1rem;
        margin-left: 0.75rem;
        border-radius: 1.25rem;
      }
    }

    > p {
      color: ${({ theme }) => theme.colors["second-white"]};
      font-family: Roboto;
    }

    p + div {
      display: flex;
      gap: 1.25rem;
    }
  }
`;
