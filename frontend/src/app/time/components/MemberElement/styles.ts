"use client";

import styled from "styled-components";

import { MemberColorTheme } from ".";

export const Content = styled.div`
  display: flex;
  min-width: 300px;
`;

export const MemberTypeContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const MemberInfo = styled.div`
  display: grid;
  width: 100%;
  align-items: center;
  padding: 0.2rem 0 0.2rem 0;
  margin-left: 1rem;
`;

export const Divider = styled.div<{ colorTheme: MemberColorTheme }>`
  border: none;
  border-top: 1px solid ${({ colorTheme }) => colorTheme.color};
  margin-bottom: 0.3rem;
  margin-right: 0.5rem;
`;

export const SocialMediaIcons = styled.div<{ colorTheme: MemberColorTheme }>`
  display: inline-grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  gap: 1rem;
  width: 0;

  svg {
    color: ${({ colorTheme }) => colorTheme.color};
  }
`;

export const QuestionMark = styled.div`
  margin-left: auto;
  position: relative;

  svg {
    color: ${({ theme }) => theme.colors["second-grey"]};
  }

  small {
    bottom: 140%;
    left: 50%;
    transform: translateX(-50%) translateY(-20%);
    background: ${({ theme }) => theme.colors["base-black"]};
    position: absolute;
    z-index: 1;
    padding: 0.4rem;
    border-radius: 0.5rem;
    opacity: 0;
    transition: all 200ms ease-in-out;
    white-space: nowrap;
  }

  :hover {
    small {
      opacity: 100%;
      transform: translateX(-50%) translateY(0);
    }
  }
`;

export const MemberDescription = styled.div`
  padding-left: 0.1rem;
  display: grid;
  gap: 0.1rem;
`;
