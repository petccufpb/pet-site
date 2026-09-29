import { useEffect, useState } from "react";

import api from "@api";

import { SdcEdition } from "../types";

// Provisório: substituir pelo contexto de edição ativa do painel (Dev 3) quando estiver pronto
export function useActiveEdition() {
  const [edition, setEdition] = useState<SdcEdition | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get<SdcEdition>("/projects/editions/latest", { params: { project: "SDC" } })
      .then(({ data }) => setEdition(data))
      .catch(() => setError(true));
  }, []);

  return { edition, error };
}
