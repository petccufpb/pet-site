"use client";
import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  margin: 6vh 2vw 0;
  margin-top: 6vh;
  margin-left: 2vw;
`;

export const VideoComments = styled.div`
  display: flex;

  > div {
    display: flex;
    flex-direction: column;

    width: 100%;

    > div {
      flex: 1;

      width: 100%;

      padding: 1vh 0.5vw;

      iframe {
        width: 100%;
        height: 100%;

        border: 0;
        border-radius: 25px;
      }
    }

    h2 {
      font-weight: normal;

      margin-top: 2vh;
    }
  }

  aside {
    margin-left: 2vw;

    > div + div {
      margin-top: 1vh;
    }

    p {
      margin-bottom: 1vh;
    }
  }
`;

export const Window = styled.div`
  background-color: #1e4160;

  border: 1px solid #3bbbdc;
  border-radius: 25px;
`;

export const Makers = styled.div`
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5vw;

    padding: 2vh 2vw;
  }
`;

export const Comments = styled.div`
  /* Window */
  > div {
    padding: 2vh 0.5vw;

    > div,
    main {
      padding: 0 0.5vw;
    }

    /* Inner scroll */
    > div {
      display: flex;
      flex-direction: column-reverse;

      height: 35vh;

      /* Comment input */
      > div {
        display: flex;
        justify-content: space-between;

        background: #ffffff1a;

        padding: 0.5vh 0.8vw;
        margin-top: 2vh;
        border: 1px solid #38bcde;
        border-radius: 50vw;

        input {
          width: 100%;
          color: #ffffff33;
          font-size: 0.8em;
          font-weight: medium;
          background: transparent;

          border: none;
        }

        button {
        }
      }

      main {
        display: flex;
        flex-direction: column-reverse;
        row-gap: 2vh;
        overflow-y: auto;
      }
    }
  }
`;

export const Comment = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 1vh;
  border-bottom: 1px solid #3398b980;

  a {
    border-radius: 50vw;

    img {
      border-radius: 50vw;
    }
  }

  p {
    max-width: 7vw;
  }

  span {
    color: #ffffff80;
  }
`;
