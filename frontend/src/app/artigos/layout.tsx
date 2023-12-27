import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Artigos",
  description: "Artigos publicados pelo PET Computação",
};
export const revalidate = 0;

export default function ArtigosLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
