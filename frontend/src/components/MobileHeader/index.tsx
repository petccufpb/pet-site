"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimationEvent, useEffect, useState } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

import { Developers } from "@components/Developers";

import Logo from "@assets/images/logo.svg?svgr";

import { ExpandMenu, HeaderContainer, Links, RouteLink, SocialMediaLinks, ToggleButton } from "./styles";

export function MobileHeader() {
  const [expand, setExpand] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState<"grid" | "none">("none");
  const [docHeight, setDocHeight] = useState<number>();
  const pathname = usePathname();

  const documentHeight = () => {
    const doc = document.documentElement;
    setDocHeight(window.innerHeight || doc.clientHeight || doc.offsetHeight);
  };

  function expandEvent(e: AnimationEvent<HTMLDivElement>): void {
    if (e.type === "animationend" && e.animationName === "slideOut") {
      setMenuDisplay("none");
      return;
    }
  }

  useEffect(() => {
    if (expand) setMenuDisplay("grid");
  }, [expand]);

  useEffect(() => {
    setDocHeight(
      window.innerHeight || document.documentElement.clientHeight || document.documentElement.offsetHeight,
    );
    window.addEventListener("resize", documentHeight);
  }, []);

  function closeHeader() {
    setExpand(false);
  }

  return (
    <HeaderContainer expand={expand}>
      <a href="/">
        <Logo height={45} alt="Logo PET Computação UFPB" />
      </a>
      <ToggleButton expand={expand} onClick={() => setExpand(!expand)}>
        <div />
        <div />
      </ToggleButton>
      <ExpandMenu
        docHeight={docHeight}
        display={menuDisplay}
        expand={expand}
        onAnimationEndCapture={expandEvent}
        onAnimationStart={expandEvent}
      >
        <div>MENU</div>
        <Links onClick={() => closeHeader()}>
          <RouteLink tab={pathname} href="/sdc">
            Início
          </RouteLink>
          <RouteLink tab={pathname} href="/sdc/inscricao">
            Inscrição
          </RouteLink>
          <RouteLink tab={pathname} href="/sdc/certificados">
            Certificados
          </RouteLink>
        </Links>
        <SocialMediaLinks>
          <a href="https://www.instagram.com/petccufpb/">
            <FaInstagram />
            <span>INSTAGRAM</span>
          </a>
          <a href="https://linkedin.com/company/petccufpb/">
            <FaLinkedin />
            <span>LINKEDIN</span>
          </a>
        </SocialMediaLinks>
        <Developers color="#00000060" />
      </ExpandMenu>
    </HeaderContainer>
  );
}
