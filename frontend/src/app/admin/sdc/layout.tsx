"use client";

import React, { ReactNode } from "react";
import styled from "styled-components";
import { SDCProvider } from "../../../contexts/SDCContext";

const ShellContainer = styled.div`
  min-height: 100%;
  color: ${({ theme }) => theme.colors["base-white"]};
  font-family: ${({ theme }) => theme.fonts.regular};

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors["base-white"]};
  }
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
