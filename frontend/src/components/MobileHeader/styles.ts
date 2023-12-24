"use client";
import styled from "styled-components";

export const HeaderContainer = styled.div<{ expand: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 2rem;
  overflow: hidden;

  > img {
    z-index: -1;
  }
`;

export const ToggleButton = styled.div<{ expand: boolean }>`
  background: black;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 100%;
  position: ${({ expand }) => (expand ? "fixed" : "relative")};
  border: 1px solid #ffffff30;
  display: flex;
  justify-content: center;
  z-index: 101;

  right: ${({ expand }) => (expand ? "1rem" : 0)};

  > div {
    position: absolute;
    transform-origin: center;
    width: 50%;
    height: 2px;
    background: white;
    transition: all 0.2s ease-in-out;
  }

  > div:first-child {
    rotate: ${({ expand }) => (expand ? "45deg" : "0")};
    top: ${({ expand }) => (expand ? "50%" : "40%")};
  }

  > div:last-child {
    rotate: ${({ expand }) => (expand ? "-45deg" : "0")};
    top: ${({ expand }) => (expand ? "50%" : "60%")};
  }
`;

export const ExpandMenu = styled.div<{ expand: boolean; display: string; docHeight?: number }>`
  font-family: ${({ theme }) => theme.fonts.sdc};
  display: ${({ display }) => display};
  position: fixed;
  top: 0;
  left: 0;
  height: ${({ docHeight }) => (docHeight ? docHeight + "px" : "100vh")};
  width: 100vw;
  padding: 2rem 1rem;
  z-index: 100;

  background: white;
  font-weight: 600;
  color: black;

  animation-duration: 350ms;
  animation-timing-function: ease-in-out;
  animation-name: ${({ expand }) => (expand ? "slideIn" : "slideOut")};

  opacity: ${({ expand }) => (expand ? 1 : 0)};

  > div:first-child {
    font-weight: bold;
  }

  > div:last-child {
    margin-top: auto;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }

    to {
      display: none;
      opacity: 0;
      transform: translateX(-100%);
    }
  }
`;

export const Links = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: #00000095;
`;

export const SocialMediaLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;

  color: #00000098;

  font-weight: bold;

  > a {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    > svg {
      color: black;
    }
  }
`;

export const RouteLink = styled.a<{ tab: string }>`
  padding: 0.5rem 0;
  padding-left: 1rem;
  border-width: 1px;
  border-left-style: solid;

  color: ${({ tab, href }) => (tab === href ? "black" : "inherit")};
  border-color: ${({ tab, href }) => (tab === href ? "black" : "#00000030")};
`;
