"use client";
import { Lexend } from "next/font/google";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import StyledComponentsRegistry from "@components/registry";

import Fishes from "@assets/fish.svg";

import { GlobalStyle } from "@styles/global";
import defaultTheme from "@styles/theme/default";

import "@styles/global";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Background, ContainerForBackground, LayoutContainer } from "../styles/layout";

import { usePathname } from "next/navigation";

const lexend = Lexend({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle pathname={pathname} />
      <html lang="pt-br">
        <head>
          <title>PET Computação</title>
          <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </head>
        <body className={`${lexend.className}`}>
          <ContainerForBackground>
            <Background pathname={pathname}>
              <Fishes />
            </Background>
            <LayoutContainer>
              <StyledComponentsRegistry>
                <Header />
                <main>{children}</main>
              </StyledComponentsRegistry>
            </LayoutContainer>
          </ContainerForBackground>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}
