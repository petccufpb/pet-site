"use client";

import styled from "styled-components";

export const ContentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors["second-black"]};
`;

export const Content = styled.div`
  max-width: 70rem;
  margin-right: auto;
  margin-left: auto;
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1rem;
  padding-top: 4rem;

  @media (max-width: 70rem) {
    padding: 0 1rem;
  }
`;

export const PETBranding = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Flex = styled.div`
  box-sizing: border-box;
  align-items: center;
  display: flex;
  margin-bottom: 0.4rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;

  a {
    color: ${({ theme }) => theme.colors["base-white"]};
  }
`;

export const NameContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 1rem;
`;

export const Divider = styled.hr`
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors["base-black"]};
`;

export const SocialMediaInfo = styled.div`
  max-width: 70rem;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  padding: 1rem 0;

  @media (max-width: 70rem) {
    padding: 0 1rem;
  }
`;

export const SocialMediaIconContainer = styled.a<{ white?: boolean }>`
  padding: 0.65rem;
  display: grid;
  place-items: center;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors["base-black"]};
  margin-right: 0.5rem;

  > svg {
    color: ${props => (props.white ? props.theme.colors["base-white"] : props.theme.colors["base-blue"])};
  }
`;

export const ExpandMenuContainer = styled(SocialMediaIconContainer)`
  margin-left: auto;
`;

export const NextInfo = styled(Flex)`
  margin-top: 1rem;
`;

export const NextLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  margin-right: 1rem;
`;

export const VerticalCenterDiv = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;
