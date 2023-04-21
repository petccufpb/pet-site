"use client";
import { Lexend } from "next/font/google";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import StyledComponentsRegistry from "@components/registry";

import { GlobalStyle } from "@styles/global";
import defaultTheme from "@styles/theme/default";

import "@styles/global";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LayoutContainer } from "../styles/layout";

const lexend = Lexend({ subsets: ["latin"] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <html lang="pt-br">
        <head>
          <title>PET Computação</title>
          <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </head>
        <body className={`${lexend.className}`}>
          <LayoutContainer>
            <StyledComponentsRegistry>
              <Header />
              <main>{children}</main>
            </StyledComponentsRegistry>
          </LayoutContainer>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}
