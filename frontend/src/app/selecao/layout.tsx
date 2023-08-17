import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "PET Computação - Seleção",
  description: "Formulário de Inscrição para o PET Computação",
};
export const revalidate = 0;

export default function ArtigosLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
