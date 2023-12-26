"use client";
import { ReactNode, useEffect, useState } from "react";

import { Styling } from "./styles";

interface BlurGroupProps {
  children: ReactNode;
  relativeTo?: string;
}

export default function BlurGroup({ children, relativeTo }: BlurGroupProps) {
  const [blurHeight, setBlurHeight] = useState<string | number>("100vh");
  const [heightOffset, setHeightOffset] = useState(0);

  useEffect(
    () => {
      const elem = document.body.querySelector(`#${relativeTo}`) as HTMLElement | null;
      const offsetTop = elem?.offsetTop || 0;

      setHeightOffset(offsetTop);
      setBlurHeight(document.body.clientHeight - offsetTop);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    typeof document !== "undefined" ? [document.body.clientHeight] : [],
  );

  return <Styling style={{ height: blurHeight, top: heightOffset }}>{children}</Styling>;
}
