"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

import Logo from "@assets/images/logo.svg?svgr";
import Petrucio from "@assets/images/petrucio.svg?svgr";

import {
  BackButton,
  ButtonContainer,
  Content,
  FirstColumn,
  Forms,
  InputContainer,
  PETSDC,
  SecondColumn,
  Steps,
} from "./styles";

import { useRouter } from "next/navigation";

const sendFormSchema = z.object({
  name: z.string().nonempty("Preencha este campo"),
  email: z.string().nonempty("O email é obrigatório").email("Formato de email inválido"),
  celular: z.string().min(17, { message: "O número deve conter 9 dígitos" }),
  matricula: z
    .string()
    .transform(m => parseInt(m))
    .pipe(
      z
        .number({
          invalid_type_error: "A matrícula deve ser um número",
          required_error: "A matrícula é obrigatória",
        })
        .min(10000000, { message: "Sua matrícula deve conter no mínimo 8 dígitos [Matrículas Antigas]" })
        .max(99999999999, { message: "Sua matrícula deve conter 11 dígitos" }),
    ),
  age: z
    .number({
      invalid_type_error: "A idade deve ser um número",
      required_error: "A idade é obrigatória",
    })
    .int({ message: "Sua idade deve ser um número inteiro" })
    .positive({ message: "Sua idade deve ser positiva" })
    .min(1, { message: "Idade inválida" })
    .max(120, { message: "Idade inválida" }),
});

type SendFormData = z.infer<typeof sendFormSchema>;

export default function Inscricao() {
  const router = useRouter();
  const options = [
    { value: "cdia", label: "Ciência de Dados" },
    { value: "cc", label: "Ciência da Computação" },
    { value: "ec", label: "Engenharia da Computação" },
  ];

  const [step, setStep] = useState(0);
  const [course, setCourse] = useState(options[1]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SendFormData>({
    resolver: zodResolver(sendFormSchema),
    mode: "onChange",
  });

  let fieldGroups: JSX.Element[] = [];

  function renderStep() {
    const markers = [];
    for (let i = 0; i < fieldGroups.length; i++)
      markers.push(<div key={i} className={step >= i ? "active" : "inactive"}></div>);
    return markers;
  }

  const [emailValue, nameValue, ageValue] = watch(["email", "name", "age"]);

  fieldGroups = [
    <>
      <InputContainer>
        <div>Email</div>
        <input type="email" placeholder="exemplo@gmail.com" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
      </InputContainer>
      <InputContainer>
        <div>Nome completo</div>
        <input type="text" placeholder="João da Silva" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </InputContainer>
      <InputContainer>
        <div>Idade</div>
        <input type="string" placeholder="18" {...register("age", { valueAsNumber: true })} />
        {errors.age && <span>{errors.age.message}</span>}
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
        <InputMask
          placeholder="20000115555 ou 11109999"
          mask="99999999999"
          maskChar={null}
          {...register("matricula")}
        />
        {errors.matricula && <span>{errors.matricula.message}</span>}
      </InputContainer>

      <InputContainer>
        <div>Curso</div>
        <Select
          form="sdc"
          onChange={e => (e ? setCourse(e) : null)}
          defaultValue={options[1]}
          options={options}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              padding: ".4rem",
              border: "none",
            }),
          }}
          theme={theme => ({
            ...theme,
            borderRadius: 2,
            colors: {
              ...theme.colors,
              primary: "white",
              neutral0: "#121214",
              neutral80: "white",
              neutral90: "white",
              primary25: "#202020",
            },
          })}
        />
      </InputContainer>
    </>,
  ];

  async function sendForm({ matricula, name, ...data }: SendFormData) {
    const i = toast.info("Carregando...");
    const res = await fetch("/api/subscribe/sdc", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        name: name.trim(),
        //   .split(" ")
        //   .map(word => {
        //     return word[0]?.toLocaleUpperCase().concat(word.substring(1));
        //   })
        //   .join(" ")
        matricula: matricula.toString(),
        course: course.value,
      }),
    });

    const d = await res.json();

    toast.dismiss(i);

    if (res.status === 200) {
      toast.success("Inscrição realizada com sucesso!");
      router.push("/");
    } else {
      toast.error(d.message || "Falha na inscrição", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          textAlign: "center",
          color: "#fgfgfg",
        },
      });
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Content>
        <FirstColumn>
          <PETSDC>
            <Petrucio width={110} />
            <Logo alt="Logo PET Computação" width={120} height={65} />
          </PETSDC>
          <h1>Garanta sua vaga agora!</h1>
          <p>
            Participe agora, da Semana da computação e garanta sua vaga em minicursos e palestras! Corre que
            ainda dá tempo.
          </p>
          <Link aria-label="Verificar Programação" href="/sdc">
            <Check width={16} />
            <span>Verificar Programação</span>
          </Link>
        </FirstColumn>
        <SecondColumn>
          <div>
            <h3>Bem-vindo a Semana da Computação!</h3>
            <p>
              Precisamos de algumas informações para criar sua inscrição! Ah, essas informações estarão
              presentes em seu certificado.
            </p>
            <Steps>
              <h6>Passo {step + 1} de 2</h6>
              <div className="bar">{renderStep()}</div>
            </Steps>
            <Forms onSubmit={handleSubmit(sendForm)} id="sdc">
              {fieldGroups[step]}
              <ButtonContainer>
                {step > 0 && (
                  <BackButton
                    type="button"
                    onClick={() => {
                      setStep(step - 1);
                    }}
                  >
                    <ArrowLeft width={16} />
                    <span>Voltar</span>
                  </BackButton>
                )}
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
                    disabled={
                      errors.email !== undefined ||
                      errors.name !== undefined ||
                      errors.age !== undefined ||
                      emailValue?.length === 0 ||
                      nameValue?.length === 0 ||
                      ageValue === undefined ||
                      Number.isNaN(ageValue)
                    }
                  >
                    <span>Próximo Passo</span>
                    <ArrowRight width={16} />
                  </button>
                )}
              </ButtonContainer>
            </Forms>
          </div>
        </SecondColumn>
      </Content>
    </>
  );
}
