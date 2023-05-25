import { Inter } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ListItem, PETHeader, RouteLink, RouteList, VerticalLine } from "./styles";

const inter = Inter({ subsets: ["latin"], weight: "variable" });

export function Header() {
  const pathname = usePathname();

  return (
    <PETHeader className={inter.className}>
      <Image src="/images/logo.png" alt="Logo PET Computação" width={75} height={40}></Image>
      <nav>
        <RouteList>
          <ListItem>
            <RouteLink href="/" tab={pathname}>
              Início
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/historia" tab={pathname}>
              História
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/time" tab={pathname}>
              Time
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/projetos" tab={pathname}>
              Projetos
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/sdc" tab={pathname}>
              SDC
            </RouteLink>
          </ListItem>
          <VerticalLine />
          <ListItem>
            <RouteLink href="/selecao" tab={pathname}>
              Seleção
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/artigos" tab={pathname}>
              Artigos
            </RouteLink>
          </ListItem>
        </RouteList>
      </nav>
    </PETHeader>
  );
}
