import Image from "next/image";
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
        <svg>
          <circle r="20rem" fill="#0072ED"></circle>
        </svg>
        <svg>
          <circle r="20rem" fill="#0072ED"></circle>
        </svg>
        <svg>
          <circle r="20rem" fill="#0072ED"></circle>
        </svg>
        <svg>
          <circle r="20rem" fill="#0072ED"></circle>
        </svg>
        <svg>
          <circle r="20rem" fill="#0072ED"></circle>
        </svg>
      </BackgroundContainer>
    </>
  );
}
