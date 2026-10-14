import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(8, 12, 22, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: 1.5rem;
  overflow-y: auto;
`;

export const ModalContainer = styled.div`
  background: #0f1629;
  border: 1px solid rgba(115, 229, 226, 0.25);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(115, 229, 226, 0.08);
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modalFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.96) translateY(10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

export const ModalHeader = styled.div`
  padding: 1.35rem 1.6rem 1.15rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: rgba(24, 34, 64, 0.4);

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    margin: 0;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors["second-white"]};
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors["base-white"]};
  }
`;

export const Form = styled.form`
  padding: 1.5rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  overscroll-behavior: contain;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors["base-white"]};
  display: flex;
  align-items: center;
  justify-content: space-between;

  .required {
    color: #f87171;
    margin-left: 0.2rem;
  }

  .helper {
    font-size: 0.75rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors["second-white"]};
  }
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? "#ef4444" : theme.colors["line-white"])};
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) => ($hasError ? "#ef4444" : theme.colors["third-blue"])};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) => ($hasError ? "rgba(239, 68, 68, 0.2)" : "rgba(115, 229, 226, 0.15)")};
    background: rgba(255, 255, 255, 0.06);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors["third-blue"]};
    box-shadow: 0 0 0 3px rgba(115, 229, 226, 0.15);
    background: rgba(255, 255, 255, 0.06);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const InputHint = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  line-height: 1.35;
`;

export const ErrorAlert = styled.div`
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #fca5a5;
  font-size: 0.85rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export const CancelButton = styled.button`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: ${({ theme }) => theme.colors["base-white"]};
  padding: 0.6rem 1.1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button<{ $loading?: boolean }>`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
  color: white;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
