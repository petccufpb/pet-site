"use client";

import Link from "next/link";
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
      <Link href="/sdc" aria-label="Início">
        <Logo alt="Logo PET Computação" width={80} />
      </Link>
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
