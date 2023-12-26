"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import ArrowRight from "@assets/images/arrow_right.svg?svgr";
import WarningIcon from "@assets/images/warning.svg?svgr";

import { FileInput } from "./components/FileInput";
import RequiredIcon from "./components/RequiredIcon";
import { Attachments, Content, FormInput, SendButton, Styling, Warning } from "./styles";

interface SelecaoFormProps {
  id?: string;
}

const formSchema = z.object({
  name: z
    .string()
    .nonempty()
    .refine(
      val => {
        const allowedCharacters = " abcdefghijklmnopqrstuvwxyzãõáéíóúç";

        for (const l of val) {
          if (!allowedCharacters.includes(l.toLowerCase())) return false;
        }

        const names = val.split(" ");
        if (names.length < 2 || names[0].length === 0 || names[1].length === 0) {
          return false;
        }

        return true;
      },
      { message: "Nome inválido" },
    ),
  cpf: z
    .string()
    .nonempty()
    .refine(
      val => {
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
      },
      { message: "CPF inválido" },
    ),
  cv: z.instanceof(File),
  matricula: z.instanceof(File),
  historico: z.instanceof(File),
});

type FormData = z.infer<typeof formSchema>;

export function SelecaoForm({ id }: SelecaoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const [cv, matricula, historico] = watch(["cv", "matricula", "historico"]);

  const [isSending, setIsSending] = useState<boolean>(false);

  const send: SubmitHandler<FormData> = async ({ cpf, cv, historico, matricula, name }) => {
    const formData = new FormData();

    // send the files
    formData.append("cv", cv as File, "cv.pdf");
    formData.append("matricula", matricula as File, "matricula.pdf");
    formData.append("historico", historico as File, "historico.pdf");
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
  };
  console.log(errors);

  return (
    <Styling id={id}>
      <div>
        <h4>Bem-vindo ao PET Computação!</h4>

        <p>
          Essas informações são necessárias para efetuar sua inscrição e validar seus dados para a seleção.
        </p>
      </div>

      <Content onSubmit={handleSubmit(send)}>
        <div>
          <label htmlFor="name">
            Nome Completo <RequiredIcon />
          </label>

          <FormInput
            type="text"
            placeholder="Petrúcio"
            isErrored={!!errors.name}
            mask=""
            {...register("name")}
          />
        </div>

        <div>
          <label htmlFor="cpf">
            CPF <RequiredIcon />
          </label>

          <FormInput
            type="text"
            placeholder="000.000.000-00"
            isErrored={!!errors.cpf}
            mask="999.999.999-99"
            maskChar={null}
            {...register("cpf")}
          />
        </div>

        <Attachments>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Anexos</label>

          <FileInput
            type="cv"
            file={cv}
            isErrored={!!errors.cv}
            onFileUpload={file => setValue("cv", file)}
          />
          <Warning>
            <WarningIcon size={20} color="#0072ed" />

            <p>
              Enviar também a documentação comprobatória de eventuais cursos/formações presentes no currículo.
            </p>
          </Warning>

          <FileInput
            type="matricula"
            file={matricula}
            isErrored={!!errors.matricula}
            onFileUpload={file => setValue("matricula", file)}
          />

          <FileInput
            type="historico"
            file={historico}
            isErrored={!!errors.historico}
            onFileUpload={file => setValue("historico", file)}
            style={{ marginTop: "1rem" }}
          />
        </Attachments>

        <SendButton type="submit" disabled={!isValid}>
          Enviar <ArrowRight />
        </SendButton>
      </Content>
    </Styling>
  );
}
