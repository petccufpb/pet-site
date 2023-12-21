"use client";

import { DataStatus, FileUploadEvent, FilesToUpload } from "@app/selecao/types";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import ArrowRight from "@assets/images/arrow_right.svg?svgr";
import WarningIcon from "@assets/images/warning.svg?svgr";

import { FileInput } from "./components/FileInput";
import RequiredIcon from "./components/RequiredIcon";
import { Attachments, Container, Content, LoadingIcon, MaskedFormInput, SendButton, Warning } from "./styles";

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
  const [cpfStatus, setCpfStatus] = useState<DataStatus>("");
  const [nameStatus, setNameStatus] = useState<DataStatus>("");
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    cpf: false,
    cv: false,
    historico: false,
    matricula: false,
    name: false,
  });

  const [filesToUpload, setFilesToUpload] = useState<FilesToUpload>({
    cv: undefined,
    historico: undefined,
    matricula: undefined,
  });

  async function validateCpf(e: ChangeEvent<HTMLInputElement>) {
    const cpf = e.currentTarget.value;

    setCpf(cpf);
    setCpfStatus(!cpf ? "" : cpfSchema.safeParse(cpf).success ? "valid" : "invalid");
  }

  async function validateName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.currentTarget.value;

    setName(name);
    setNameStatus(!name ? "" : nameSchema.safeParse(name).success ? "valid" : "invalid");
  }

  async function onFileUpload({ origin: field, file }: FileUploadEvent) {
    setFilesToUpload({ ...filesToUpload, [field]: file });
    setErrors(old => ({ ...old, [field]: false }));
  }

  async function send() {
    const newErrors = { ...errors };

    // Check for missing fields
    for (const field of Object.keys(errors)) {
      if (field === "name" && nameStatus !== "valid") {
        Object.assign(newErrors, { name: true });
      }
      if (field === "cpf" && cpfStatus !== "valid") {
        Object.assign(newErrors, { cpf: true });
      }
      // @ts-ignore
      if (!filesToUpload[field]) {
        Object.assign(newErrors, { [field]: true });
      }
    }
    if (Object.values(newErrors).find(error => error)) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();

    // send the files
    formData.append("cv", filesToUpload.cv as File, "cv.pdf");
    formData.append("matricula", filesToUpload.matricula as File, "matricula.pdf");
    formData.append("historico", filesToUpload.historico as File, "historico.pdf");
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

  return (
    <Container>
      <div>
        <h4>Bem-vindo ao PET Computação!</h4>

        <p>
          Essas informações são necessárias para efetuar sua inscrição e validar seus dados para a seleção.
        </p>
      </div>

      <Content>
        <div>
          <label htmlFor="name">
            Nome Completo <RequiredIcon />
          </label>
          <MaskedFormInput
            name="name"
            className={nameStatus}
            placeholder="Petrúcio"
            type="text"
            mask=""
            onChange={validateName}
          />
        </div>

        <div>
          <label htmlFor="cpf">
            CPF <RequiredIcon />
          </label>
          <MaskedFormInput
            name="cpf"
            className={cpfStatus}
            placeholder="000.000.000-00"
            type="text"
            mask="999.999.999-99"
            maskChar={null}
            onChange={validateCpf}
          />
        </div>

        <Attachments>
          <label htmlFor="attachments">Anexos</label>

          <FileInput
            type="cv"
            isErrored={errors.cv}
            filesToUpload={filesToUpload}
            onFileUpload={onFileUpload}
          />
          <Warning>
            <WarningIcon size={20} color="#0072ed" />

            <p>
              Enviar também a documentação comprobatória de eventuais cursos/formações presentes no currículo.
            </p>
          </Warning>

          <FileInput
            type="matricula"
            isErrored={errors.matricula}
            filesToUpload={filesToUpload}
            onFileUpload={onFileUpload}
          />

          <FileInput
            type="historico"
            isErrored={errors.historico}
            filesToUpload={filesToUpload}
            onFileUpload={onFileUpload}
            style={{ marginTop: "1rem" }}
          />
        </Attachments>

        <SendButton canSend={Object.values(errors).filter(error => error).length === 0} onClick={send}>
          Enviar <ArrowRight />
        </SendButton>
      </Content>
    </Container>
  );
}
