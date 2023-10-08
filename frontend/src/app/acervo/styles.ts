import styled from "styled-components";

export const Styling = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5vw;
  row-gap: 5vh;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      border: 2px solid #3bbbdc;
      border-radius: 25px;
    }

    h1 {
      max-width: 80%;

      font-size: 1.4em;
      text-align: center;
    }
  }
`;
