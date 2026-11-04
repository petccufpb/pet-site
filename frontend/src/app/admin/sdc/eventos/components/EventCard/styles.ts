import styled, { css } from "styled-components";

export const CardContainer = styled.div<{ $type?: string }>`
  background: rgba(24, 34, 64, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 4px;
    background: ${({ $type }) => {
      if ($type === "minicurso") return "#73E5E2";
      if ($type === "palestra") return "#3B82F6";
      return "#F59E0B";
    }};
  }

  &:hover {
    border-color: rgba(115, 229, 226, 0.25);
    background: rgba(24, 34, 64, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const TimeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};

  svg {
    color: #73e5e2;
  }
`;

export const TypeBadge = styled.span<{ $type?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  ${({ $type }) => {
    if ($type === "minicurso") {
      return css`
        background: rgba(115, 229, 226, 0.12);
        color: #73e5e2;
        border: 1px solid rgba(115, 229, 226, 0.3);
      `;
    }
    if ($type === "palestra") {
      return css`
        background: rgba(59, 130, 246, 0.12);
        color: #60a5fa;
        border: 1px solid rgba(59, 130, 246, 0.3);
      `;
    }
    return css`
      background: rgba(245, 158, 11, 0.12);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.3);
    `;
  }}
`;

export const Title = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors["base-white"]};
  line-height: 1.35;
`;

export const Description = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  line-height: 1.5;
`;

export const SpeakerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const SpeakerAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(115, 229, 226, 0.15);
  border: 1.5px solid rgba(115, 229, 226, 0.4);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #73e5e2;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SpeakerMeta = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors["base-white"]};
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const MetaBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
  padding-top: 0.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  svg {
    color: #73e5e2;
  }
`;

export const CopyIdButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors["second-white"]};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
`;

export const EditButton = styled.button`
  background: rgba(115, 229, 226, 0.1);
  border: 1px solid rgba(115, 229, 226, 0.25);
  color: #73e5e2;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.alt};
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: rgba(115, 229, 226, 0.2);
    border-color: rgba(115, 229, 226, 0.45);
    color: white;
    transform: translateY(-1px);
  }
`;
