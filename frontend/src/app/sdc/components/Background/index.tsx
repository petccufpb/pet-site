import Image from "next/image";
import { BackgroundContainer, Grid } from "./styles";
import GridSDC from "@assets/gridSDC.png";

export function Background() {
  return (
    <>
      <Grid>
        <Image alt="grid" src={GridSDC} width="1208" priority></Image>
      </Grid>
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
