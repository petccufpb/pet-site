import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "PET Computação - Time",
  description: "Time do PET Computação",
};
export const revalidate = 0;

export default function ArtigosLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
