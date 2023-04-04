"use client";

import Image from "next/image";
import { FaQuestionCircle } from "react-icons/fa";
import styled from "styled-components";

export const MemberImageContainer = styled.div<{ tutor?: boolean }>`
  position: relative;
  border: double 2px transparent;
  border-radius: 100%;
  background-image: ${({ theme, tutor }) =>
    tutor ? theme.colors["gradient-blue"] : theme.colors["gradient-green"]};
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin-right: 1rem;
  display: grid;
  place-items: center;
`;

export const MemberImage = styled(Image)`
  border-radius: 100%;
  outline: 2px solid ${({ theme }) => theme.colors["base-black"]};
  margin: 4px;
`;

export const Flex = styled.div`
  display: flex;
`;

export const MemberTypeContainer = styled(Flex)`
  align-items: center;
`;

export const MemberInfo = styled.div`
  display: grid;
  grid-template-rows: 5fr 5fr 1fr 5fr;
  width: 100%;
  align-items: center;
  padding: 0.2rem 0 0.2rem 0;
`;

export const Divider = styled.div<{ tutor?: boolean }>`
  width: 97.5%;
  border: none;
  border-top: 1px solid
    ${({ theme, tutor }) => (tutor ? theme.colors["base-blue"] : theme.colors["base-green"])};
`;

export const SocialMediaIcons = styled.div<{ tutor?: boolean }>`
  display: flex;
  align-items: center;

  svg {
    color: ${({ theme, tutor }) => (tutor ? theme.colors["base-blue"] : theme.colors["base-green"])};
    margin-right: 0.7rem;
  }
`;

export const QuestionMark = styled(FaQuestionCircle)`
  margin-left: auto;
  color: ${({ theme }) => theme.colors["second-white"]};
`;
