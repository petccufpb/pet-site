import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 18, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1.5rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalContainer = styled.div`
  background: #182240;
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 16px;
  width: 100%;
  max-width: 580px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
  animation: ${slideUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  div {
    h2 {
      font-size: 1.35rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors["base-white"]};
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.85rem;
      color: ${({ theme }) => theme.colors["second-white"]};
      font-family: ${({ theme }) => theme.fonts.alt};
    }
  }
`;

export const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors["second-white"]};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(206, 74, 74, 0.2);
    color: #ff8888;
  }
`;

export const Form = styled.form`
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors["base-white"]};
  display: flex;
  align-items: center;
  justify-content: space-between;

  span.required {
    color: ${({ theme }) => theme.colors["third-blue"]};
  }

  span.helper {
    font-size: 0.75rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors["second-white"]};
  }
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  background: rgba(0, 0, 18, 0.45);
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors["base-red"] : "rgba(255, 255, 255, 0.15)"};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-size: 0.95rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors["third-blue"]};
    box-shadow: 0 0 0 3px rgba(115, 229, 226, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`;

export const InputHint = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
`;

export const ErrorAlert = styled.div`
  padding: 0.85rem 1rem;
  background: rgba(206, 74, 74, 0.15);
  border: 1px solid ${({ theme }) => theme.colors["base-red"]};
  border-radius: 8px;
  color: #ff9999;
  font-size: 0.85rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  line-height: 1.4;
`;

export const LogoPreviewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 18, 0.3);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  margin-top: 0.35rem;

  img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.05);
    padding: 4px;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors["second-white"]};
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export const SubmitButton = styled.button<{ $loading?: boolean }>`
  background: ${({ theme }) => theme.colors["fifth-blue"]};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.regular};

  &:hover:not(:disabled) {
    background: #0060c4;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(0, 114, 237, 0.35);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const CancelButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors["second-white"]};
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${({ theme }) => theme.fonts.regular};

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: ${({ theme }) => theme.colors["base-white"]};
  }
`;
