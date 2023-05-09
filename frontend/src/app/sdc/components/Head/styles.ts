import { Section } from "@app/sdc/styles";
import styled from "styled-components";

export const LastEditionSection = styled(Section)`
  border-right: solid 1px ${({ theme }) => theme.colors["third-grey"]};
  display: flex;
  flex-direction: column;
  align-items: stretch;
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

export const HeadContainer = styled.div`
  display: grid;
  width: 100%;
  border-top: solid 0.5px ${({ theme }) => theme.colors["third-grey"]};
  border-bottom: solid 1px ${({ theme }) => theme.colors["third-grey"]};
  grid-template-columns: 1fr 1fr;
  margin: 2rem 0;
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
