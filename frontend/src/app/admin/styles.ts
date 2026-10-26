"use client";
import Link from "next/link";
import styled from "styled-components";

export const Intro = styled.div`
  margin-bottom: 1.75rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
  }

  p {
    margin-top: 0.5rem;
    max-width: 44rem;
    font-size: 0.95rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const ModuleGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;

  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ModuleCard = styled(Link)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  padding: 1.35rem;
  border-radius: 12px;
  text-decoration: none;

  background: ${({ theme }) => theme.colors["fifth-black"]};
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};

  transition: border-color 200ms ease, transform 200ms ease;

  &:hover {
    border-color: rgba(0, 114, 237, 0.55);
    transform: translateY(-3px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors["fifth-blue"]};
    outline-offset: 2px;
  }
`;

export const ModuleIconBox = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 10px;

  color: #9ec9ff;
  background: rgba(0, 114, 237, 0.16);
  border: 1px solid rgba(0, 114, 237, 0.35);

  svg {
    font-size: 1.35rem;
  }
`;

export const ModuleText = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;

  strong {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors["base-white"]};
  }

  small {
    font-size: 0.83rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors["second-white"]};
    font-family: ${({ theme }) => theme.fonts.alt};
  }
`;

export const ModuleArrow = styled.span`
  margin-left: auto;
  align-self: center;
  color: ${({ theme }) => theme.colors["base-grey"]};
  transition: color 200ms ease, transform 200ms ease;

  ${ModuleCard}:hover & {
    color: ${({ theme }) => theme.colors["third-blue"]};
    transform: translateX(3px);
  }
`;

export const Hint = styled.p`
  margin-top: 2rem;
  padding: 0.9rem 1.1rem;
  border-radius: 10px;

  font-size: 0.85rem;
  line-height: 1.6;
  font-family: ${({ theme }) => theme.fonts.alt};
  color: ${({ theme }) => theme.colors["second-white"]};

  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${({ theme }) => theme.colors["line-white"]};
`;
