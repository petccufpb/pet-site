import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Plataforma | SDC - Inscrição",
};

export default function InscricaoLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
