"use client";

import { DataStatus, FileUploadEvent, FilesToUpload } from "@app/selecao/types";
import { ChangeEvent, useEffect, useState } from "react";
import { FaExclamationCircle, FaIdCard, FaPaperPlane, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";

import { FileInput } from "../FileInput";
import {
  Content,
  FormInput,
  FormSection,
  InputContainer,
  LoadingIcon,
  MaskedFormInput,
  SendButton,
  UploadTitle,
  Warning,
} from "./styles";

// Função que checa se o CPF é válido através
// dos últimos 2 dígitos de validação.
const cpfSchema = z.string().refine(val => {
  const cpf = val.replace(/[^\d]+/g, "");

  if (cpf.length !== 11) return false;

  // Os CPFs "111.111.111-11", "222.222.222-22"... todos passam o teste dos últimos dígitos.
  // Todavia, são CPFs que não pertencem a ninguém - inválidos.
  // Essa linha irá checar se todos os dígitos do CPF são iguais e, caso verdadeiro,
  // o marcando como inválido.
  if (cpf.split("").filter(d => d === cpf[0]).length === 11) return false;

  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;

  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;

  return true;
});

// Função para checar se o nome possui mais de uma palavra.
// (para evitar que seja colocado apenas o 1º nome).
const nameSchema = z.string().refine(val => {
  const allowedCharacters = " abcdefghijklmnopqrstuvwxyzãõáéíóúç";

  for (const l of val) {
    if (!allowedCharacters.includes(l.toLowerCase())) return false;
  }

  const split = val.split(" ");

  return split.length > 1 && split[0].length > 0 && split[1].length > 0;
});

export function SelecaoForm() {
  const [cpfStatus, setCpfStatus] = useState<DataStatus>("incomplete");
  const [nameStatus, setNameStatus] = useState<DataStatus>("incomplete");
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const [filesToUpload, setFilesToUpload] = useState<FilesToUpload>({
    cv: undefined,
    historico: undefined,
    matricula: undefined,
  });

  const [canSend, setCanSend] = useState<boolean>(false);

  async function validateCpf(e: ChangeEvent<HTMLInputElement>) {
    const cpf = e.currentTarget.value;

    if (cpf.length === 14) {
      setCpfStatus(cpfSchema.safeParse(cpf).success ? "valid" : "invalid");
      setCpf(cpf);
      return;
    }

    setCpfStatus("incomplete");
  }

  async function validateName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.currentTarget.value;

    if (name.length === 0) {
      setNameStatus("incomplete");
      return;
    }

    setName(name);
    setNameStatus(nameSchema.safeParse(name).success ? "valid" : "invalid");
  }

  async function onFileUpload(e: FileUploadEvent) {
    switch (e.origin) {
      case "cv":
        setFilesToUpload({ ...filesToUpload, cv: e.file });
        break;
      case "matricula":
        setFilesToUpload({ ...filesToUpload, matricula: e.file });
        break;
      case "historico":
        setFilesToUpload({ ...filesToUpload, historico: e.file });
        break;
    }
  }

  async function send() {
    if (!(canSend && filesToUpload.cv && filesToUpload.matricula && filesToUpload.historico)) return;

    const formData = new FormData();

    // send the files
    formData.append("cv", filesToUpload.cv, "cv.pdf");
    formData.append("matricula", filesToUpload.matricula, "matricula.pdf");
    formData.append("historico", filesToUpload.historico, "historico.pdf");
    formData.append("name", name);
    formData.append("cpf", cpf);

    setIsSending(true);

    const response = await fetch("/api/selection", {
      method: "POST",
      body: formData,
    });

    setIsSending(false);

    if (response.status === 200) {
      toast.success("Formulário enviado com sucesso!");
      return;
    }

    toast.error("Erro ao enviar o formulário.");
  }

  // Sempre que algum dos campos tiver uma mudança no valor,
  // checar se TODOS são válidos e, por fim, se estiverem,
  // permitir o envio do form.
  useEffect(() => {
    for (const file of Object.values(filesToUpload)) {
      if (!file) {
        setCanSend(false);
        return;
      }
    }

    if (cpfStatus !== "valid" || nameStatus !== "valid") {
      setCanSend(false);
      return;
    }

    setCanSend(true);
  }, [filesToUpload, nameStatus, cpfStatus]);

  return (
    <Content>
      <FormSection>
        <InputContainer className={nameStatus}>
          <FaUser size={18} />
          <FormInput type="text" placeholder="Nome Completo" onChange={validateName} />
        </InputContainer>
        <InputContainer className={cpfStatus}>
          <FaIdCard size={18} />
          <MaskedFormInput
            type="text"
            placeholder="CPF"
            mask="999.999.999-99"
            maskChar={null}
            onChange={validateCpf}
          />
        </InputContainer>
      </FormSection>
      <FormSection>
        <UploadTitle>Upload</UploadTitle>
        <FileInput type="cv" filesToUpload={filesToUpload} onFileUpload={onFileUpload} />
        <Warning>
          <FaExclamationCircle size={20} />
          <div>
            Enviar também a documentação comprobatória de eventuais cursos/formações presentes no currículo.
          </div>
        </Warning>
      </FormSection>
      <FormSection>
        <FileInput type="matricula" filesToUpload={filesToUpload} onFileUpload={onFileUpload} />
        <FileInput type="historico" filesToUpload={filesToUpload} onFileUpload={onFileUpload} />
      </FormSection>
      <SendButton canSend={canSend} onClick={() => send()}>
        {isSending ? <LoadingIcon /> : <FaPaperPlane />}
        ENVIAR
      </SendButton>
    </Content>
  );
}
