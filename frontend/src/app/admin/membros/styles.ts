"use client";
import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem 5rem;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  margin-bottom: 1.75rem;
`;

export const PageHeading = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
  }

  p {
    margin-top: 0.35rem;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.7rem 1.15rem;
  border: none;
  border-radius: 8px;

  font-size: 0.9rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.regular};
  white-space: nowrap;

  color: #fff;
  background: ${({ theme }) => theme.colors["fifth-blue"]};
  transition: background 200ms ease, transform 200ms ease;

  &:hover:not(:disabled) {
    background: #0060c4;
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

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;

  padding: 0.6rem 1rem;
  border-radius: 8px;

  font-size: 0.85rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors["base-white"]};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};

  transition: background 200ms ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
    outline-offset: 2px;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  padding: 0.9rem;
  margin-bottom: 1.5rem;

  background: ${({ theme }) => theme.colors["fifth-black"]};
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 12px;
`;

export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 220px;

  svg {
    position: absolute;
    left: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors["base-grey"]};
    pointer-events: none;
  }

  input {
    width: 100%;
    padding: 0.65rem 1rem 0.65rem 2.6rem;
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
  }
`;

export const FilterSelect = styled.select`
  padding: 0.65rem 2.2rem 0.65rem 0.85rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.fonts.alt};
  color: ${({ theme }) => theme.colors["base-white"]};
  background-color: rgba(0, 0, 18, 0.4);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  cursor: pointer;

  option {
    background: ${({ theme }) => theme.colors["fifth-black"]};
    color: ${({ theme }) => theme.colors["base-white"]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors["fifth-blue"]};
  }
`;

export const ResultSummary = styled.p`
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
`;

export const StatePanel = styled.div<{ $isError?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  padding: 3.5rem 1.5rem;
  text-align: center;

  background: ${({ theme }) => theme.colors["fifth-black"]};
  border: 1px dashed
    ${({ $isError, theme }) => ($isError ? "rgba(206, 74, 74, 0.5)" : theme.colors["line-white"])};
  border-radius: 12px;

  strong {
    font-size: 1.05rem;
    color: ${({ theme }) => theme.colors["base-white"]};
  }

  p {
    max-width: 32rem;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const Spinner = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.12);
  border-top-color: ${({ theme }) => theme.colors["fifth-blue"]};
  animation: membros-spin 0.8s linear infinite;

  @keyframes membros-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1rem;

  padding: 0;
  margin: 0;
  list-style: none;
`;

export const Card = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  padding: 1.25rem;

  background: ${({ theme }) => theme.colors["fifth-black"]};
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  border-radius: 12px;

  transition: border-color 200ms ease, transform 200ms ease;

  &:hover {
    border-color: rgba(0, 114, 237, 0.5);
    transform: translateY(-2px);
  }
`;

export const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

export const Avatar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;

  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors["base-white"]};
  background: ${({ theme }) => theme.colors["gradient-blue"]};

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardIdentity = styled.div`
  min-width: 0;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors["base-white"]};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: 0.3rem;
`;

export const Badge = styled.span<{ $tone?: "blue" | "green" | "red" | "neutral" }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;

  padding: 0.15rem 0.55rem;
  border-radius: 999px;

  font-size: 0.7rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.alt};
  text-transform: uppercase;
  letter-spacing: 0.04em;

  ${({ $tone = "neutral", theme }) => {
    switch ($tone) {
      case "blue":
        return css`
          color: #9ec9ff;
          background: rgba(0, 114, 237, 0.2);
        `;
      case "green":
        return css`
          color: #6ee7a8;
          background: rgba(4, 211, 97, 0.15);
        `;
      case "red":
        return css`
          color: #ff9d9d;
          background: rgba(206, 74, 74, 0.18);
        `;
      default:
        return css`
          color: ${theme.colors["second-white"]};
          background: rgba(255, 255, 255, 0.07);
        `;
    }
  }}
`;

export const About = styled.p`
  flex: 1;
  margin: 0;

  font-size: 0.85rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors["base-grey"]};
  font-family: ${({ theme }) => theme.fonts.alt};

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    color: ${({ theme }) => theme.colors["white-span"]};
    font-weight: 600;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  padding-top: 0.85rem;
  border-top: 1px solid ${({ theme }) => theme.colors["line-white"]};
`;

export const CardMeta = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors["base-grey"]};
  font-family: ${({ theme }) => theme.fonts.alt};
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  padding: 0.45rem 0.8rem;
  border-radius: 8px;

  font-size: 0.8rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors["base-white"]};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
  transition: background 200ms ease, border-color 200ms ease;

  &:hover {
    background: rgba(0, 114, 237, 0.2);
    border-color: rgba(0, 114, 237, 0.5);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
    outline-offset: 2px;
  }
`;

export const Pagination = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  margin-top: 1.75rem;
  flex-wrap: wrap;
`;

export const PageInfo = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors["second-white"]};
  font-family: ${({ theme }) => theme.fonts.alt};
`;

export const PageButton = styled(SecondaryButton)`
  min-width: 2.4rem;
  justify-content: center;
`;
