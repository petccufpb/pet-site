import Image from "next/image";

import { DevelopersContainer, DevelopersItem } from "./styles";

export function Developers({ color = undefined }: { color?: string | undefined }) {
  return (
    <DevelopersContainer color={color}>
      <div>Development by</div>
      <DevelopersItem>
        <a aria-label="Github de Abraão" href="https://github.com/abraaodev">
          <Image
            src="https://avatars.githubusercontent.com/u/69207084?s=100&v=4"
            alt="Abraão Homualdo"
            width={45}
            height={45}
          ></Image>
        </a>
        <a aria-label="Github de Aran" href="https://github.com/hyoretsu">
          <Image
            src="https://avatars.githubusercontent.com/u/20804322?s=100&v=4"
            alt="Aran Leite"
            width={45}
            height={45}
          ></Image>
        </a>
        <a aria-label="Github de Lucas" href="https://github.com/eurmn">
          <Image
            src="https://avatars.githubusercontent.com/u/41550197?s=100&v=4"
            alt="Lucas Garrafielo"
            width={45}
            height={45}
          ></Image>
        </a>
        <a aria-label="Github de Ryann" href="https://github.com/ryann-arruda">
          <Image
            src="https://avatars.githubusercontent.com/u/53544629?s=100&v=4"
            alt="Ryann Carlos de Arruda Quintino"
            width={45}
            height={45}
          ></Image>
        </a>
      </DevelopersItem>
    </DevelopersContainer>
  );
}
