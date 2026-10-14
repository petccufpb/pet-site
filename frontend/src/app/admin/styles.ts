import Link from "next/link";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 7rem 2rem 5rem;
  font-family: ${({ theme }) => theme.fonts.regular};
  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 768px) {
    padding-top: 6.5rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors["fifth-blue"]}, ${({ theme }) => theme.colors["third-blue"]});
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(0, 114, 237, 0.35);
`;

export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  h3 {
    font-size: 1.15rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
    margin: 0;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.825rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors["base-green"]};
  box-shadow: 0 0 8px ${({ theme }) => theme.colors["base-green"]};
  animation: ${pulse} 2s infinite ease-in-out;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const HeaderButton = styled.button<{ $variant?: "danger" | "ghost" | "primary" }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.15rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-decoration: none;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case "danger":
        return `
          background: rgba(206, 74, 74, 0.12);
          color: #ff6b6b;
          border: 1px solid rgba(206, 74, 74, 0.25);
          &:hover {
            background: rgba(206, 74, 74, 0.22);
            border-color: rgba(206, 74, 74, 0.45);
            transform: translateY(-2px);
          }
        `;
      case "primary":
        return `
          background: ${theme.colors["fifth-blue"]};
          color: #ffffff;
          border: 1px solid transparent;
          box-shadow: 0 4px 12px rgba(0, 114, 237, 0.3);
          &:hover {
            background: #0060c4;
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(0, 114, 237, 0.45);
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.05);
          color: ${theme.colors["base-white"]};
          border: 1px solid rgba(255, 255, 255, 0.1);
          &:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            transform: translateY(-2px);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }
`;

export const HeroSection = styled.div`
  margin-bottom: 3.5rem;
  text-align: left;
  position: relative;
`;

export const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  background: rgba(115, 229, 226, 0.08);
  border: 1px solid rgba(115, 229, 226, 0.25);
  border-radius: 999px;
  color: ${({ theme }) => theme.colors["third-blue"]};
  font-size: 0.825rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  letter-spacing: 0.03em;
`;

export const HeroTitle = styled.h1`
  font-size: 2.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors["base-white"]};
  line-height: 1.15;
  margin-bottom: 0.85rem;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors["third-blue"]}, ${({ theme }) => theme.colors["fifth-blue"]});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  max-width: 650px;
  line-height: 1.6;
  font-family: ${({ theme }) => theme.fonts.alt};
`;

export const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem;
  margin-bottom: 4rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const ModuleCard = styled.div<{ $accentColor?: string }>`
  position: relative;
  background: rgba(22, 24, 34, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $accentColor, theme }) => $accentColor || theme.colors["fifth-blue"]};
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    top: -40%;
    right: -20%;
    width: 200px;
    height: 200px;
    background: ${({ $accentColor, theme }) => $accentColor || theme.colors["fifth-blue"]};
    border-radius: 50%;
    opacity: 0;
    filter: blur(60px);
    pointer-events: none;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ $accentColor, theme }) => $accentColor || theme.colors["fifth-blue"]};
    box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.65), 0 0 24px -6px ${({ $accentColor, theme }) => $accentColor ? `${$accentColor}35` : "rgba(0, 114, 237, 0.25)"};

    &::before {
      opacity: 1;
    }

    &::after {
      opacity: 0.15;
    }

    .card-arrow {
      transform: translateX(6px);
      color: ${({ $accentColor, theme }) => $accentColor || theme.colors["third-blue"]};
    }
  }
`;

export const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const IconContainer = styled.div<{ $color?: string }>`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${({ $color }) => ($color ? `${$color}18` : "rgba(0, 114, 237, 0.15)")};
  border: 1px solid ${({ $color }) => ($color ? `${$color}35` : "rgba(0, 114, 237, 0.3)")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color, theme }) => $color || theme.colors["fifth-blue"]};
  box-shadow: 0 4px 14px ${({ $color }) => ($color ? `${$color}20` : "rgba(0, 114, 237, 0.2)")};
`;

export const CardTag = styled.span<{ $color?: string }>`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: ${({ $color }) => ($color ? `${$color}15` : "rgba(255, 255, 255, 0.05)")};
  color: ${({ $color, theme }) => $color || theme.colors["second-white"]};
  border: 1px solid ${({ $color }) => ($color ? `${$color}30` : "rgba(255, 255, 255, 0.1)")};
  font-family: ${({ theme }) => theme.fonts.alt};
`;

export const CardContent = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.45rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
    margin-bottom: 0.65rem;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    line-height: 1.55;
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const CardFooter = styled.div<{ $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  span.route-label {
    font-family: monospace;
    font-size: 0.825rem;
    color: rgba(255, 255, 255, 0.4);
    background: rgba(0, 0, 0, 0.3);
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.925rem;
    font-weight: 600;
    color: ${({ $color, theme }) => $color || theme.colors["base-white"]};
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .card-arrow {
    transition: transform 0.2s ease, color 0.2s ease;
  }
`;

export const QuickLinksCard = styled.div`
  background: rgba(18, 20, 28, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;

  .label-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    h4 {
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors["base-white"]};
      margin: 0;
    }

    p {
      font-size: 0.85rem;
      color: ${({ theme }) => theme.colors["second-white"]};
      margin: 0;
      font-family: ${({ theme }) => theme.fonts.alt};
    }
  }

  .links-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

export const QuickLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors["third-blue"]};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    text-decoration: underline;
  }
`;

export const LoadingState = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};

  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top-color: ${({ theme }) => theme.colors["fifth-blue"]};
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div<{ $accentColor?: string }>`
  background: rgba(22, 26, 38, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 1.25rem 1.4rem;
  display: flex;
  align-items: center;
  gap: 1.15rem;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${({ $accentColor, theme }) => $accentColor || theme.colors["third-blue"]};
  }

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ $accentColor, theme }) => $accentColor ? `${$accentColor}50` : "rgba(115, 229, 226, 0.3)"};
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  }
`;

export const StatIcon = styled.div<{ $color?: string }>`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${({ $color }) => ($color ? `${$color}18` : "rgba(115, 229, 226, 0.15)")};
  border: 1px solid ${({ $color }) => ($color ? `${$color}35` : "rgba(115, 229, 226, 0.3)")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color, theme }) => $color || theme.colors["third-blue"]};
  flex-shrink: 0;
`;

export const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
`;

export const StatValue = styled.div`
  font-size: 1.45rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors["base-white"]};
  line-height: 1.1;
  font-family: ${({ theme }) => theme.fonts.regular};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StatLabel = styled.div`
  font-size: 0.775rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  font-weight: 500;
`;

export const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.45rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors["base-white"]};
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;

  svg {
    color: ${({ theme }) => theme.colors["third-blue"]};
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  margin: 0.25rem 0 0;
`;

export const QuickActionsBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
  padding: 1rem 1.25rem;
  background: rgba(22, 26, 38, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
`;

export const QuickActionLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors["second-white"]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: ${({ theme }) => theme.fonts.alt};
  margin-right: 0.5rem;
`;

export const QuickActionBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 6px;
  font-size: 0.825rem;
  font-weight: 600;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors["base-white"]};
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(115, 229, 226, 0.15);
    border-color: rgba(115, 229, 226, 0.35);
    color: #73e5e2;
    transform: translateY(-1px);
  }
`;

