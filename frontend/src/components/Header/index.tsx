import { baiJamjuree, inter } from "@app/sdc/page";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { ListItem, PETHeader, RouteLink, RouteList, VerticalLine } from "./styles";

const routes = {
  start: [
    {
      name: "Início",
      path: "/",
    },
    {
      name: "História",
      path: "/historia",
    },
    {
      name: "Time",
      path: "/time",
    },
    {
      name: "Projetos",
      path: "/projetos",
    },
    {
      name: "SDC",
      path: "/sdc",
    },
  ],
  end: [
    {
      name: "Seleção",
      path: "/selecao",
    },
    {
      name: "Artigos",
      path: "/artigos",
    },
  ],
};

const sdcRoutes = {
  start: [
    {
      name: "Início",
      path: "/sdc",
    },
    {
      name: "Inscrição",
      path: "/sdc/inscricao",
    },
  ],
  end: [
    {
      name: "Verificar Certificado",
      path: "/sdc/certificado",
    },
  ],
};

export function Header() {
  const pathname = usePathname();
  const isSDC = pathname.startsWith("/sdc");

  return (
    <PETHeader className={isSDC ? baiJamjuree.className : inter.className}>
      <Image src="/images/logo.png" alt="Logo PET Computação" width={75} height={40}></Image>
      <nav>
        <RouteList>
          {isSDC
            ? sdcRoutes.start.map((route, i) => (
                <ListItem key={i}>
                  <RouteLink href={route.path} tab={pathname}>
                    {route.name}
                  </RouteLink>
                </ListItem>
              ))
            : routes.start.map((route, i) => (
                <ListItem key={i}>
                  <RouteLink href={route.path} tab={pathname}>
                    {route.name}
                  </RouteLink>
                </ListItem>
              ))}
          <VerticalLine />
          {isSDC
            ? sdcRoutes.end.map((route, i) => (
                <ListItem key={i}>
                  <RouteLink href={route.path} tab={pathname}>
                    {route.name}
                  </RouteLink>
                </ListItem>
              ))
            : routes.end.map((route, i) => (
                <ListItem key={i}>
                  <RouteLink href={route.path} tab={pathname}>
                    {route.name}
                  </RouteLink>
                </ListItem>
              ))}
        </RouteList>
      </nav>
    </PETHeader>
  );
}
