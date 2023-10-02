"use client";
import Image from "next/image";
import styled from "styled-components";

import { MemberColorTheme } from "../..";

interface BorderParams {
  colorTheme: MemberColorTheme;
}

export const Border = styled.div<BorderParams>`
  position: relative;
  border: double 2px transparent;
  border-radius: 100%;
  background-image: ${({ colorTheme }) => colorTheme.gradient};
  background-origin: border-box;
  background-clip: content-box, border-box;
  display: grid;
  place-items: center;
  margin-top: auto;
  margin-bottom: auto;
`;

export const MemberImage = styled(Image)`
  border-radius: 100%;
  outline: 2px solid ${({ theme }) => theme.colors["second-blue"]};
  margin: 4px;
  object-fit: cover;
`;
