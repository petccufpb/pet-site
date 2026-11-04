import styled, { css } from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(8, 12, 22, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

export const ModalContainer = styled.div`
  background: #0f1629;
  border: 1px solid rgba(115, 229, 226, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(115, 229, 226, 0.05);
  border-radius: 16px;
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overscroll-behavior: contain;
  animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.97) translateY(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

export const ModalHeader = styled.div`
  padding: 1.5rem 1.75rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: rgba(24, 34, 64, 0.35);
  flex-shrink: 0;

  h2 {
    font-size: 1.35rem;
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
    font-family: ${({ theme }) => theme.fonts.alt};
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
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors["base-white"]};
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const Form = styled.form`
  padding: 1.5rem 1.75rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;
  min-height: 0;
  overscroll-behavior: contain;
  scroll-behavior: smooth;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(115, 229, 226, 0.25);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(115, 229, 226, 0.5);
  }
`;

export const EditionBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(115, 229, 226, 0.06);
  border: 1px solid rgba(115, 229, 226, 0.2);
  border-radius: 10px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors["base-white"]};

  span.badge {
    background: ${({ theme }) => theme.colors["third-blue"]};
    color: #0b1120;
    font-weight: 700;
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    letter-spacing: 0.02em;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex: 1;
`;

export const Row = styled.div<{ $columns?: string }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns || "1fr 1fr"};
  gap: 1rem;

  @media (max-width: 600px) {
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

export const Select = styled.select<{ $hasError?: boolean }>`
  background: #141c30;
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? "#ef4444" : theme.colors["line-white"])};
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  transition: all 0.2s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors["third-blue"]};
    box-shadow: 0 0 0 3px rgba(115, 229, 226, 0.15);
  }

  option {
    background: #0f1629;
    color: white;
  }
`;

export const SelectActionRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: stretch;

  select {
    flex: 1;
    min-width: 0;
  }
`;

export const AddSpeakerButton = styled.button`
  background: rgba(115, 229, 226, 0.1);
  border: 1px solid rgba(115, 229, 226, 0.35);
  color: #73e5e2;
  padding: 0 0.95rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(115, 229, 226, 0.2);
    border-color: #73e5e2;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(115, 229, 226, 0.2);
  }

  &:active {
    transform: translateY(0);
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
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const TypeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const TypeButton = styled.button<{ $active: boolean; $colorType?: "palestra" | "minicurso" | "main" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.65rem 0.5rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  ${({ $active, $colorType }) => {
    if (!$active) {
      return css`
        background: rgba(255, 255, 255, 0.04);
        color: rgba(255, 255, 255, 0.6);
        border-color: rgba(255, 255, 255, 0.08);

        &:hover {
          background: rgba(255, 255, 255, 0.07);
          color: white;
        }
      `;
    }

    if ($colorType === "minicurso") {
      return css`
        background: rgba(115, 229, 226, 0.15);
        color: #73e5e2;
        border-color: rgba(115, 229, 226, 0.4);
        box-shadow: 0 0 12px rgba(115, 229, 226, 0.15);
      `;
    }

    if ($colorType === "palestra") {
      return css`
        background: rgba(59, 130, 246, 0.15);
        color: #60a5fa;
        border-color: rgba(59, 130, 246, 0.4);
        box-shadow: 0 0 12px rgba(59, 130, 246, 0.15);
      `;
    }

    return css`
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
      border-color: rgba(245, 158, 11, 0.4);
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.15);
    `;
  }}
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.6rem 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  ${({ $active }) =>
    $active
      ? css`
          background: rgba(115, 229, 226, 0.15);
          color: #73e5e2;
          border-color: rgba(115, 229, 226, 0.35);
        `
      : css`
          background: transparent;
          color: rgba(255, 255, 255, 0.5);

          &:hover {
            color: white;
          }
        `}
`;

export const InputHint = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
`;

export const ErrorAlert = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.85rem 1rem;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
  border-radius: 8px;
  color: #fca5a5;
  font-size: 0.85rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  line-height: 1.4;
`;

export const WarningAlert = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.85rem 1rem;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: 8px;
  color: #fde68a;
  font-size: 0.85rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  line-height: 1.4;
`;

export const ModalFooter = styled.div`
  padding: 1.25rem 1.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  background: rgba(24, 34, 64, 0.35);
`;

export const CancelButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors["second-white"]};
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 8px;
  padding: 0.65rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button<{ $loading?: boolean }>`
  background: ${({ theme }) => theme.colors["fifth-blue"]};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.65rem 1.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #0060c4;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 114, 237, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
