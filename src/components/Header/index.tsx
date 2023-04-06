import { Inter } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ListItem, PETHeader, RouteLink, RouteList, VerticalLine } from "./styles";

const inter = Inter({ subsets: ["latin"] });

export function Header() {
  const [tab, setTab] = useState("");

  useEffect(() => {
    setTab(document.location.pathname);
  }, []);

  function switchTab(e: React.MouseEvent<HTMLUListElement>) {
    const target = e.target as Element;
    if (target.tagName === "A") {
      const anchorTarget = e.target as HTMLAnchorElement;
      setTab(anchorTarget.pathname);
    }
  }

  return (
    <PETHeader className={inter.className}>
      <Image src="/images/logo.png" alt="Logo PET Computação" width={75} height={40}></Image>
      <nav>
        <RouteList onClick={switchTab}>
          <ListItem>
            <RouteLink href="/" tab={tab}>
              Início
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/historia" tab={tab}>
              História
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/time" tab={tab}>
              Time
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/projetos" tab={tab}>
              Projetos
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/sdc" tab={tab}>
              SDC
            </RouteLink>
          </ListItem>
          <VerticalLine />
          <ListItem>
            <RouteLink href="/artigos" tab={tab}>
              Artigos
            </RouteLink>
          </ListItem>
        </RouteList>
      </nav>
    </PETHeader>
  );
}
