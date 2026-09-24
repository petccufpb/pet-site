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
  h1 {
    font-size: 2.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Button = styled.button<{ primary?: boolean; variant?: "outline" | "ghost" }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme, primary, variant }) =>
    variant === "ghost"
      ? "transparent"
      : primary
      ? theme.colors["fifth-blue"]
      : "rgba(255, 255, 255, 0.05)"};
  color: white;
  border: 1px solid
    ${({ theme, primary, variant }) =>
      variant === "ghost"
        ? "transparent"
        : primary
        ? "transparent"
        : theme.colors["line-white"]};
  border-radius: 8px;
  padding: 0.7rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${({ theme }) => theme.fonts.regular};

  &:hover {
    background: ${({ theme, primary, variant }) =>
      variant === "ghost"
        ? "rgba(255, 255, 255, 0.08)"
        : primary
        ? "#0060c4"
        : "rgba(255, 255, 255, 0.1)"};
    transform: translateY(-2px);
    box-shadow: ${({ primary }) => (primary ? "0 4px 12px rgba(0, 114, 237, 0.3)" : "none")};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const TableContainer = styled.div`
  background: rgba(24, 34, 64, 0.2);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  margin-top: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const TableHeader = styled.th`
  padding: 1rem 0.5rem;
  background: rgba(24, 34, 64, 0.5);
  color: ${({ theme }) => theme.colors["second-white"]};
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${({ theme }) => theme.colors["line-white"]};
`;

export const TableRow = styled.tr<{ isSelected?: boolean }>`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: ${({ isSelected }) =>
    isSelected ? "rgba(115, 229, 226, 0.04)" : "transparent"};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ isSelected }) =>
      isSelected ? "rgba(115, 229, 226, 0.07)" : "rgba(255, 255, 255, 0.02)"};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  vertical-align: middle;
  font-size: 0.8rem;
`;

export const EditionNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: 700;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors["third-blue"]};
`;

export const EditionTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors["base-white"]};
  margin-bottom: 0.2rem;
`;

export const EditionSubtitle = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors["second-white"]};
`;

export const StatusBadge = styled.span<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const SelectActionBtn = styled.button<{ selected: boolean }>`
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    background: ${({ selected }) =>
      selected ? "rgba(4, 211, 97, 0.2)" : "rgba(255, 255, 255, 0.1)"};
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors["second-white"]};

  h3 {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors["base-white"]};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
  color: ${({ theme }) => theme.colors["second-white"]};
`;
