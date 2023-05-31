"use client";

import { baiJamjuree, inter } from "@app/sdc/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import Select from "react-select";
import { z } from "zod";

import Logo from "@assets/images/logo.svg?svgr";
import Petrucio from "@assets/images/petrucio.svg?svgr";

import { Content, FirstColumn, Forms, InputContainer, PETSDC, SecondColumn, Steps } from "./styles";

const sendFormSchema = z.object({
  name: z
    .string()
    .nonempty("Preencha este campo")
    .transform(name => {
      return name
        .trim()
        .split(" ")
        .map(word => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z.string().nonempty("O email é obrigatório").email("Formato de email inválido"),
  celular: z.string().min(17, { message: "O número deve conter 9 dígitos" }),
  matricula: z.string().array().length(11, { message: "O número deve conter 11 dígitos" }),
});

type SendFormData = z.infer<typeof sendFormSchema>;

export default function Inscricao() {
  const [step, setStep] = useState(0);
  const [output, setOutput] = useState("");
  const options = [
    { value: "cdia", label: "Ciência de Dados" },
    { value: "cc", label: "Ciência da Computação" },
    { value: "ec", label: "Engenharia da Computação" },
  ];
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SendFormData>({
    resolver: zodResolver(sendFormSchema),
  });

  let fieldGroups: JSX.Element[] = [];

  function renderStep() {
    const markers = [];
    for (let i = 0; i < fieldGroups.length; i++)
      markers.push(<div className={step >= i ? "active" : "inactive"}></div>);
    return markers;
  }

  fieldGroups = [
    <>
      <InputContainer>
        <div>Email</div>
        <input type="text" placeholder="exemplo@gmail.com" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
      </InputContainer>
      <InputContainer>
        <div>Nome completo</div>
        <input type="text" placeholder="João da Silva" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </InputContainer>
    </>,
    <>
      <InputContainer>
        <div>Celular</div>
        <InputMask
          placeholder="DDD + número"
          mask="(99) 99999 - 9999"
          maskChar={null}
          {...register("celular")}
        />
        {errors.celular && <span>{errors.celular.message}</span>}
      </InputContainer>
      <InputContainer>
        <div>Matrícula</div>
        <InputMask placeholder="20190113496" mask="99999999999" maskChar={null} {...register("matricula")} />
        {errors.matricula && <span>{errors.matricula.message}</span>}
      </InputContainer>

      <InputContainer>
        <div>Curso</div>
        <Select
          defaultValue={options[1]}
          options={options}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              background: "#121214",
              padding: ".4rem",
            }),
          }}
          theme={theme => ({
            ...theme,
            borderRadius: 2,
            colors: {
              ...theme.colors,
              primary25: "#121214",
              neutral15: "#121214",
              primary: "#121214",
            },
          })}
        />
      </InputContainer>
    </>,
  ];

  function sendForm(data: any) {
    setOutput(JSON.stringify(data, null, 2));
    router.push("/sdc");
  }

  return (
    <>
      <Content>
        <FirstColumn>
          <PETSDC>
            <Petrucio width={110} />
            <Logo alt="Logo PET Computação" width={120} height={65} />
          </PETSDC>
          <h1 className={inter.className}>Garanta sua vaga agora!</h1>
          <p className={baiJamjuree.className}>
            Participe agora, da Semana da computação e garanta sua vaga em minicursos e palestras! Corre que
            ainda dá tempo.
          </p>
          <Link aria-label="Verificar Programação" className={inter.className} href="/sdc">
            <Check width={16} />
            <span>Verificar Programação</span>
          </Link>
        </FirstColumn>
        <SecondColumn>
          <div>
            <h3>Bem-vindo a Semana da Computação!</h3>
            <p className={baiJamjuree.className}>
              Precisamos de algumas informações para criar sua inscrição! Ah, essas informações estarão
              presentes em seu certificado.
            </p>
            <Steps className={baiJamjuree.className}>
              <h6>Passo {step + 1} de 2</h6>
              <div className="bar">{renderStep()}</div>
            </Steps>
            <Forms onSubmit={handleSubmit(sendForm)} className={inter.className}>
              {fieldGroups[step]}
              {step === fieldGroups.length - 1 && (
                <button type="submit" disabled={!isValid}>
                  <span>Confirmar inscrição</span>
                  <Check width={16} />
                </button>
              )}
              {step < fieldGroups.length - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep(step + 1);
                  }}
                  disabled={!isValid}
                >
                  <span>Próximo Passo</span>
                  <ArrowRight width={16} />
                </button>
              )}
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep(step - 1);
                  }}
                  disabled={!isValid}
                >
                  <ArrowLeft width={16} />
                  <span>Voltar</span>
                </button>
              )}
            </Forms>
          </div>
        </SecondColumn>
      </Content>
    </>
  );
}
