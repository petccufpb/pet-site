/*deploy 222*/

"use client";

import "@fontsource-variable/inter";
import "@fontsource-variable/lexend";
import "@fontsource/bai-jamjuree";
import "@fontsource/bai-jamjuree/200.css";
import "@fontsource/bai-jamjuree/300.css";
import "@fontsource/bai-jamjuree/400.css";
import "@fontsource/bai-jamjuree/500.css";
import "@fontsource/bai-jamjuree/600.css";
import "@fontsource/bai-jamjuree/700.css";
import "@fontsource/roboto";

import Head from "next/head";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import { Header } from "@components/Header";
import { MobileHeader } from "@components/MobileHeader";
import StyledComponentsRegistry from "@components/registry";

import Fishes from "@assets/images/fish.svg?svgr";

import { GlobalStyle } from "@styles/global";
import { Background, ContainerForBackground, LayoutContainer } from "@styles/layout";
import defaultTheme from "@styles/theme/default";

import { Footer } from "../components/Footer";

export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={defaultTheme}>
        <html lang="pt-br">
          <Head>
            <title key={0}>PET Ciência da Computação - Universidade Federal da Paraíba</title>
            <meta
              key={1}
              name="description"
              content="O Programa de Educação Tutorial (PET) Ciência da Computação da Universidade Federal da Paraíba é um grupo que tem como pilares: Ensino, Pesquisa e Extensão."
            />
          </Head>
          <head>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <noscript>Você precisa ter Javascript habilitado para acessar esta página.</noscript>
          </head>
          <body>
            {/* <NextTopLoader color="#0072ED" /> */}
            <ContainerForBackground>
              {/* Apenas renderizar os peixinhos se estivermos fora da página da SDC */}
              {pathname.split("/")[1] !== "sdc" && (
                <Background>
                  <Fishes />
                </Background>
              )}
              <LayoutContainer>
                <GlobalStyle pathname={pathname} />
                <Header />
                <MobileHeader />
                <main>{children}</main>
              </LayoutContainer>
            </ContainerForBackground>
            <Footer />
          </body>
        </html>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
