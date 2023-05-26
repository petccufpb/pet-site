import { usePathname } from "next/navigation";
import { useState } from "react";

import GridSDC from "@assets/grid.svg";

import { BackgroundContainer, Grid } from "./styles";

export function Background() {
  const pathname = usePathname();
  const mobile = window.matchMedia("(max-width: 900px)");
  const [mobileSize, desktopSize] = ["350", "600"];

  const [decorationSize, setDecorationSize] = useState(mobile.matches ? mobileSize : desktopSize);

  mobile.addEventListener("change", x => {
    if (x.matches) {
      setDecorationSize(mobileSize);
    } else {
      setDecorationSize(desktopSize);
    }
  });

  return (
    <>
      {pathname !== "/sdc" && (
        <Grid>
          <GridSDC alt="grid" width="1208" priority></GridSDC>
        </Grid>
      )}

      <BackgroundContainer />
    </>
  );
}
