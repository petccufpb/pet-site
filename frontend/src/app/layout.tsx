"use client";

import { Lexend } from "next/font/google";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import NProgress from "nprogress";
import { PropsWithChildren, useEffect } from "react";
import { ThemeProvider } from "styled-components";

import { Header } from "@components/Header";
import { MobileHeader } from "@components/MobileHeader";
import StyledComponentsRegistry from "@components/registry";

import Fishes from "@assets/images/fish.svg";

import { GlobalStyle } from "@styles/global";
import { Background, ContainerForBackground, LayoutContainer } from "@styles/layout";
import defaultTheme from "@styles/theme/default";

import { Footer } from "../components/Footer";
import "nprogress/nprogress.css";

const lexend = Lexend({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle pathname={pathname} />
      <html lang="pt-br">
        <head>
          <title>PET Ciência da Computação - Universidade Federal da Paraíba</title>
          <link rel="shortcut icon" href="/images/logo-sm.png" type="image/x-icon" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta
            name="description"
            content="O Programa de Educação Tutorial (PET) Ciência da Computação da Universidade Federal da Paraíba é um grupo que tem como pilares: Ensino, Pesquisa e Extensão."
          />
          <noscript>Você precisa ter Javascript habilitado para acessar esta página.</noscript>
        </head>
        <body className={lexend.className}>
          <ContainerForBackground>
            {/* Apenas renderizar os peixinhos se estivermos fora da página da SDC */}
            {pathname.split("/")[1] !== "sdc" && (
              <Background>
                <Fishes />
              </Background>
            )}
            <LayoutContainer>
              <StyledComponentsRegistry>
                <Header />
                <MobileHeader />
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
