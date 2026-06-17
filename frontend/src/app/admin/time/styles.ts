import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: calc(55rem - 48rem) 2rem 4rem;
  font-family: ${({ theme }) => theme.fonts.regular};

  @media (max-width: 768px) {
    padding-top: 10rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
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

export const Button = styled.button<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme, primary }) => (primary ? theme.colors["fifth-blue"] : "rgba(255, 255, 255, 0.05)")};
  color: white;
  border: 1px solid ${({ theme, primary }) => (primary ? "transparent" : theme.colors["line-white"])};
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${({ theme }) => theme.fonts.regular};

  &:hover {
    background: ${({ theme, primary }) => (primary ? "#0060c4" : "rgba(255, 255, 255, 0.1)")};
    transform: translateY(-2px);
    box-shadow: ${({ primary }) => (primary ? "0 4px 12px rgba(0, 114, 237, 0.3)" : "none")};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TabSelector = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors["line-white"]};
  margin-bottom: 2rem;
`;

export const Tab = styled.button<{ active: boolean }>`
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme, active }) => (active ? theme.colors["fifth-blue"] : "transparent")};
  color: ${({ theme, active }) => (active ? theme.colors["base-white"] : theme.colors["second-grey"])};
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${({ theme }) => theme.fonts.regular};

  &:hover {
    color: ${({ theme }) => theme.colors["base-white"]};
  }
`;

export const MembersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: rgba(24, 34, 64, 0.2);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 1.25rem 1.5rem;
  background: rgba(24, 34, 64, 0.5);
  color: ${({ theme }) => theme.colors["second-white"]};
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${({ theme }) => theme.colors["line-white"]};
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 1.25rem 1.5rem;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  vertical-align: middle;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
`;

export const StatusBadge = styled.span<{ active: boolean }>`
  display: inline-block;
  background: ${({ active }) => (active ? "rgba(4, 211, 97, 0.15)" : "rgba(206, 74, 74, 0.15)")};
  color: ${({ active }) => (active ? "#5cf396" : "#ff8888")};
  border: 1px solid ${({ active }) => (active ? "rgba(4, 211, 97, 0.3)" : "rgba(206, 74, 74, 0.3)")};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ModalOverlay = styled.div`
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
  z-index: 1000;
  padding: 1.5rem;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background: #182240;
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  padding: 2.5rem;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Custom Scrollbar for Modal */
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

export const NoData = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  background: rgba(24, 34, 64, 0.15);
  border-radius: 12px;
  border: 1px dashed ${({ theme }) => theme.colors["line-white"]};
`;
