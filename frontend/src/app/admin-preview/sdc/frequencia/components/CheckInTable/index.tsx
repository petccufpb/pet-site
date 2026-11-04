import { Spinner } from "@app/artigos/components/Spinner";
import { format } from "date-fns";

import { Attendance } from "../../types";
import { Counter, Empty, Table, TableWrapper } from "./styles";

interface CheckInTableProps {
  attendances: Attendance[];
  enrolled?: number;
  loading: boolean;
}

export function CheckInTable({ attendances, enrolled, loading }: CheckInTableProps) {
  return (
    <section>
      <Counter aria-live="polite">
        <strong>{attendances.length}</strong> presentes
        {enrolled !== undefined && (
          <>
            {" "}
            / <strong>{enrolled}</strong> inscritos
          </>
        )}
      </Counter>

      {loading ? (
        <Spinner />
      ) : attendances.length === 0 ? (
        <Empty>Nenhuma presença marcada neste evento ainda.</Empty>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Horário</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Matrícula</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map(attendance => (
                <tr key={attendance.id} className={attendance.pending ? "pending" : undefined}>
                  <td>{format(new Date(attendance.createdAt), "HH:mm:ss")}</td>
                  <td>{attendance.participant?.name}</td>
                  <td>{attendance.participant?.email}</td>
                  <td>{attendance.participant?.matricula ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </section>
  );
}
