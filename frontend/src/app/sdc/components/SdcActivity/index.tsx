import { FaTimesCircle } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

import Leleo from "@assets/images/leleo.png";

import { Availability, SpeakerPhoto, Subscribe } from "./styles";

type SdcActivityProps = {
  title: string;
  speaker: string;
  day: number;
  time: string;
  available: boolean;
  type: "palestra" | "minicurso";
};

export function SdcActivity({ info }: { info: SdcActivityProps }) {
  return (
    <tr>
      <th>
        <SpeakerPhoto src={Leleo} alt={info.speaker}></SpeakerPhoto>
        <span>{info.speaker}</span>
      </th>
      <th>
        <span>
          <b>{info.type.toUpperCase()} </b>
          <span>- {info.title}</span>
        </span>
      </th>
      <th>Dia 0{info.day}</th>
      <th>{info.time}</th>
      <th>
        <Availability availability={info.available}>
          {info.available ? "DISPONÍVEL" : "ESGOTADO"}
          {!info.available && <FaTimesCircle />}
        </Availability>
      </th>
      <th>
        <Subscribe availability={info.available}>
          <a href="/sdc/minicurso/id">
            <span>FAZER INSCRIÇÃO</span>
            <HiArrowUpRight />
          </a>
        </Subscribe>
      </th>
    </tr>
  );
}
