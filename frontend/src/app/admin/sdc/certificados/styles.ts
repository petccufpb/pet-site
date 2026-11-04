import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem 5rem;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const TitleArea = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
    max-width: 720px;
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const EditionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(24, 34, 64, 0.5);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  padding: 0.6rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};

  strong {
    color: ${({ theme }) => theme.colors["third-blue"]};
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

export const Card = styled.div`
  background: rgba(24, 34, 64, 0.45);
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 14px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 18, 0.35);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  p {
    font-size: 0.925rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
  }

  input {
    background: rgba(0, 0, 18, 0.4);
    border: 1px solid ${({ theme }) => theme.colors["line-white"]};
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors["base-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors["fifth-blue"]};
      box-shadow: 0 0 0 2px rgba(0, 114, 237, 0.2);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Button = styled.button<{ primary?: boolean; variant?: "outline" | "success" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${({ theme, primary, variant }) =>
    variant === "success"
      ? theme.colors["base-green"]
      : primary
      ? theme.colors["fifth-blue"]
      : "rgba(255, 255, 255, 0.05)"};
  color: white;
  border: 1px solid
    ${({ theme, primary, variant }) =>
      variant === "success"
        ? "transparent"
        : primary
        ? "transparent"
        : theme.colors["line-white"]};
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${({ theme }) => theme.fonts.regular};

  &:hover:not(:disabled) {
    background: ${({ theme, primary, variant }) =>
      variant === "success"
        ? "#03b854"
        : primary
        ? "#0060c4"
        : "rgba(255, 255, 255, 0.1)"};
    transform: translateY(-2px);
    box-shadow: ${({ primary, variant }) =>
      variant === "success"
        ? "0 4px 12px rgba(4, 211, 97, 0.3)"
        : primary
        ? "0 4px 12px rgba(0, 114, 237, 0.3)"
        : "none"};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const TableSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TableHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0;
  }
`;

export const TableContainer = styled.div`
  background: rgba(24, 34, 64, 0.2);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  margin-top: 0.5rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const TableHeader = styled.th`
  padding: 1rem 1.25rem;
  background: rgba(24, 34, 64, 0.5);
  color: ${({ theme }) => theme.colors["second-white"]};
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${({ theme }) => theme.colors["line-white"]};
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 1rem 1.25rem;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  vertical-align: middle;
  font-size: 0.9rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3.5rem 1rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  font-size: 0.95rem;
`;

export const HashTag = styled.code`
  font-family: monospace;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors["third-blue"]};
  background: rgba(115, 229, 226, 0.08);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

export const AttendanceBadge = styled.span<{ value: number }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.regular};
  background: ${({ value, theme }) =>
    value >= 75
      ? "rgba(4, 211, 97, 0.15)"
      : "rgba(255, 179, 0, 0.15)"};
  color: ${({ value, theme }) =>
    value >= 75 ? theme.colors["base-green"] : "#ffb300"};
  border: 1px solid
    ${({ value, theme }) =>
      value >= 75 ? "rgba(4, 211, 97, 0.3)" : "rgba(255, 179, 0, 0.3)"};
`;

export const ProgressModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 18, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ProgressModalContent = styled.div`
  background: rgba(24, 34, 64, 0.95);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  padding: 2.5rem;
  border-radius: 14px;
  text-align: center;
  width: 90%;
  max-width: 460px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);

  h2 {
    font-size: 1.35rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
    margin-bottom: 0.75rem;
  }

  p {
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(0, 0, 18, 0.6);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const ProgressBarFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: ${({ theme }) => theme.colors["base-green"]};
  transition: width 0.3s ease;
`;
