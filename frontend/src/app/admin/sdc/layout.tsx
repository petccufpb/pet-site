"use client";

import React, { ReactNode } from "react";
import styled from "styled-components";
import { SDCProvider } from "../../../contexts/SDCContext";

const ShellContainer = styled.div`
  min-height: 100%;
  background: ${({ theme }) => theme.colors["base-black"]};
  color: ${({ theme }) => theme.colors["base-white"]};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export default function SDCAdminLayout({ children }: { children: ReactNode }) {
  return (
    <SDCProvider>
      <ShellContainer>
        <main>{children}</main>
      </ShellContainer>
    </SDCProvider>
  );
}
