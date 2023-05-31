import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Plataforma | SDC - Admin",
};

export default function AdminLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
