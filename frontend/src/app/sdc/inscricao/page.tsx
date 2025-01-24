"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

import api from "@api";

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

const sendFormSchema = z.object({
  name: z.string().nonempty("Preencha este campo"),
  email: z.string().nonempty("O email é obrigatório").email("Formato de email inválido"),
  celular: z.string().min(17, { message: "O número deve conter 9 dígitos" }),
  matricula: z
    .string()
    .optional()
    .transform(m => (!m || m.trim() === "" ? undefined : parseInt(m, 10)))
    .pipe(
      z
        .number({
          invalid_type_error: "A matrícula deve ser um número",
        })
        .min(10000000, { message: "Sua matrícula deve conter no mínimo 8 dígitos [Matrículas Antigas]" })
        .max(99999999999, { message: "Sua matrícula deve conter 11 dígitos" })
        .optional(),
    ),
  birthDate: z
    .string({
      invalid_type_error: "Data inválida",
      required_error: "A data de nascimento é obrigatória",
    })
    .regex(
      /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/,
      {
        message: "Data inválida",
      },
    ),
});

type SendFormData = z.infer<typeof sendFormSchema>;

export default function Inscricao() {
  const router = useRouter();
  const options = [
    { value: "cdia", label: "Ciência de Dados" },
    { value: "cc", label: "Ciência da Computação" },
    { value: "ec", label: "Engenharia da Computação" },
    { value: "ext", label: "Externo" },
    { value: "outro", label: "Outro" },
  ];

  const [editionId, setEditionId] = useState("");
  const [step, setStep] = useState(0);
  const [course, setCourse] = useState<{ value: string; label: string }>(options[1]);

  useEffect(() => {
    async function execute() {
      const {
        data: { id },
      } = await api.get("/projects/editions/latest?project=SDC");
      setEditionId(id);
    }

    execute();
  }, []);

  const {
    clearErrors,
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
    setValue,
    trigger,
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

  const [emailValue, nameValue, ageValue] = watch(["email", "name", "birthDate"]);

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
        <div>Data de nascimento</div>
        <InputMask placeholder="01/01/2000" mask="99/99/9999" maskChar={null} {...register("birthDate")} />
        {errors.birthDate && <span>{errors.birthDate.message}</span>}
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
      {course?.value !== "ext" && (
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
      )}

      <InputContainer>
        <div>Curso</div>
        <Select
          form="sdc"
          onChange={e => {
            if (!e) {
              return;
            }

            setCourse(e);

            if (e.value === "ext") {
              clearErrors("matricula");
              // @ts-expect-error
              setValue("matricula", "");
              trigger();
            }
          }}
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
    // if (course?.value !== "ext") {
    if (course?.value !== "ext" && !matricula) {
      setError("matricula", { message: "A matrícula é obrigatória" });

      return;
    }

    const i = toast.info("Carregando...");

    const res = await fetch("/api/subscribe/sdc", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        editionId,
        name: name.trim(),
        matricula: matricula?.toString(),
        course: course?.value,
      }),
    });

    const d = await res.json();

    toast.dismiss(i);

    if (res.status === 200) {
      toast.success("Inscrição realizada com sucesso! Você será redirecionado em breve.");

      setTimeout(() => {
        router.push("/sdc");
      }, 5000);
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
          position: "sticky",
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
          <a aria-label="Verificar Programação" href="/sdc">
            <Check width={16} />
            <span>Verificar Programação</span>
          </a>
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
                      errors.birthDate !== undefined ||
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
