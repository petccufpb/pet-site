import "@fontsource-variable/inter";
import "@fontsource-variable/lexend";
import "@fontsource-variable/roboto-flex";
import "@fontsource/bai-jamjuree";
import "@fontsource/bai-jamjuree/200.css";
import "@fontsource/bai-jamjuree/300.css";
import "@fontsource/bai-jamjuree/400.css";
import "@fontsource/bai-jamjuree/500.css";
import "@fontsource/bai-jamjuree/600.css";
import "@fontsource/bai-jamjuree/700.css";
import "@fontsource/bai-jamjuree/700-italic.css";

import { PropsWithChildren } from "react";

import StyledComponentsRegistry from "@components/registry";

import Layout from "./components/Layout";

export const metadata = {
  title: {
    default: "PET Computação UFPB",
    template: "%s | PET Computaçâo",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <noscript>Você precisa ter Javascript habilitado para acessar esta página.</noscript>
      </head>
      <body>
        <StyledComponentsRegistry>
          <Layout>{children}</Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
