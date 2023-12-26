import { GlowingBlur } from "@hyoretsu/react-components";
import { ToastContainer } from "react-toastify";

import BlurGroup from "@components/BlurGroup";

import Logo from "@assets/images/logo.svg?svgr";
import Petrucio from "@assets/images/petrucio.svg?svgr";

import { SelecaoForm } from "./components/Form";
import { Content, FormDescription } from "./styles";

import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export default function Selecao() {
  return (
    <>
      <BlurGroup>
        <GlowingBlur color="#0072ed" radius="30rem" position={["-15%", "-35%"]} opacity={0.4} />

        <GlowingBlur
          color="#0072ed"
          radius="30rem"
          position={["-20%", "5%"]}
          invertPositions={[true, false]}
          opacity={0.4}
        />

        <GlowingBlur
          id="glow3"
          color="#0072ed"
          radius="30rem"
          position={["25%", "-40%"]}
          invertPositions={[false, true]}
          opacity={0.5}
        />
      </BlurGroup>

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
        <FormDescription>
          <div>
            <Petrucio alt="Mascote do PET Computação" width={120} height={66}></Petrucio>
            <Logo alt="Logo PET Computação" width={100} height={55}></Logo>
          </div>

          <h1>Preencha o formulário e faça parte desse time</h1>

          <p>Faça parte do nosso time, contribua em pesquisas e projetos de nossa comunidade.</p>
        </FormDescription>

        <SelecaoForm id="selecao-form" />
      </Content>
    </>
  );
}
