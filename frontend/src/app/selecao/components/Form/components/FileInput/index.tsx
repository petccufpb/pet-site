"use client";

import { FileInputSection } from "@app/selecao/types";
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
  file: File | null;
  isErrored: boolean;
  onFileUpload: (e: File) => void;
  style?: CSSProperties;
  type: FileInputSection;
}

export function FileInput({ file, isErrored, type, onFileUpload, style }: PropsWithoutRef<FileInputProps>) {
  return (
    <Dropzone accept={{ "application/pdf": [".pdf"] }} noClick onDropAccepted={f => onFileUpload(f[0])}>
      {({ getRootProps, getInputProps, isDragAccept, isDragActive, isDragReject, fileRejections, open }) => (
        <Container
          {...getRootProps()}
          isErrored={isErrored}
          isDragActive={isDragActive}
          isDragAccept={isDragAccept}
          isDragReject={isDragReject}
          hasUpload={!!file}
          className={fileRejections ? "rejected" : ""}
          onClick={() => (file ? onFileUpload(null as unknown as File) : open())}
          style={style}
        >
          <input {...getInputProps()} />

          <div>
            <UploadIcon />

            <span>{isErrored ? errors[type] : file?.name.slice(0, 60) || titles[type]}</span>

            {!!file && <IoCloseSharp />}
          </div>
        </Container>
      )}
    </Dropzone>
  );
}
