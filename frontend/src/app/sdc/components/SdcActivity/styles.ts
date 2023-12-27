"use client";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const SdcButton = styled.div<{ availability: boolean; extrasAvailable?: boolean }>`
  font-family: inherit;
  color: white;
  margin: 0 auto;
  border-radius: 2rem;
  padding: 0.4rem 0.3rem;
  width: 100%;
  text-align: center;
  font-weight: 500;
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  border-width: 1px;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;

  a {
    cursor: ${({ availability }) => (availability ? "pointer" : "default")};
  }
`;

export const Availability = styled(SdcButton)`
  max-width: 7.5rem;
  border: 1px solid
    ${({ availability, extrasAvailable, theme }) => {
      if (availability) {
        if (extrasAvailable) {
          return theme.colors["sixth-grey"];
        }

        return theme.colors["base-green"];
      }

      return theme.colors["fourth-red"];
    }};
  background: ${({ theme, availability, extrasAvailable }) =>
    availability
      ? `${extrasAvailable ? theme.colors["sixth-grey"] : theme.colors["base-green"]}60`
      : "rgba(213, 35, 45, 0.6)"};
  font-weight: 700;
  font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};
  display: flex;
  gap: 0.5rem;
`;

export const Subscribe = styled(SdcButton)`
  cursor: ${({ availability }) => (availability ? "pointer" : "default")};
  max-width: 10.5rem;
  border-color: ${({ availability, theme }) =>
    availability ? theme.colors["fifth-blue"] : theme.colors["fourth-grey"]};
  background: ${({ availability }) => (availability ? "rgba(0, 114, 237, 0.6)" : "rgba(34, 34, 34, 0.6)")};
  color: ${({ availability, theme }) => (availability ? "white" : theme.colors["fourth-grey"])};
  transition: 450ms;
  font-weight: 700;
  font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};

  &:hover {
    filter: ${({ availability }) => (availability ? "brightness(.8)" : "")};
  }

  padding: 0.5rem 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  pointer-events: ${({ availability }) => (availability ? "auto" : "none")};
`;

export const SpeakerPhoto = styled(Image)`
  border-radius: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

export const SDCtr = styled.tr`
  * {
    white-space: break-spaces;
  }
`;

export const SubscribeLink = styled.a<{ disabled: boolean }>`
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;
