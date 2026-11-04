"use client";

import React, { useEffect, useState, useMemo } from "react";
import { HiOutlineMicrophone, HiOutlineUserGroup } from "react-icons/hi";
import { SpeakerForm } from "@components/SpeakerForm";
import api from "@services/api";
import { getDirectImageLink } from "@utils/googleDrive";
import {
  Container,
  Header,
  TitleArea,
  LayoutGrid,
  Card,
  ListHeader,
  SearchInput,
  SpeakerGrid,
  SpeakerCard,
  AvatarBox,
  SpeakerMeta,
  EmptyState,
  LoadingState,
} from "./styles";

interface Speaker {
  id: string;
  name: string;
  about?: string | null;
  photoUrl?: string | null;
}

export default function AdminPalestrantesPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    let active = true;
    setIsLoading(true);

    api
      .get<Speaker[]>("/projects/speakers")
      .then(({ data }) => {
        if (active && Array.isArray(data)) {
          setSpeakers(data);
        }
      })
      .catch(err => {
        console.error("Erro ao listar palestrantes:", err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [refreshKey]);

  const filteredSpeakers = useMemo(() => {
    if (!search.trim()) return speakers;
    const term = search.toLowerCase();
    return speakers.filter(
      s =>
        s.name.toLowerCase().includes(term) ||
        (s.about && s.about.toLowerCase().includes(term)),
    );
  }, [speakers, search]);

  return (
    <Container>
      <Header>
        <TitleArea>
          <h1>
            <HiOutlineMicrophone />
            Palestrantes Convidados
          </h1>
          <p>
            Cadastre novos palestrantes com upload de foto e consulte a lista de palestrantes registrados no sistema da SDC.
          </p>
        </TitleArea>
      </Header>

      <LayoutGrid>
        <Card>
          <h2>
            <HiOutlineMicrophone />
            Novo Palestrante
          </h2>
          <SpeakerForm onCreated={() => setRefreshKey(k => k + 1)} />
        </Card>

        <Card>
          <ListHeader>
            <h2>
              <HiOutlineUserGroup />
              Palestrantes Cadastrados ({filteredSpeakers.length})
            </h2>

            <SearchInput
              type="text"
              placeholder="Buscar por nome ou biografia..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </ListHeader>

          {isLoading ? (
            <LoadingState>Carregando palestrantes...</LoadingState>
          ) : filteredSpeakers.length === 0 ? (
            <EmptyState>
              <p>Nenhum palestrante encontrado.</p>
            </EmptyState>
          ) : (
            <SpeakerGrid>
              {filteredSpeakers.map(speaker => {
                const photoSrc = getDirectImageLink(speaker.photoUrl);
                return (
                  <SpeakerCard key={speaker.id}>
                    <AvatarBox>
                      {photoSrc ? (
                        <img
                          src={photoSrc}
                          alt={speaker.name}
                          referrerPolicy="no-referrer"
                          onError={e => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span>Sem foto</span>
                      )}
                    </AvatarBox>
                    <SpeakerMeta>
                      <h3>{speaker.name}</h3>
                      <p title={speaker.about || undefined}>
                        {speaker.about || "Sem descrição informada."}
                      </p>
                    </SpeakerMeta>
                  </SpeakerCard>
                );
              })}
            </SpeakerGrid>
          )}
        </Card>
      </LayoutGrid>
    </Container>
  );
}

