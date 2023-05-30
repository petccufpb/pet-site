"use client";

import { baiJamjuree } from "@app/sdc/page";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimationEvent, useEffect, useState } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

import { Developers } from "@components/Developers";

import Logo from "@assets/images/logo.png";

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

  return (
    <HeaderContainer expand={expand}>
      <Image height={45} src={Logo} alt="Logo PET Computação UFPB" />
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
        className={baiJamjuree.className}
      >
        <div>MENU</div>
        <Links>
          <RouteLink tab={pathname} href="/sdc">
            Início
          </RouteLink>
          <RouteLink tab={pathname} href="/sdc/inscricao">
            Inscrição
          </RouteLink>
          <RouteLink tab={pathname} href="/sdc/certificado">
            Certificados
          </RouteLink>
        </Links>
        <SocialMediaLinks>
          <Link href="https://www.instagram.com/petccufpb/">
            <FaInstagram />
            <span>INSTAGRAM</span>
          </Link>
          <Link href="https://linkedin.com/company/petccufpb/">
            <FaLinkedin />
            <span>LINKEDIN</span>
          </Link>
        </SocialMediaLinks>
        <Developers color="#00000060" />
      </ExpandMenu>
    </HeaderContainer>
  );
}
