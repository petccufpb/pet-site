"use client";
import Link from "next/link";
import styled from "styled-components";

export const Styling = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  section {
    display: flex;
    padding: 1rem 2rem 1rem 2rem;
    position: relative;

    &:first-child {
      border-radius: 1rem 1rem 0 0;
    }

    &:last-child {
      border-radius: 0 0 1rem 1rem;
    }

    &:nth-child(even) {
      background-color: #040422;
    }

    &:nth-child(odd) {
      background-color: #05052e;
    }

    img {
      border-radius: 2rem;
    }

    > div {
      display: flex;
      flex-direction: column;
      flex: 1;

      margin-left: 2rem;

      > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        flex: 1;

        h1 {
          font-size: 1.4em;
        }

        div {
          max-height: 6rem;
          overflow: hidden;

          p {
            margin-top: 1rem;
            margin-right: 2rem;
          }
        }
      }
    }
  }
`;

export const GoToPlaylistVideo = styled(Link)`
  display: flex;
  align-self: flex-end;

  span {
    font-size: 1.2rem;
    font-weight: bold;
  }

  svg {
    margin-left: 0.5rem;
  }
`;
