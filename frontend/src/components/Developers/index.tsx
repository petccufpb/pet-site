import { baiJamjuree } from "@app/sdc/page";
import Image from "next/image";
import Link from "next/link";

import { DevelopersItem, DevelopersContainer } from "./styles";

export function Developers({ color = undefined }: { color?: string | undefined }) {
  return (
    <DevelopersContainer color={color}>
      <div className={baiJamjuree.className}>Development by</div>
      <DevelopersItem>
        <Link aria-label="Github de Abraão" href="https://github.com/abraaodev">
          <Image
            src="https://avatars.githubusercontent.com/u/69207084?s=100&v=4"
            alt="Abraão Homualdo"
            width={45}
            height={45}
          ></Image>
        </Link>
        <Link aria-label="Github de Aran" href="https://github.com/hyoretsu">
          <Image
            src="https://avatars.githubusercontent.com/u/20804322?s=100&v=4"
            alt="Aran Leite"
            width={45}
            height={45}
          ></Image>
        </Link>
        <Link aria-label="Github de Lucas" href="https://github.com/eurmn">
          <Image
            src="https://avatars.githubusercontent.com/u/41550197?s=100&v=4"
            alt="Lucas Garrafielo"
            width={45}
            height={45}
          ></Image>
        </Link>
        <Link aria-label="Github de Ryann" href="https://github.com/ryann-arruda">
          <Image
            src="https://avatars.githubusercontent.com/u/53544629?s=100&v=4"
            alt="Ryann Carlos de Arruda Quintino"
            width={45}
            height={45}
          ></Image>
        </Link>
      </DevelopersItem>
    </DevelopersContainer>
  );
}
