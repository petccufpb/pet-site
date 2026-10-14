"use client";

import React from "react";
import { HiOutlineSearch, HiOutlineCalendar } from "react-icons/hi";
import {
  FilterBarContainer,
  TopRow,
  TabsGroup,
  FilterTab,
  SearchBox,
  Divider,
  WeekdayRow,
  WeekdayLabel,
  WeekdayChips,
  WeekdayChip,
} from "./styles";

export interface WeekdayItem {
  dayNumber: number;
  label: string;
}

const WEEKDAYS: WeekdayItem[] = [
  { dayNumber: 1, label: "Segunda" },
  { dayNumber: 2, label: "Terça" },
  { dayNumber: 3, label: "Quarta" },
  { dayNumber: 4, label: "Quinta" },
  { dayNumber: 5, label: "Sexta" },
  { dayNumber: 6, label: "Sábado" },
  { dayNumber: 0, label: "Domingo" },
];

interface EventFiltersProps {
  selectedType: string;
  onSelectType: (type: string) => void;
  selectedWeekday: string;
  onSelectWeekday: (day: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    palestra: number;
    minicurso: number;
    main: number;
  };
  weekdayCounts: { [key: number]: number };
}

export function EventFilters({
  selectedType,
  onSelectType,
  selectedWeekday,
  onSelectWeekday,
  searchQuery,
  onSearchChange,
  counts,
  weekdayCounts,
}: EventFiltersProps) {
  return (
    <FilterBarContainer>
      {/* Linha Superior: Tipo de Atividade e Busca */}
      <TopRow>
        <TabsGroup>
          <FilterTab
            $active={selectedType === "all"}
            onClick={() => onSelectType("all")}
          >
            Todos ({counts.all})
          </FilterTab>

          <FilterTab
            $active={selectedType === "palestra"}
            onClick={() => onSelectType("palestra")}
          >
            Palestras ({counts.palestra})
          </FilterTab>

          <FilterTab
            $active={selectedType === "minicurso"}
            onClick={() => onSelectType("minicurso")}
          >
            Minicursos ({counts.minicurso})
          </FilterTab>

          <FilterTab
            $active={selectedType === "main"}
            onClick={() => onSelectType("main")}
          >
            Gerais ({counts.main})
          </FilterTab>
        </TabsGroup>

        <SearchBox>
          <HiOutlineSearch size={18} />
          <input
            type="text"
            placeholder="Buscar por título, palestrante ou sala..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </SearchBox>
      </TopRow>

      <Divider />

      {/* Linha Inferior: Filtro por Dia da Semana */}
      <WeekdayRow>
        <WeekdayLabel>
          <HiOutlineCalendar size={17} />
          <span>Dia da Semana:</span>
        </WeekdayLabel>

        <WeekdayChips>
          <WeekdayChip
            type="button"
            $active={selectedWeekday === "all"}
            $hasEvents={counts.all > 0}
            onClick={() => onSelectWeekday("all")}
          >
            Todos os dias
            <span className="counter">{counts.all}</span>
          </WeekdayChip>

          {WEEKDAYS.map((w) => {
            const count = weekdayCounts[w.dayNumber] || 0;
            const isSelected = selectedWeekday === String(w.dayNumber);

            return (
              <WeekdayChip
                key={w.dayNumber}
                type="button"
                $active={isSelected}
                $hasEvents={count > 0}
                onClick={() => onSelectWeekday(String(w.dayNumber))}
                title={`Filtrar atividades de ${w.label}-feira (${count} agendada${count === 1 ? "" : "s"})`}
              >
                {w.label}
                <span className="counter">{count}</span>
              </WeekdayChip>
            );
          })}
        </WeekdayChips>
      </WeekdayRow>
    </FilterBarContainer>
  );
}

export default EventFilters;
