"use client";

import { useState } from "react";
import { HiCheck } from "react-icons/hi2";

import { CertificateContainer, CheckContainer, ClickMe, SVGBlur } from "./styles";

export function ValidCertificatePopup({ onClose, isClosing }: { onClose: () => void; isClosing: boolean }) {
  return (
    <CertificateContainer isClosing={isClosing}>
      <CheckContainer>
        <HiCheck size="10em" />
        <SVGBlur />
      </CheckContainer>
      <div>
        <h1>
          <span>Certificado</span>
          <br />
          <span>Válido</span>
        </h1>
        <span>
          Para mais consultas, <ClickMe onClick={() => onClose()}>clique aqui</ClickMe>
        </span>
      </div>
    </CertificateContainer>
  );
}
