"use client";
import { Inter, Lexend } from "next/font/google";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "@styles/global";
import defaultTheme from "@styles/theme/default";

import { LayoutContainer } from "../styles/layout";
import "@styles/global";
import { Header } from "./components/Header";

const lexend = Lexend({ subsets: ["latin"] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <html lang="pt-br">
        <head>
          <title>PET Computação</title>
        </head>
        <body className={`${lexend.className}`}>
          <LayoutContainer>
            <Header />
            {children}
          </LayoutContainer>
        </body>
      </html>
    </ThemeProvider>
  );
}
