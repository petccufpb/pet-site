"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { SDCEdition } from "sdc-admin";
import { fetchEditions, fetchLatestEdition } from "../services/projects/editionsService";
import { MOCK_EDITIONS } from "../services/mocks/sdcMocks";

export interface SDCContextData {
  currentEdition: SDCEdition | null;
  editionId: string | null;
  editions: SDCEdition[];
  isLoading: boolean;
  error: string | null;
  selectEdition: (editionId: string) => void;
  refreshEditions: () => Promise<void>;
}

const SDCContext = createContext<SDCContextData | undefined>(undefined);

interface SDCProviderProps {
  children: ReactNode;
  initialEditionId?: string;
}

export function SDCProvider({ children, initialEditionId }: SDCProviderProps) {
  const [editions, setEditions] = useState<SDCEdition[]>([]);
  const [currentEdition, setCurrentEdition] = useState<SDCEdition | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (preserveEditionId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const [allEditions, latest] = await Promise.all([
        fetchEditions().catch(() => null),
        fetchLatestEdition().catch(() => null),
      ]);

      const availableEditions = allEditions && allEditions.length > 0 ? allEditions : MOCK_EDITIONS;
      const defaultActive = latest ?? availableEditions[0] ?? null;

      setEditions(availableEditions);

      const targetId = preserveEditionId ?? defaultActive?.id;
      const matched = availableEditions.find((e) => e.id === targetId);

      setCurrentEdition(matched ?? defaultActive);
    } catch (err: any) {
      setError(err?.message || "Erro ao carregar edições da SDC");
      setEditions(MOCK_EDITIONS);
      setCurrentEdition(MOCK_EDITIONS[0]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(initialEditionId);
  }, [loadData, initialEditionId]);

  const selectEdition = useCallback(
    (id: string) => {
      const target = editions.find((e) => e.id === id);
      if (target) {
        setCurrentEdition(target);
      }
    },
    [editions]
  );

  const refreshEditions = useCallback(async () => {
    await loadData(currentEdition?.id);
  }, [loadData, currentEdition?.id]);

  const value: SDCContextData = {
    currentEdition,
    editionId: currentEdition?.id ?? null,
    editions,
    isLoading,
    error,
    selectEdition,
    refreshEditions,
  };

  return <SDCContext.Provider value={value}>{children}</SDCContext.Provider>;
}

export function useSDC(): SDCContextData {
  const context = useContext(SDCContext);
  if (!context) {
    throw new Error("useSDC deve ser utilizado dentro de um SDCProvider");
  }
  return context;
}

export default SDCContext;
