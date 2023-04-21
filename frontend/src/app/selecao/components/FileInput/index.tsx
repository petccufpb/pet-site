"use client";

import { FileInputSection, FileUploadEvent, FilesToUpload } from "@app/selecao/types";
import { PropsWithoutRef } from "react";
import Dropzone from "react-dropzone";
import { FaExclamationTriangle, FaFileUpload } from "react-icons/fa";

import { Container } from "./styles";

function typeToTitle(type: FileInputSection): string {
  switch (type) {
    case "cv":
      return "Currículo";
    case "matricula":
      return "Atestado de Matrícula";
    case "historico":
      return "Histórico Acadêmico";
  }
}

export function FileInput({
  type,
  filesToUpload,
  onFileUpload,
}: PropsWithoutRef<{
  type: FileInputSection;
  filesToUpload: FilesToUpload;
  onFileUpload: (e: FileUploadEvent) => void;
}>) {
  return (
    <Dropzone
      accept={{ "application/pdf": [".pdf"] }}
      onDropAccepted={f => onFileUpload({ origin: type, file: f[0] })}
    >
      {({ getRootProps, getInputProps, isDragAccept, isDragActive, isDragReject, fileRejections }) => (
        <Container
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragAccept={isDragAccept}
          isDragReject={isDragReject}
          hasUpload={filesToUpload[type] !== undefined}
          className={fileRejections ? "rejected" : ""}
        >
          <div />
          <input {...getInputProps()} />
          {isDragReject ? <FaExclamationTriangle /> : <FaFileUpload />}
          <span>
            {isDragReject ? "Formato de Arquivo Inválido" : filesToUpload[type]?.name || typeToTitle(type)}
          </span>
        </Container>
      )}
    </Dropzone>
  );
}
