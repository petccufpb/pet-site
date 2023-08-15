"use client";
import { BlobProvider, Document, Image, PDFViewer, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ProjectCertificateTemplate, ProjectEdition, ProjectEvent, ProjectParticipant } from "backend";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import api from "@api";

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

interface CertificadoPDFParams {
  certificateId: string;
  template: ProjectCertificateTemplate;
  title: string;
}

function CertificadoPDF({ certificateId, template, title }: CertificadoPDFParams) {
  const pdfStyles = StyleSheet.create({
    verify: {
      color: "#fff",
      opacity: 0.4,
      textAlign: "center",
    },
  });

  return (
    <Document title={title} author="PET Computação UFPB" language="Português">
      <Page orientation="landscape" wrap={false}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          src={template.backgroundUrl}
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        />

        <View style={{ height: "100%" }}>
          <Text
            // eslint-disable-next-line react/no-children-prop
            children={template.text
              .replaceAll("<br/>", "\n")
              .split(/(<b>.+?<\/b>)/)
              .map(text => {
                if (text.includes("<b>")) {
                  const [_, actualText] = text.split(/<\/?b>/);

                  return (
                    <Text key={actualText} style={{ fontFamily: "Helvetica-Bold" }}>
                      {actualText}
                    </Text>
                  );
                }

                return text;
              })}
            style={{
              color: "#fff",
              margin: "auto",
              width: "80%",
              textAlign: "center",
            }}
          />

          <View style={{ bottom: 0, position: "absolute", width: "100%" }}>
            <Text style={pdfStyles.verify}>{certificateId}</Text>
            <Text style={pdfStyles.verify}>
              Verifique a autenticidade em: https://petccufpb.com.br/sdc/certificados
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default function GerarCertificados({
  params: { id },
  searchParams: { event: isEvent, participantId },
}: GerarCertificadoParams) {
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
          <PDFViewer width={1000} height={600} style={{ border: "none", marginBottom: "3vh" }}>
            <CertificadoPDF certificateId={certificateId} template={template} title={certificateTitle} />
          </PDFViewer>

          <BlobProvider
            document={
              <CertificadoPDF certificateId={certificateId} template={template} title={certificateTitle} />
            }
          >
            {({ url }) => (
              <a href={url as string} download={certificateTitle}>
                <span>Para baixar seu certificado, apenas clique aqui!</span>
              </a>
            )}
          </BlobProvider>
        </>
      )}
    </Styling>
  );
}
