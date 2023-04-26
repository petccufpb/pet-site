"use client";

import styled from "styled-components";

export const Head = styled.div`
  display: grid;
  width: 100%;
  border-top: solid 0.5px ${({ theme }) => theme.colors["third-grey"]};
  border-bottom: solid 1px ${({ theme }) => theme.colors["third-grey"]};
  grid-template-columns: 1fr 1fr;
  margin: 2rem 0;
`;

export const Section = styled.div`
  padding: 0.8rem 1.2rem;
`;

export const LastEditionSection = styled(Section)`
  border-right: solid 1px ${({ theme }) => theme.colors["third-grey"]};
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Title = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
`;

export const SectionTitle = styled(Title)`
  margin-bottom: 1rem;
`;

export const Background = styled.div`
  position: absolute;
  z-index: -1;
  filter: blur(10rem);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  svg:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
  }

  svg:nth-child(1) {
    position: absolute;
    translate: -60% 0;
    top: 50%;
    left: 100%;
  }
`;

export const Description = styled.div`
  margin-bottom: 3rem;
`;

export const MoreInfo = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
`;

export const InstagramContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  text-decoration: underline;

  padding: 0.5rem 0;
`;

export const SubscribeButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors["base-green"]};
  color: ${({ theme }) => theme.colors["base-green"]};
  background: ${({ theme }) => theme.colors["opacity-green"]};
  border-radius: 2rem;
  margin: 0.5rem 0;

  font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};
`;

export const SubscribeCount = styled.div`
  padding-right: 1rem;
  justify-content: right;
  display: flex;
  color: rgba(255, 255, 255, 0.6);
  align-items: center;
  font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};
  gap: 0.5rem;
  margin-top: auto;
  padding-bottom: 0.2rem;
`;

export const CountDown = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;

  > span {
    text-align: right;
    font-weight: 300;
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  }
`;

export const Timer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 300;
`;

export const Divider = styled.div`
  height: 0;
  width: 2rem;
  border-top: solid 1px rgba(255, 255, 255, 0.5);
`;

export const TimeUnit = styled.div`
  display: grid;
  gap: 0.5rem;
  justify-content: center;
  text-align: center;

  h3 {
    font-weight: 400;
  }

  span {
    font-weight: 200;
    font-size: ${({ theme }) => theme.textSizes["text-regular-xs"]};
    opacity: 60%;
  }
`;
