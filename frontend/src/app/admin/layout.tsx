import { Metadata } from "next";
import { PropsWithChildren } from "react";

import AdminLayout from "@components/AdminLayout";

export const metadata: Metadata = {
  title: { default: "Administração", template: "%s | Administração" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: PropsWithChildren) {
  return <AdminLayout>{children}</AdminLayout>;
}
