"use client";

import { FileInputSection, FileUploadEvent, FilesToUpload } from "@app/selecao/types";
import { CSSProperties, PropsWithoutRef } from "react";
import Dropzone from "react-dropzone";
import { IoCloseSharp } from "react-icons/io5";

import UploadIcon from "@assets/images/upload.svg?svgr";

import { Container } from "./styles";

const titles = {
  cv: "Currículo",
  historico: "Histórico Acadêmico",
  matricula: "Atestado de Matrícula",
};

const errors = {
  cv: "Favor anexar seu currículo",
  historico: "Favor anexar seu histórico",
  matricula: "Favor anexar seu comprovante de matrícula",
};

export interface FileInputProps {
  filesToUpload: FilesToUpload;
  isErrored: boolean;
  onFileUpload: (e: FileUploadEvent) => void;
  style?: CSSProperties;
  type: FileInputSection;
}

export function FileInput({
  isErrored,
  type,
  filesToUpload,
  onFileUpload,
  style,
}: PropsWithoutRef<FileInputProps>) {
  return (
    <Dropzone
      accept={{ "application/pdf": [".pdf"] }}
      noClick
      onDropAccepted={f => onFileUpload({ origin: type, file: f[0] })}
    >
      {({ getRootProps, getInputProps, isDragAccept, isDragActive, isDragReject, fileRejections, open }) => (
        <Container
          {...getRootProps()}
          isErrored={isErrored}
          isDragActive={isDragActive}
          isDragAccept={isDragAccept}
          isDragReject={isDragReject}
          hasUpload={filesToUpload[type] !== undefined}
          className={fileRejections ? "rejected" : ""}
          onClick={() => {
            if (filesToUpload[type]) {
              onFileUpload({ origin: type, file: undefined as unknown as File });
            } else {
              open();
            }
          }}
          style={style}
        >
          <input {...getInputProps()} />

          <div>
            <UploadIcon />

            <span>{isErrored ? errors[type] : filesToUpload[type]?.name.slice(0, 60) || titles[type]}</span>

            {filesToUpload[type] && <IoCloseSharp />}
          </div>
        </Container>
      )}
    </Dropzone>
  );
}
