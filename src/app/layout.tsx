import { PropsWithChildren } from "react";
import "@styles/global";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <head>
        <title>Boilerplate PET</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
