"use client";

import { Section } from "@app/sdc/styles";
import Link from "next/link";
import styled from "styled-components";

export const LastEditionSection = styled(Section)`
  border-right: solid 1px ${({ theme }) => theme.colors["third-grey"]};
  display: flex;
  flex-direction: column;
  align-items: stretch;

  img {
    width: min(100%, 360px);
    height: auto;
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Description = styled.div`
  font-family: ${({ theme }) => theme.fonts.alt};
  width: 100%;
`;

export const MoreInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  justify-content: space-between;
`;

export const InstagramContainer = styled.a`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: 450ms;

  div {
    border-bottom: 0.5px solid white;
  }

  &:hover {
    filter: brightness(0.7);
  }
`;

export const HeadContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.sdc};
  display: grid;

  word-break: break-word;
  overflow-x: hidden;

  width: 100%;
  border-top: solid 0.5px ${({ theme }) => theme.colors["third-grey"]};
  border-bottom: solid 1px ${({ theme }) => theme.colors["third-grey"]};
  grid-template-columns: 1fr 1fr;

  margin: 2rem 0;

  @media (max-width: 900px) {
    grid-template-columns: none;
    grid-template-rows: auto 1fr;
    margin: none !important;

    > * {
      border-right: none;
      border-bottom: solid 1px rgba(255, 255, 230, 0.6);

      justify-content: center;
    }

    // Fazer com que o container da útlima edição
    // centralize seus filhos
    // quando houver wrap na grid.
    > div:first-child > div {
      align-items: center;
    }
  }
`;

export const SubscribeButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.sdc};
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors["base-green"]};

  background: ${({ theme }) => theme.colors["opacity-green"]};
  border-radius: 2rem;
  margin: 0.5rem 0;

  font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};
  transition: 450ms;

  min-width: min(100%, 12rem);
  height: 2.5rem;

  a {
    color: ${({ theme }) => theme.colors["base-green"]};
  }

  &:hover {
    filter: brightness(0.8);
  }

  @media (max-width: 900px) {
    margin: 0.5rem auto;
  }
`;

export const SubscribeCount = styled.div`
  padding-right: 1rem;
  justify-content: flex-end;
  display: flex;
  color: rgba(255, 255, 255, 0.6);
  align-items: center;
  font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};
  gap: 0.5rem;
  padding-bottom: 0.2rem;
`;

export const JustifyBetween = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
