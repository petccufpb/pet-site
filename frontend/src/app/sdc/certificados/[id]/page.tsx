"use client";
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";
import {
  ProjectCertificateTemplate,
  ProjectEdition,
  ProjectEvent,
  ProjectParticipant,
  ProjectSpeaker,
} from "backend";
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
    participantId?: string;
    speakerId?: string;
  };
}

export default function GerarCertificados({ params: { id }, searchParams }: GerarCertificadoParams) {
  const isEvent = JSON.parse(searchParams.event || "null");

  const [attendance, setAttendance] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [edition, setEdition] = useState<ProjectEdition>();
  const [event, setEvent] = useState<ProjectEvent>();
  const [participant, setParticipant] = useState<ProjectParticipant>();
  const [speaker, setSpeaker] = useState<ProjectSpeaker>();
  const [template, setTemplate] = useState<ProjectCertificateTemplate>({
    text: "",
  } as ProjectCertificateTemplate);

  useEffect(() => {
    const execute = async () => {
      if (!searchParams.participantId && !searchParams.speakerId) {
        return;
      }

      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/certificates?${isEvent ? "eventId" : "editionId"}=${id}`,
      );

      if (searchParams.participantId) {
        url.searchParams.append("participantId", searchParams.participantId);
      } else if (searchParams.speakerId) {
        url.searchParams.append("speakerId", searchParams.speakerId);
      }

      const { data: certificateData } = await api.get(url.toString());

      if (!certificateData || certificateData.length === 0) {
        notFound();
      }

      const [certificate] = certificateData;
      const { certificateTemplate } =
        isEvent && !searchParams.speakerId ? certificate.event : certificate.edition;
      if (!certificateTemplate) {
        notFound();
      }

      setAttendance(certificate.attendance?.toFixed(2).replace(".", ","));
      setEvent(certificate.event);
      setParticipant(certificate.participant);
      setSpeaker(certificate.speaker);
      setTemplate(certificateTemplate[0]);

      if (!isEvent && certificate.edition) {
        const { data: eventsData } = await api.get<ProjectEvent[]>(`/projects/events?editionId=${id}`);
        certificate.edition.endDate = eventsData.at(-1)?.endTime;
      }
      setEdition(certificate.edition);

      setCertificateId(certificate.id);
    };

    execute();
  }, [id, isEvent, searchParams.participantId, searchParams.speakerId]);

  useEffect(() => {
    if (edition === undefined || event === undefined || (speaker === null && participant === undefined)) {
      return;
    }

    setTemplate(old => {
      if (Object.entries(old).length === 0) {
        return old;
      }

      return {
        ...old,
        text: old.text
          .replace('\\"', '"')
          .split(/({(?:[^{}]|\${[^{}]*})*})/)
          .map(part => {
            if (part.includes("format(")) {
              const splitParts = [...part.split(/\$?{(format\(.+?\))}/g)];
              splitParts[0] = splitParts[0].slice(1);
              splitParts[splitParts.length - 1] = splitParts.at(-1)!.slice(0, -1);

              return eval(
                splitParts
                  .map(each => {
                    if (each.startsWith("format(")) {
                      const args = each.match(/\((.*)(?:"|')\)/)![1].split(/,\s?(?:"|')/);

                      return format(eval(args[0]), args[1], { locale: ptBR });
                    }

                    return each;
                  })
                  .join(""),
              );
            }

            if (part.includes("{")) {
              return eval(part.slice(1, -1));
            }

            return part;
          })
          .join(""),
      };
    });
  }, [edition, event, participant, speaker]);

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
