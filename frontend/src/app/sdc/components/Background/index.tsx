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
            <radialGradient id="gradient-red">
              <stop offset="0%" stopColor="#E32C4C" />
              <stop offset="90%" stopColor="#2c0209" />
              <stop offset="100%" stopColor="#00000000" />
            </radialGradient>
          </defs>
          <g fill="url(#gradient)">
            <g style={{ opacity: "80%" }}>
              <SdcEllipse fill="url(#gradient-red)" cx="0" cy="0" rx="500" ry="500" />
            </g>
            <SdcEllipse cx="90%" cy="500px" rx="500" ry="500" />
            <g style={{ opacity: "80%" }}>
              <SdcEllipse cx="15%" cy="1080px" rx="500" ry="500" />
            </g>
            <g style={{ opacity: "80%" }}>
              <SdcEllipse fill="url(#gradient-red)" cx="60%" cy="1600px" rx="400" ry="400" />
            </g>
            <SdcEllipse cx="10%" cy="2300px" rx="500" ry="500" />
          </g>
        </SVGBackground>
      </BackgroundContainer>
    </>
  );
}
