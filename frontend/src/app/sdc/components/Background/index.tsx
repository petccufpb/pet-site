"use client";

import { usePathname } from "next/navigation";

import GridSDC from "@assets/images/grid.svg?svgr";

import { BackgroundContainer, Grid, SVGBackground, SdcEllipse } from "./styles";

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
        <SVGBackground xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="gradient">
              <stop offset="0%" stopColor="#0072ed" />
              <stop offset="90%" stopColor="#0072ed20" />
              <stop offset="100%" stopColor="#00000000" />
            </radialGradient>
          </defs>
          <g fill="url(#gradient)">
            <SdcEllipse cx="0" cy="0" rx="500" ry="500" />
            <SdcEllipse cx="90%" cy="25%" rx="500" ry="500" />
            <g style={{ opacity: "80%" }}>
              <SdcEllipse cx="15%" cy="48%" rx="500" ry="500" />
            </g>
            <g style={{ opacity: "80%" }}>
              <SdcEllipse cx="60%" cy="75%" rx="500" ry="500" />
            </g>
            <SdcEllipse cx="10%" cy="100%" rx="500" ry="500" />
          </g>
        </SVGBackground>
      </BackgroundContainer>
    </>
  );
}
