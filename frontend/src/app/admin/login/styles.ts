import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 12rem);
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors["base-white"]};
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
  background: rgba(24, 34, 64, 0.45);
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 16px;
  padding: 3rem 2.5rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 18, 0.5);

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2.5rem;
    text-align: center;

    svg {
      color: ${({ theme }) => theme.colors["fifth-blue"]};
      margin-bottom: 1rem;
      filter: drop-shadow(0 0 10px rgba(0, 114, 237, 0.5));
    }

    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors["base-white"]};
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors["second-white"]};
      font-family: ${({ theme }) => theme.fonts.alt};
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Input = styled.input`
  background: rgba(0, 0, 18, 0.4);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 8px;
  padding: 0.85rem 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors["fifth-blue"]};
    box-shadow: 0 0 0 2px rgba(0, 114, 237, 0.2);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors["base-grey"]};
  }
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors["fifth-blue"]};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s ease;
  font-family: ${({ theme }) => theme.fonts.regular};

  &:hover:not(:disabled) {
    background: #0060c4;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 114, 237, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  background: rgba(206, 74, 74, 0.15);
  border: 1px solid ${({ theme }) => theme.colors["base-red"]};
  color: #ff8888;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.87rem;
  margin-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  text-align: center;
`;
