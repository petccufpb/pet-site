import styled from "styled-components";

export const CountdownContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;

  > span {
    text-align: right;
    font-weight: 300;
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  }
`;

export const Timer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 300;
`;

export const Divider = styled.div`
  height: 0;
  width: 2rem;
  border-top: solid 1px rgba(255, 255, 255, 0.5);
`;

export const TimeUnit = styled.div`
  display: grid;
  gap: 0.5rem;
  justify-content: center;
  text-align: center;

  h3 {
    font-weight: 400;
  }

  span {
    font-weight: 200;
    font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};
    opacity: 60%;
  }
`;
