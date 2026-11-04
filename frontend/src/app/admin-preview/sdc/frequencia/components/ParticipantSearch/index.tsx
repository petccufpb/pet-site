import { forwardRef, KeyboardEvent, useEffect, useState } from "react";

import api from "@api";

import { Participant } from "../../types";
import { Badge, Result, Results, SearchInput, Wrapper } from "./styles";

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

interface ParticipantSearchProps {
  editionId?: string;
  eventId?: string;
  isPresent: (participantId: string) => boolean;
  onCheckIn: (participant: Participant) => void;
  onQueryChange?: (query: string) => void;
}

export const ParticipantSearch = forwardRef<HTMLInputElement, ParticipantSearchProps>(
  function ParticipantSearch({ editionId, eventId, isPresent, onCheckIn, onQueryChange }, ref) {
    const [query, setQuery] = useState("");
    // Guarda a busca que gerou os resultados: um Enter durante o debounce não pode agir sobre a lista antiga
    const [fetched, setFetched] = useState<{ query: string; items: Participant[] }>({ query: "", items: [] });
    const [activeIndex, setActiveIndex] = useState(0);

    const trimmedQuery = query.trim();
    const stale = fetched.query !== trimmedQuery;
    const results = stale ? [] : fetched.items;

    useEffect(() => {
      onQueryChange?.(query);

      const q = query.trim();
      if (q.length < MIN_QUERY_LENGTH) {
        setFetched({ query: q, items: [] });

        return;
      }

      let cancelled = false;
      const timeout = setTimeout(async () => {
        let items: Participant[] = [];
        try {
          ({ data: items } = await api.get<Participant[]>("/projects/participants/search", {
            params: { q, editionId, eventId, _t: Date.now() },
          }));
        } catch {
          // Mantém a lista vazia; o operador pode tentar de novo
        }

        if (!cancelled) {
          setFetched({ query: q, items });
          setActiveIndex(0);
        }
      }, DEBOUNCE_MS);

      return () => {
        cancelled = true;
        clearTimeout(timeout);
      };
    }, [editionId, eventId, onQueryChange, query]);

    function select(participant?: Participant) {
      if (!participant || participant.attended || isPresent(participant.id)) {
        return;
      }

      onCheckIn(participant);
      setQuery("");
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex(index => Math.min(index + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex(index => Math.max(index - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          select(results[activeIndex]);
          break;
        case "Escape":
          setQuery("");
          break;
      }
    }

    const showEmpty = !stale && trimmedQuery.length >= MIN_QUERY_LENGTH && results.length === 0;

    return (
      <Wrapper>
        <SearchInput
          ref={ref}
          type="search"
          placeholder="Buscar inscrito por nome, e-mail ou matrícula"
          autoComplete="off"
          disabled={!eventId}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-controls="participant-results"
          aria-activedescendant={results[activeIndex] ? `participant-${results[activeIndex].id}` : undefined}
        />

        {(results.length > 0 || showEmpty) && (
          <Results id="participant-results" role="listbox">
            {results.map((participant, index) => {
              const present = isPresent(participant.id) || participant.attended;

              return (
                <Result
                  key={participant.id}
                  id={`participant-${participant.id}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  aria-disabled={present}
                  $active={index === activeIndex}
                  $disabled={present}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={e => {
                    // mousedown mantém o foco no input
                    e.preventDefault();
                    select(participant);
                  }}
                >
                  <div>
                    <strong>{participant.name}</strong>
                    <span>
                      {participant.email}
                      {participant.matricula && ` · ${participant.matricula}`}
                    </span>
                  </div>
                  {present && <Badge>Presente</Badge>}
                </Result>
              );
            })}
            {showEmpty && <Result as="li">Nenhum inscrito encontrado. Alt+N para cadastrar.</Result>}
          </Results>
        )}
      </Wrapper>
    );
  },
);
