import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Inscrição",
};

export default function InscricaoLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
