import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { SDCEventData } from "sdc";

import { Availability, SDCtr, SpeakerPhoto, Subscribe } from "./styles";

type SdcActivityProps = {
  title: string;
  speaker: string;
  speakerPic: string;
  day: number;
  time: string;
  available: boolean;
  type: string;
};

export function SdcActivity({ data }: { data: SDCEventData }) {
  const day = new Date(data.startTime).getDate();
  const time = new Date(data.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const available = data.capacity !== null;

  return (
    <SDCtr>
      <th>
        <SpeakerPhoto
          src={"https://" + data.speaker.photoUrl}
          alt={data.speaker.name}
          width={45}
          height={45}
        ></SpeakerPhoto>
        <span>{data.speaker.name}</span>
      </th>
      <th>
        <span>
          <b>{data.name.split(" ")[0]}</b>
          <span>{" " + data.name.split(" ").slice(1).join(" ")}</span>
        </span>
      </th>
      <th>Dia {day}</th>
      <th>{time}</th>
      <th>
        <Availability availability={available}>
          {available ? "DISPONÍVEL" : "ESGOTADO"}
          {!available && <FaTimesCircle />}
        </Availability>
      </th>
      <th>
        <Subscribe availability={available}>
          <Link
            aria-label="Realizar Inscrição"
            href={data.type === "main" ? "/sdc/inscricao" : `/sdc/minicurso/${data.id}`}
          >
            <span>FAZER INSCRIÇÃO</span>
            <HiArrowUpRight />
          </Link>
        </Subscribe>
      </th>
    </SDCtr>
  );
}
