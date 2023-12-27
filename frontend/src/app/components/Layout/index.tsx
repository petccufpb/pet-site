"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import { Footer } from "@components/Footer";
import { MobileFooter } from "@components/Footer/mobile";
import { Header } from "@components/Header";
import { MobileHeader } from "@components/MobileHeader";

import { useWindow } from "@hooks/useWindow";

import Waves from "@assets/images/waves.svg?svgr";

import { GlobalStyle } from "@styles/global";
import defaultTheme from "@styles/theme/default";

import {
  Background,
  ContainerForBackground,
  FishesHider,
  LayoutContainer,
  WavesBackgroundMasker,
  WavesContainer,
} from "./styles";

const easeOutCubic = (x: number) => {
  return 1 - Math.pow(1 - x, 3);
};

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { innerWidth } = useWindow();

  return (
    <ThemeProvider theme={defaultTheme}>
      <ReactLenis
        root
        options={{
          duration: 1.2,
          easing: easeOutCubic,
        }}
      >
        <ContainerForBackground>
          {innerWidth <= 768 ? <MobileHeader /> : <Header />}

          <WavesContainer>
            <Waves />
            <WavesBackgroundMasker />
          </WavesContainer>
          {/* Apenas renderizar os peixinhos se estivermos fora da página da SDC */}
          {pathname.split("/")[1] !== "sdc" && (
            <Background limited={pathname === "/"}>{pathname !== "/" && <FishesHider />}</Background>
          )}

          <LayoutContainer id="main">
            <GlobalStyle pathname={pathname} />
            <main>{children}</main>

            <SpeedInsights />
            <Analytics />
          </LayoutContainer>

          {innerWidth <= 768 ? <MobileFooter /> : <Footer />}
        </ContainerForBackground>
      </ReactLenis>
    </ThemeProvider>
  );
}
