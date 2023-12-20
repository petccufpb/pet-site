"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Logo from "@assets/images/logo.svg?svgr";

import { ListItem, PETHeader, RouteLink, RouteList, VerticalLine } from "./styles";

const defaultRoutes = {
  start: [
    {
      name: "Início",
      path: "/",
    },
    {
      name: "Time",
      path: "/time",
    },
    // {
    //   name: "História",
    //   path: "/historia",
    // },
    // {
    //   name: "Acervo",
    //   path: "/acervo",
    // },
    // {
    //   name: "Projetos",
    //   path: "/projetos",
    // },
    // {
    //   name: "Podcast",
    //   path: "/podcast",
    // },
    {
      name: "Artigos",
      path: "/artigos",
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
  ],
};

const defaultSdcRoutes = {
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
      name: "Certificados",
      path: "/sdc/certificados",
    },
  ],
};

export function Header() {
  const [sdcRoutes, setSdcRoutes] = useState(defaultSdcRoutes);

  const pathname = usePathname();
  const isSDC = pathname.startsWith("/sdc");

  const [routes, setRoutes] = useState(isSDC ? defaultSdcRoutes : defaultRoutes);

  useEffect(() => {
    if (pathname.startsWith("/sdc/minicurso")) {
      setSdcRoutes({
        start: [
          ...defaultSdcRoutes.start,
          {
            name: "Minicurso",
            path: pathname,
          },
        ],
        end: defaultSdcRoutes.end,
      });

      return;
    }

    if (pathname == "/sdc/admin") {
      setSdcRoutes({
        start: defaultSdcRoutes.start,
        end: [
          ...defaultSdcRoutes.end,
          {
            name: "Admin",
            path: pathname,
          },
        ],
      });

      return;
    }

    if (pathname.startsWith("/sdc/frequencia")) {
      setSdcRoutes({
        start: defaultSdcRoutes.start,
        end: [
          ...defaultSdcRoutes.end,
          {
            name: "Frequência",
            path: pathname,
          },
        ],
      });
    }

    setSdcRoutes(defaultSdcRoutes);
  }, [pathname]);

  useEffect(() => {
    if (isSDC) {
      setRoutes(sdcRoutes);
      return;
    }

    setRoutes(defaultRoutes);
  }, [isSDC, sdcRoutes]);

  return (
    <PETHeader isSDC={isSDC}>
      <a href="/" aria-label="Início">
        <Logo alt="Logo PET Computação" width={80} />
      </a>
      <nav>
        <RouteList>
          {routes.start.map((route, i) => (
            <ListItem key={i}>
              <RouteLink href={route.path} tab={pathname}>
                {route.name}
              </RouteLink>
            </ListItem>
          ))}
          <VerticalLine />
          {routes.end.map((route, i) => (
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
