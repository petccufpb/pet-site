import { Metadata } from "next";

import ErrorPage from "../components/ErrorPage";

export const metadata: Metadata = {
  title: "Plataforma | SDC - Em breve",
};

export default function EmBreve() {
  return <ErrorPage title="Em breve" subtitle="Fique ligado, em breve essa página estará disponível!" />;
}
