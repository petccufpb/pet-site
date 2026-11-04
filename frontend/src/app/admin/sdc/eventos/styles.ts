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
    display: flex;
    align-items: center;
    gap: 0.75rem;
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

export const EditionSelectorCard = styled.div`
  background: rgba(24, 34, 64, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(115, 229, 226, 0.2);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const EditionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .badge {
    background: ${({ theme }) => theme.colors["third-blue"]};
    color: #0c1427;
    font-weight: 800;
    font-size: 0.85rem;
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    letter-spacing: 0.02em;
  }

  .details {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors["base-white"]};
    }

    span {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors["second-white"]};
      font-family: ${({ theme }) => theme.fonts.alt};
    }
  }
`;

export const EditionDropdown = styled.select`
  background: #10182c;
  color: ${({ theme }) => theme.colors["base-white"]};
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 8px;
  padding: 0.5rem 0.85rem;
  font-size: 0.85rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors["third-blue"]};
  }
`;

export const DaySection = styled.section`
  margin-bottom: 2.5rem;
`;

export const DayHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: #73e5e2;
    }
  }

  span.count {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.25rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4.5rem 2rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  background: rgba(24, 34, 64, 0.15);
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.1);

  h3 {
    font-size: 1.35rem;
    color: ${({ theme }) => theme.colors["base-white"]};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  gap: 1rem;
  color: ${({ theme }) => theme.colors["second-white"]};

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const SuccessToast = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #0f291e;
  border: 1px solid #10b981;
  color: #a7f3d0;
  padding: 0.85rem 1.25rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 1100;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
