import { format } from "date-fns";

import { EventType, SdcEvent } from "../../types";
import { Select } from "./styles";

const typeLabels: Record<EventType, string> = {
  main: "Principal",
  minicurso: "Minicurso",
  palestra: "Palestra",
};

interface EventSelectorProps {
  events: SdcEvent[];
  onChange: (eventId: string) => void;
  value?: string;
}

export function EventSelector({ events, onChange, value }: EventSelectorProps) {
  return (
    <Select aria-label="Evento" value={value ?? ""} onChange={e => onChange(e.target.value)}>
      <option value="" disabled>
        Selecione um evento
      </option>
      {events.map(event => (
        <option key={event.id} value={event.id}>
          {format(new Date(event.startTime), "dd/MM HH:mm")} ·{" "}
          {event.type ? typeLabels[event.type] : "Evento"} · {event.name}
        </option>
      ))}
    </Select>
  );
}
