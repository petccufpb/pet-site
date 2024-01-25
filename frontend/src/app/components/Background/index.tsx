"use client";

import { usePathname } from "next/navigation";

import GridSDC from "@assets/images/grid.svg?svgr";
import SDCXXIXWaves from "@assets/images/sdc/xxix/background-graphic.svg?svgr";
import SDCXXIXGraphic from "@assets/images/sdc/xxix/circle-graphic.svg?svgr";
import Dots from "@assets/images/sdc/xxix/dots-graphic.svg?svgr";

import { BackgroundContainer, Grid, SVGBackground, GlowEllipse } from "./styles";

export function Background() {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/sdc" && (
        <Grid>
          <GridSDC alt="grid" width="1208" />
        </Grid>
      )}
      <BackgroundContainer>
        <SDCXXIXWaves
          opacity="0.25"
          style={{ position: "absolute", right: "0", width: "100%", top: "50px" }}
        />
        <SDCXXIXGraphic style={{ position: "absolute", top: "500px", left: "0" }} />
        <Dots style={{ position: "absolute", bottom: "0", left: "0" }} />
        <SVGBackground xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="gradient">
              <stop offset="0%" stopColor="#0072ed" />
              <stop offset="90%" stopColor="#0072ed20" />
              <stop offset="100%" stopColor="#00000000" />
            </radialGradient>
            <radialGradient id="gradient-red">
              <stop offset="0%" stopColor="#E32C4C" />
              <stop offset="90%" stopColor="#2c0209" />
              <stop offset="100%" stopColor="#00000000" />
            </radialGradient>
          </defs>
          <g fill="url(#gradient)">
            <GlowEllipse opacity="0.6" cx="90%" cy="550px" rx="500" ry="500" />
            <GlowEllipse cx="15%" cy="100%" rx="600" ry="600" />
          </g>
        </SVGBackground>
      </BackgroundContainer>
    </>
  );
}
