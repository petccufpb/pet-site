"use client";

import styled from "styled-components";

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

  section:first-of-type {
    img,
    > svg {
      display: flex;
      justify-content: center;
      overflow: hidden;

      margin-bottom: -2.625rem;

      width: 100%;
      cursor: auto;
      max-height: 20rem;
      object-fit: contain;

      @media (max-width: 900px) {
        padding: 0;
      }
    }

    > div:last-child {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      align-self: flex-end;

      height: 2.625rem;

      margin-right: 0.75rem;

      > div {
        justify-content: flex-end;
        display: flex;
        color: rgba(255, 255, 255, 0.6);
        align-items: center;
        font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
        gap: 0.5rem;
        font-weight: bold;

        margin-top: 0.4375rem;

        span {
          font-size: 0.75rem;
        }
      }
    }
  }

  > section:last-of-type {
    border-left: solid 1px ${({ theme }) => theme.colors["third-grey"]};
  }

  @media (max-width: 900px) {
    grid-template-columns: none;
    grid-template-rows: auto 1fr;
    margin: none !important;

    > * {
      border-right: none;
      border-bottom: solid 1px rgba(255, 255, 230, 0.6);

      justify-content: center;
    }

    > div:first-child > div {
      align-items: center;
    }
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;

  padding: 1.25rem;

  word-break: break-word;
  overflow-x: hidden;

  width: 100%;

  > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
`;

export const Description = styled.div`
  font-family: ${({ theme }) => theme.fonts.alt};
  color: #e1e1e6;
  width: 100%;
`;

export const SmallTitle = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.625rem;
  text-transform: uppercase;
  width: max-content;
`;

export const MoreInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-width: 150px;
  }
`;

export const InstagramContainer = styled.a`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
  transition: 450ms;
  color: #e1e1e6;

  span {
    color: #ffffff;
    font-weight: 600;

    border-bottom: 0.5px solid white;
  }

  &:hover {
    filter: brightness(0.7);
  }
`;

export const SubscribeButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.sdc};
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors["base-green"]};

  background: ${({ theme }) => theme.colors["opacity-green"]};
  border-radius: 2rem;
  padding: 0.75rem 3.375rem;

  font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};
  transition: 450ms;

  min-width: min(100%, 12rem);

  a {
    color: ${({ theme }) => theme.colors["base-green"]};
  }

  &:hover {
    filter: brightness(0.8);
  }
`;

export const ImgContainer = styled.div``;
