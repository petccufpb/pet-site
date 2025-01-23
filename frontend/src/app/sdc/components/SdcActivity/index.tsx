import { Modal } from "@hyoretsu/react-components";
import { Info } from "@phosphor-icons/react";
import { isAfter } from "date-fns";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { SDCEventData } from "sdc";

import { Availability, SDCtr, SpeakerPhoto, Subscribe, SubscribeLink } from "./styles";

export function SdcActivity({ data, dayEvent }: { data: SDCEventData; dayEvent: number }) {
  const [modalVisible, showModal] = useState(false);

  const time = new Date(data.startTime).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const available = data.capacity ? data.participants.length < data.capacity + data.extraCapacity : true;
  const extrasAvailable = data.extraCapacity ? data.participants.length >= (data.capacity as number) : false;

  return (
    <>
      <SDCtr>
        <th>
          <SpeakerPhoto
            src={data.speaker.photoUrl}
            alt={data.speaker.name}
            width={45}
            height={45}
            quality={100}
          ></SpeakerPhoto>
          <span>{data.speaker.name}</span>
        </th>
        <th>
          <div>
            {data.type && <b>{data.type === "minicurso" ? "Minicurso" : "Palestra"}</b>}
            <span>
              {data.type && " - "}
              {data.name}
            </span>
          </div>
          {data.about && (
            <button onClick={() => showModal(true)}>
              <Info height={20} width={20} />
            </button>
          )}
        </th>
        <th>Dia {dayEvent}</th>
        <th>{time}</th>
        <th>
          {data.type === "minicurso" && (
            <Availability
              availability={available}
              extrasAvailable={extrasAvailable}
              title={
                extrasAvailable
                  ? "Este minicurso está com as vagas de computadores esgotadas. Os alunos que se inscreverem nas vagas restantes terão que levar seus próprios notebooks."
                  : ""
              }
            >
              {available ? "DISPONÍVEL" : "ESGOTADO"}
              {!available && <FaTimesCircle />}
            </Availability>
          )}
        </th>
        <th>
          {(data.type === "minicurso" || data.externalSignup) && (
            <SubscribeLink
              disabled={!available || isAfter(new Date(), new Date(data.startTime))}
              aria-label="Realizar Inscrição"
              href={data.externalSignup || `/sdc/minicurso/${data.id}`}
            >
              <Subscribe availability={available && !isAfter(new Date(), new Date(data.startTime))}>
                <span>INSCRIÇÃO</span>
                <HiArrowUpRight />
              </Subscribe>
            </SubscribeLink>
          )}
        </th>
      </SDCtr>
      {modalVisible && (
        <Modal
          backgroundColor="#000205"
          buttonBackground="#04d36160"
          buttonBorderColor="#04d361"
          buttonBorderWidth={1}
          buttonPadding={[0.3 * 16, 1.5 * 16]}
          buttonText="Fechar"
          onConfirm={() => showModal(false)}
          opacity={0.6}
          style={{ gap: "1rem", textAlign: "center" }}
          textColor="#fff9"
        >
          {data.about!.split("\\\\n").map((paragraph, index) => {
            if (paragraph === "") {
              return <br key={index} />;
            }

            return <p key={index}>{paragraph}</p>;
          })}
        </Modal>
      )}
    </>
  );
}
