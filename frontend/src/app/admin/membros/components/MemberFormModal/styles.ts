"use client";
import styled, { css } from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;

  background: rgba(0, 0, 18, 0.75);
  backdrop-filter: blur(4px);
`;

export const Modal = styled.div`
  position: relative;

  width: 100%;
  max-width: 34rem;
  max-height: calc(100vh - 2.5rem);
  overflow-y: auto;

  padding: 1.75rem;
  border-radius: 14px;

  background: ${({ theme }) => theme.colors["fifth-black"]};
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
  }

  p {
    margin-top: 0.3rem;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 8px;

  color: ${({ theme }) => theme.colors["second-white"]};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};

  &:hover {
    color: ${({ theme }) => theme.colors["base-white"]};
    background: rgba(255, 255, 255, 0.08);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
    outline-offset: 2px;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.1rem;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldLabel = styled.label`
  margin-bottom: 0.4rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors["second-white"]};

  span {
    color: #ff8f8f;
  }
`;

const fieldStyles = css`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  color: ${({ theme }) => theme.colors["base-white"]};
  background: rgba(0, 0, 18, 0.4);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};

  &::placeholder {
    color: ${({ theme }) => theme.colors["base-grey"]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors["fifth-blue"]};
  }
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  ${fieldStyles};
  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors["base-red"] : theme.colors["line-white"]};
`;

export const Textarea = styled.textarea<{ $hasError?: boolean }>`
  ${fieldStyles};
  min-height: 5.5rem;
  resize: vertical;
  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors["base-red"] : theme.colors["line-white"]};
`;

export const Select = styled.select<{ $hasError?: boolean }>`
  ${fieldStyles};
  cursor: pointer;
  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors["base-red"] : theme.colors["line-white"]};

  option {
    background: ${({ theme }) => theme.colors["fifth-black"]};
  }
`;

export const FieldError = styled.span`
  margin-top: 0.35rem;
  font-size: 0.78rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  color: #ff8888;
`;

export const FormError = styled.div`
  padding: 0.7rem 0.9rem;
  margin-bottom: 1.1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  color: #ff8888;
  background: rgba(206, 74, 74, 0.15);
  border: 1px solid rgba(206, 74, 74, 0.5);
`;

export const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;

  input {
    width: 1.05rem;
    height: 1.05rem;
    accent-color: ${({ theme }) => theme.colors["fifth-blue"]};
    cursor: pointer;
  }

  span {
    font-size: 0.88rem;
    color: ${({ theme }) => theme.colors["base-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const ContactsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 0.9rem;
  margin-bottom: 1.1rem;

  background: rgba(0, 0, 18, 0.3);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 10px;
`;

export const ContactsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const ContactsHeaderTitle = styled.p`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors["second-white"]};
  margin: 0;
`;

export const AddContactButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;

  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: #9ec9ff;
  background: rgba(0, 114, 237, 0.15);
  border: 1px solid rgba(0, 114, 237, 0.4);

  &:hover {
    background: rgba(0, 114, 237, 0.3);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
    outline-offset: 2px;
  }
`;

export const ContactRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 0.6rem;
  align-items: start;

  @media (max-width: 520px) {
    grid-template-columns: 1fr auto;
  }
`;

export const RemoveContactButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 2.5rem;
  min-width: 2.5rem;
  padding: 0 0.6rem;
  border-radius: 8px;

  color: #ff9d9d;
  background: rgba(206, 74, 74, 0.12);
  border: 1px solid rgba(206, 74, 74, 0.4);

  &:hover {
    background: rgba(206, 74, 74, 0.25);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors["base-red"]};
    outline-offset: 2px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.7rem;
  padding-top: 1.1rem;
  border-top: 1px solid ${({ theme }) => theme.colors["line-white"]};

  @media (max-width: 520px) {
    flex-direction: column-reverse;
  }
`;

export const FooterButton = styled.button<{ $variant?: "primary" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;

  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ $variant, theme }) => ($variant === "primary" ? "#fff" : theme.colors["base-white"])};
  background: ${({ $variant }) => ($variant === "primary" ? "#0072ED" : "transparent")};
  border: 1px solid
    ${({ $variant, theme }) => ($variant === "primary" ? "transparent" : theme.colors["line-white"])};

  &:hover:not(:disabled) {
    background: ${({ $variant }) => ($variant === "primary" ? "#0060c4" : "rgba(255, 255, 255, 0.08)")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors["third-blue"]};
    outline-offset: 2px;
  }
`;
