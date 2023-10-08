import { PropsWithChildren } from "react";

import { VideosProvider } from "@context/videos";

export default function AcervoLayout({ children }: PropsWithChildren) {
  return <div style={{ margin: "4vh 0" }}>{children}</div>;
}
