"use client";

import { PropsWithChildren } from "react";
import TypeIt, { TypeItProps } from "typeit-react";

export function ClientTypeIt({ children, options, sdcReady }: PropsWithChildren & TypeItProps) {
  return (
    <TypeIt
      getBeforeInit={instance => {
        if (!sdcReady) {
          instance.type("EM BRW").pause(200).delete(1).pause(200).type("EVE").pause(400).type("...");
        } else {
          instance.type("Tudo que você pode participar");
        }
        return instance;
      }}
      options={options}
    >
      {children}
    </TypeIt>
  );
}
