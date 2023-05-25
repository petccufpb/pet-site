import { usePathname } from "next/navigation";

import GridSDC from "@assets/grid.svg";

import { BackgroundContainer, Grid } from "./styles";

export function Background() {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/sdc" && (
        <Grid>
          <GridSDC alt="grid" width="1208" priority></GridSDC>
        </Grid>
      )}
      <BackgroundContainer>
        <svg height="400" width="400">
          <ellipse cx="200" cy="200" rx="200" ry="200"></ellipse>
        </svg>
        <svg height="400" width="400">
          <ellipse cx="200" cy="200" rx="200" ry="200"></ellipse>
        </svg>
        <svg height="400" width="400">
          <ellipse cx="200" cy="200" rx="200" ry="200"></ellipse>
        </svg>
        <svg height="400" width="400">
          <ellipse cx="200" cy="200" rx="200" ry="200"></ellipse>
        </svg>
        <svg height="400" width="400">
          <ellipse cx="200" cy="200" rx="200" ry="200"></ellipse>
        </svg>
      </BackgroundContainer>
    </>
  );
}
