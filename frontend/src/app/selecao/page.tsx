import { ToastContainer } from "react-toastify";

import Logo from "@assets/images/logo.svg?svgr";
import Petrucio from "@assets/images/petrucio.svg?svgr";

import { SelecaoForm } from "./components/Form";
import { Content, FormDescription } from "./styles";
import "react-toastify/dist/ReactToastify.css";

export default function Selecao() {
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
        <FormDescription>
          <div>
            <Petrucio alt="Mascote do PET Computação" width={120} height={66}></Petrucio>
            <Logo alt="Logo PET Computação" width={100} height={55}></Logo>
          </div>
          <h1>Preencha o formulário e faça parte desse time</h1>
        </FormDescription>
        <SelecaoForm />
      </Content>
    </>
  );
}
