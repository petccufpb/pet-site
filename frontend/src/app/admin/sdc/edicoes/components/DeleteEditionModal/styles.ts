import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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
  background: rgba(0, 0, 18, 0.85);
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
  border: 1px solid rgba(206, 74, 74, 0.35);
  border-radius: 16px;
  width: 100%;
  max-width: 540px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7), 0 0 24px rgba(206, 74, 74, 0.15);
  animation: ${slideUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
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

  .title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .icon-badge {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      background: rgba(206, 74, 74, 0.15);
      border: 1px solid rgba(206, 74, 74, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.colors["base-red"]};
      flex-shrink: 0;
    }

    h2 {
      font-size: 1.25rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors["base-white"]};
      margin-bottom: 0.2rem;
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
    background: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors["base-white"]};
  }
`;

export const ContentBody = styled.div`
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const DangerBanner = styled.div`
  background: rgba(206, 74, 74, 0.12);
  border: 1px solid rgba(206, 74, 74, 0.35);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .banner-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 0.9rem;
    color: #ff8888;
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors["base-white"]};
    line-height: 1.45;
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const TargetEditionCard = styled.div`
  background: rgba(0, 0, 18, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .edition-info {
    .num {
      font-weight: 700;
      color: ${({ theme }) => theme.colors["third-blue"]};
      font-size: 0.85rem;
    }
    .name {
      font-weight: 600;
      color: ${({ theme }) => theme.colors["base-white"]};
      font-size: 0.95rem;
    }
  }

  .events-count {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const ValidationStep = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(0, 0, 18, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 1rem;

  label.step-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors["base-white"]};

    strong {
      color: ${({ theme }) => theme.colors["third-blue"]};
      background: rgba(115, 229, 226, 0.12);
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      font-family: monospace;
    }
  }
`;

export const CheckboxGroup = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  line-height: 1.4;

  input[type="checkbox"] {
    margin-top: 0.15rem;
    width: 18px;
    height: 18px;
    accent-color: ${({ theme }) => theme.colors["base-red"]};
    cursor: pointer;
    flex-shrink: 0;
  }
`;

export const ConfirmInput = styled.input<{ $valid: boolean }>`
  background: rgba(0, 0, 18, 0.5);
  border: 1px solid
    ${({ $valid, theme }) =>
      $valid ? theme.colors["base-green"] : "rgba(255, 255, 255, 0.15)"};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-size: 0.95rem;
  font-family: monospace;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $valid, theme }) =>
      $valid ? theme.colors["base-green"] : theme.colors["base-red"]};
    box-shadow: 0 0 0 3px
      ${({ $valid }) =>
        $valid ? "rgba(4, 211, 97, 0.15)" : "rgba(206, 74, 74, 0.15)"};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const ErrorAlert = styled.div`
  padding: 0.85rem 1rem;
  background: rgba(206, 74, 74, 0.15);
  border: 1px solid ${({ theme }) => theme.colors["base-red"]};
  border-radius: 8px;
  color: #ff9999;
  font-size: 0.85rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  line-height: 1.4;
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.25rem 2rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export const DeleteButton = styled.button<{ $enabled: boolean }>`
  background: ${({ $enabled, theme }) =>
    $enabled ? theme.colors["base-red"] : "rgba(206, 74, 74, 0.2)"};
  color: ${({ $enabled }) => ($enabled ? "white" : "rgba(255, 255, 255, 0.4)")};
  border: 1px solid
    ${({ $enabled, theme }) =>
      $enabled ? theme.colors["base-red"] : "rgba(206, 74, 74, 0.3)"};
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: ${({ $enabled }) => ($enabled ? "pointer" : "not-allowed")};
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.regular};

  &:hover:not(:disabled) {
    background: #b53838;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(206, 74, 74, 0.35);
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
