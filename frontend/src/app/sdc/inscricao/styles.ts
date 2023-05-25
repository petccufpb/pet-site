import styled from "styled-components";

export const Content = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 8rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FirstColumn = styled.div`
  h1 {
    font-size: 4rem;
    max-width: 480px;
    line-height: 100%;
    padding-bottom: 1rem;
  }

  p {
    color: #a9a9b2;
    line-height: 140%;
    font-size: ${({ theme }) => theme.textSizes["text-title-xs"]};
    max-width: 480px;
    padding-bottom: 2rem;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    gap: 1rem;
    width: 16rem;
    background: rgba(0, 114, 237, 0.2);
    border: 1px solid #0072ed;
    padding: 1rem;
    border-radius: 6px;

    span {
      color: white;
      font-weight: 500;
      font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
    }

    @media (max-width: 768px) {
      margin: 0 auto;
    }
  }
`;

export const SecondColumn = styled.div`
  > div {
    padding: 1.5rem;
    h3 {
      font-weight: 700;
      font-size: ${({ theme }) => theme.textSizes["text-title-m"]};
    }
    p {
      padding-top: 0.75rem;
      color: #a9a9b2;
      font-weight: 400;
      font-size: 1rem;
      padding-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
      padding: 1.5rem 0;
    }
  }
`;
export const Steps = styled.section`
  padding-bottom: 2rem;
  h6 {
    font-size: 12px;
    margin-bottom: 1rem;
  }

  .bar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    div {
      content: "";
      width: 6.5rem;
      height: 3px;

      &.active {
        background: #e1e1e6;
      }
      &.inactive {
        background: #323238;
      }
    }
  }
`;

export const Forms = styled.form`
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  border-radius: 0.5rem;
  width: min(100%, 31rem);
  max-height: 42rem;
  border: 1px solid #323238;
  display: grid;
  padding: 2rem;
  gap: 1.2rem;
  position: relative;
  align-items: center;
  z-index: 1;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.3);
  border: auto 0;
  /* margin: auto; */

  ::before {
    z-index: -1;
    content: "";
    position: absolute;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    top: 1px;
    left: 1px;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.colors["fourth-black"]};
  }

  input {
    width: 100%;
    background-color: ${({ theme }) => theme.colors["fifth-black"]};
    border-radius: 0.5rem;
    padding: 1rem;
    border: none;
    outline: none;
    color: white;
    font-family: inherit;
    font-size: inherit;

    ::placeholder {
      color: ${({ theme }) => theme.colors["fifth-grey"]};
    }
  }

  button {
    border: 1px solid ${({ theme }) => theme.colors["base-green"]};
    background: rgba(4, 211, 97, 0.2);
    font-family: inherit;
    font-size: inherit;
    color: white;
    padding: 0.8rem 0;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:disabled {
      opacity: 40%;
      cursor: not-allowed;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  span {
    color: #d5232d;
    font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};
  }
`;
