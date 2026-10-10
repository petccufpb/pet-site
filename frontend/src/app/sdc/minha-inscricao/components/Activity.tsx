import React, { useState } from "react";
import { SDCEventData } from "sdc";
import { SDCtr } from "./styles";
import { InfoIcon } from "@phosphor-icons/react";
import { Modal } from "@hyoretsu/react-components";

function Activity({ data }: { data: SDCEventData }) {
  const [modalVisible, showModal] = useState(false);

  const time = new Date(data.startTime).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Date(data.startTime).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <SDCtr>
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
              <InfoIcon height={20} width={20} />
            </button>
          )}
        </th>
        <th>{date}</th>
        <th>{time}</th>
        <th>{data.type && <b>{data.type === "minicurso" ? "Inscrito" : "Presente"}</b>}</th>
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

export default Activity;
