"use client";

import { PropsWithChildren } from "react";

import { Background } from "./components/Background";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Background />
    </>
  );
}
