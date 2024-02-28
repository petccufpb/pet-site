"use client";
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";
import { ProjectCertificateTemplate, ProjectEdition, ProjectEvent, ProjectParticipant } from "backend";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import api from "@api";

import CertificadoPDF from "./components/CertificadoPDF";
import { Styling } from "./styles";

interface GerarCertificadoParams {
  params: {
    id: string;
  };
  searchParams: {
    event?: string;
    participantId: string;
  };
}

export default function GerarCertificados({
  params: { id },
  searchParams: { event: isEvent, participantId },
}: GerarCertificadoParams) {
  const [attendance, setAttendance] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [edition, setEdition] = useState<ProjectEdition>();
  const [event, setEvent] = useState<ProjectEvent>();
  const [participant, setParticipant] = useState<ProjectParticipant>();
  const [template, setTemplate] = useState<ProjectCertificateTemplate>({
    text: "",
  } as ProjectCertificateTemplate);

  useEffect(() => {
    const execute = async () => {
      const { data: certificateData } = await api.get(
        `/projects/certificates?${
          Boolean(isEvent) ? "eventId" : "editionId"
        }=${id}&participantId=${participantId}`,
      );

      if (!certificateData || certificateData.length === 0) {
        notFound();
      }

      const [certificate] = certificateData;
      const { certificateTemplate } = certificate.edition || certificate.event;
      if (!certificateTemplate) {
        notFound();
      }

      setAttendance(certificate.attendance.toFixed(2).replace(".", ","));
      setEvent(certificate.event);
      setParticipant(certificate.participant);
      setTemplate(certificateTemplate);

      if (certificate.edition) {
        const { data: eventsData } = await api.get<ProjectEvent[]>(`/projects/events?editionId=${id}`);
        certificate.edition.endDate = eventsData.at(-1)?.endTime;

        setEdition(certificate.edition);
      }

      setCertificateId(certificate.id);
    };

    execute();
  }, [id, isEvent, participantId]);

  useEffect(() => {
    if (Object.entries(template).length === 0) return;

    setTemplate(old => ({
      ...old,
      text: old.text
        .replace('\\"', '"')
        .split(/({.+?}\)?\}?)/)
        .map(part => {
          if (part.includes("{format")) {
            const args = part
              .split(/{format\(|\)}/)
              .filter(str => str)[0]
              .split(",");

            return format(eval(args[0]), eval(args[1]), { locale: ptBR });
          }

          if (part.includes("{")) {
            return eval(part);
          }

          return part;
        })
        .join(""),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edition]);

  const certificateTitle = `Certificado do(a) ${edition?.name || event?.name}`;

  return (
    <Styling>
      {certificateId && (
        <>
          <PDFViewer width={1000} height={600} style={{ border: "none" }}>
            <CertificadoPDF certificateId={certificateId} template={template} title={certificateTitle} />
          </PDFViewer>

          <BlobProvider
            document={
              <CertificadoPDF certificateId={certificateId} template={template} title={certificateTitle} />
            }
          >
            {({ url }) => (
              <a href={url as string} download={certificateTitle}>
                <span>Para baixar seu certificado, clique aqui!</span>
              </a>
            )}
          </BlobProvider>
        </>
      )}
    </Styling>
  );
}
