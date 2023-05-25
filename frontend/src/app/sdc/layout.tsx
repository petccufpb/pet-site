"use client";
import { PropsWithChildren } from "react";

import "@styles/global";

import { Background } from "./components/Background";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Background />
    </>
  );
}
