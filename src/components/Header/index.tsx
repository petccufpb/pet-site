import { Inter } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ListItem, PETHeader, RouteLink, RouteList, VerticalLine } from "./styles";

const inter = Inter({ subsets: ["latin"] });

export function Header() {
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    setCurrentTab(document.location.pathname);
  }, []);

  function switchTab(e: React.MouseEvent<HTMLUListElement>) {
    const target = e.target as Element;
    if (target.tagName === "A") {
      const anchorTarget = e.target as HTMLAnchorElement;
      setCurrentTab(anchorTarget.pathname);
    }
  }

  return (
    <PETHeader className={inter.className}>
      <Image src="/images/logo.png" alt="Logo PET Computação" width={75} height={40}></Image>
      <nav>
        <RouteList onClick={switchTab}>
          <ListItem>
            <RouteLink href="/" currentTab={currentTab}>
              Início
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/historia" currentTab={currentTab}>
              História
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/time" currentTab={currentTab}>
              Time
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/projetos" currentTab={currentTab}>
              Projetos
            </RouteLink>
          </ListItem>
          <ListItem>
            <RouteLink href="/sdc" currentTab={currentTab}>
              SDC
            </RouteLink>
          </ListItem>
          <VerticalLine />
          <ListItem>
            <RouteLink href="/artigos" currentTab={currentTab}>
              Artigos
            </RouteLink>
          </ListItem>
        </RouteList>
      </nav>
    </PETHeader>
  );
}
