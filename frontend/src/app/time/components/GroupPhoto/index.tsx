"use client";
import Image from "next/image";
import { RiArrowDownLine } from "react-icons/ri";

import { EllipseBlur, Styling } from "./styles";

const GroupPhoto: React.FC = () => {
  return (
    <Styling>
      <Image src="/images/foto-time.jpg" alt="Foto do grupo" width={1440} height={756} />

      <EllipseBlur />

      <div>
        <div
          onClick={() => {
            window.scrollTo({
              behavior: "smooth",
              top: document.getElementById("tutores")?.offsetTop,
            });
          }}
        >
          <RiArrowDownLine size={20} />
        </div>

        <p>Nós somos o PET Computação!</p>
      </div>
    </Styling>
  );
};

export default GroupPhoto;
