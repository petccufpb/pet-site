"use client";
import { Lexend } from "next/font/google";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "@styles/global";
import defaultTheme from "@styles/theme/default";

import { LayoutContainer } from "../styles/layout";
import "@styles/global";

const lexend = Lexend({ subsets: ["latin"] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <html lang="pt-br">
        <head>
          <title>Boilerplate PET</title>
        </head>
        <body>
          <LayoutContainer className={lexend.className}>{children}</LayoutContainer>
        </body>
      </html>
    </ThemeProvider>
  );
}
