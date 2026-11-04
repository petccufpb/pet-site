import React from "react";
import Activity from "./Activity";
import { ListContainer, Table } from "./styles";
import { SDCEventData } from "sdc";

function ActivityList({ events }: { events: SDCEventData[] }) {
  return (
    <ListContainer>
      <Table>
        <tbody>
          <tr>
            <th>Título</th>
            <th>Dia</th>
            <th>Hora</th>
            <th>Participação</th>
          </tr>
          {events.map(e => (
            <Activity key={e.id} data={e} />
          ))}
        </tbody>
      </Table>
    </ListContainer>
  );
}

export default ActivityList;
