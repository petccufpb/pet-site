import styled from "styled-components";

export const Content = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  margin: auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

export const FirstColumn = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    font-size: 4rem;
    max-width: 480px;
    line-height: 100%;
    font-family: ${({ theme }) => theme.fonts.alt};
  }

  p {
    color: #a9a9b2;
    line-height: 140%;
    font-size: ${({ theme }) => theme.textSizes["text-title-xs"]};
    font-family: ${({ theme }) => theme.fonts.sdc};
    max-width: 480px;
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
    font-family: ${({ theme }) => theme.fonts.alt};

    span {
      color: white;
      font-weight: 500;
      font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
    }
  }

  @media (max-width: 900px) {
    @media (max-width: 900px) {
      display: none;
    }

    margin: 0 auto;

    a {
      display: none;
      margin: 0 auto;
    }

    p {
      padding-bottom: 0;
    }

    h1 {
      padding-top: 1rem;
    }
  }
`;

export const SecondColumn = styled.div`
  margin: auto 0;

  > div {
    padding: 1.5rem;

    h3 {
      margin-bottom: 0.5rem;
      font-weight: 700;
      font-size: ${({ theme }) => theme.textSizes["text-title-m"]};
      font-family: ${({ theme }) => theme.fonts.sdc};
    }

    p {
      color: #a9a9b2;
      font-weight: 400;
      font-size: 1rem;
      padding-bottom: 1.5rem;
    }

    @media (max-width: 900px) {
      padding: 0;
    }
  }
`;
export const Steps = styled.section`
  font-family: ${({ theme }) => theme.fonts.sdc};
  padding-bottom: 2rem;
  width: min(100%, 31rem);
  margin: 0 auto;
  text-align: left;

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

    @media (max-width: 900px) {
      /* justify-content: center; */
    }
  }
`;

export const Forms = styled.form`
  font-family: ${({ theme }) => theme.fonts.alt};
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
  margin: 0 auto;

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

  @media (max-width: 900px) {
    padding: 2rem 1rem;
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

  select {
    color: white;
    background-color: ${({ theme }) => theme.colors["fifth-black"]};
  }
`;

export const PETSDC = styled.div`
  display: flex;
  gap: 1rem;

  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  > button {
    width: 100%;
  }
`;

export const BackButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors["fifth-blue"]} !important;
  background: ${({ theme }) => theme.colors["fifth-blue"]}20 !important;
`;
