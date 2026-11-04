"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineAcademicCap, HiOutlineCheckBadge, HiOutlineArrowPath } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import api from "@api";
import { useSDC } from "../../../../contexts/SDCContext";

import {
  Area,
  AreaContainer,
  Container,
  Header,
  TitleArea,
  EditionBadge,
  InputContainer,
  SendButton,
  Button,
  SubTitle,
  Description,
  TableContainer,
  ProgressModalOverlay,
  ProgressModalContent,
  ProgressBarContainer,
  ProgressBarFill,
} from "./styles";

const certSchema = z.object({
  email: z.string().email("E-mail inválido"),
  attendance: z.coerce.number().min(1, "Mínimo 1%").max(100, "Máximo 100%"),
});

type CertData = z.infer<typeof certSchema>;

interface CertificateItem {
  id: string;
  attendance: number;
  participant?: {
    name?: string;
    email?: string;
  };
}

export default function CertificadosAdminPage() {
  const { currentEdition } = useSDC();
  const [fallbackEdition, setFallbackEdition] = useState<any>(null);

  const activeEdition = currentEdition || fallbackEdition;

  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [isLoadingCertificates, setIsLoadingCertificates] = useState<boolean>(false);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);

  const {
    register: regCert,
    handleSubmit: submitCert,
    reset: resetCert,
  } = useForm<CertData>({
    resolver: zodResolver(certSchema),
  });

  const handleValidationError = () => {
    toast.warning("Verifique os campos. Preencha todos corretamente.");
  };

  const loadFallbackEdition = useCallback(async () => {
    try {
      const { data: latest } = await api.get("/projects/editions/latest?project=SDC");
      setFallbackEdition(latest);
    } catch (error) {
      console.warn("Ainda não existem edições cadastradas.");
    }
  }, []);

  useEffect(() => {
    if (!currentEdition) {
      loadFallbackEdition();
    }
  }, [currentEdition, loadFallbackEdition]);

  const loadCertificates = useCallback(async () => {
    if (!activeEdition?.id) return;
    setIsLoadingCertificates(true);
    try {
      const { data } = await api.get(`/projects/certificates?editionId=${activeEdition.id}`);
      setCertificates(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erro ao carregar certificados.");
    } finally {
      setIsLoadingCertificates(false);
    }
  }, [activeEdition?.id]);

  useEffect(() => {
    if (activeEdition?.id) {
      loadCertificates();
    }
  }, [activeEdition?.id, loadCertificates]);

  const simulateProgress = () => {
    setBatchProgress(0);
    return setInterval(() => {
      setBatchProgress((prev) => (prev >= 90 ? prev : prev + 5));
    }, 1500);
  };

  const handleBatchGenerate = async () => {
    if (!activeEdition?.id) return toast.error("Nenhuma Edição Ativa!");
    setIsGeneratingBatch(true);
    const interval = simulateProgress();

    try {
      await api.post("/projects/certificates", { editionId: activeEdition.id });
      clearInterval(interval);
      setBatchProgress(100);
      toast.success("Certificados processados em lote SMTP!");
      loadCertificates();

      setTimeout(() => {
        setIsGeneratingBatch(false);
        setBatchProgress(0);
      }, 2000);
    } catch (error) {
      clearInterval(interval);
      setIsGeneratingBatch(false);
      toast.error("Erro ao processar o lote.");
    }
  };

  const handleManualCert = async (data: CertData) => {
    if (!activeEdition?.id) return toast.error("Nenhuma Edição Ativa!");
    const i = toast.loading("A gerar certificado...");
    try {
      await api.post("/projects/certificates/create", {
        editionId: activeEdition.id,
        email: data.email,
        attendance: data.attendance,
      });
      toast.update(i, {
        render: "Certificado gerado com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      resetCert();
      loadCertificates();
    } catch (error) {
      toast.update(i, {
        render: "Erro: Participante não encontrado ou duplicado.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer position="top-center" theme="dark" />

      {isGeneratingBatch && (
        <ProgressModalOverlay>
          <ProgressModalContent>
            <h2>Disparo SMTP em Lote</h2>
            <p>A calcular elegibilidade e a disparar e-mails. Aguarde...</p>
            <ProgressBarContainer>
              <ProgressBarFill progress={batchProgress} />
            </ProgressBarContainer>
            <span
              style={{
                color: batchProgress === 100 ? "#04d361" : "#38bcde",
                fontWeight: "bold",
              }}
            >
              {batchProgress}%
            </span>
          </ProgressModalContent>
        </ProgressModalOverlay>
      )}

      <Container>
        <Header>
          <TitleArea>
            <h2>
              <HiOutlineAcademicCap />
              Certificados da SDC
            </h2>
            <p>
              Gestão de certificados de participação da Semana de Computação. Dispare
              certificados em lote por e-mail ou emita de forma manual avulsa.
            </p>
          </TitleArea>

          <EditionBadge>
            Edição:{" "}
            <strong>
              {activeEdition
                ? `${activeEdition.number}ª Edição ${activeEdition.name ? `(${activeEdition.name})` : ""}`
                : "Nenhuma ativa"}
            </strong>
          </EditionBadge>
        </Header>

        <AreaContainer>
          {/* Seção 1: Disparo em Lote */}
          <Area style={{ gridTemplateColumns: "1fr", rowGap: "1rem" }}>
            <div>
              <SubTitle>Disparo de Certificados em Lote</SubTitle>
              <Description>
                Calcula automaticamente os participantes elegíveis (frequência mínima cumprida)
                da edição selecionada e envia os certificados via e-mail corporativo.
              </Description>
            </div>
            <SendButton onClick={handleBatchGenerate} disabled={!activeEdition || isGeneratingBatch}>
              <span>Executar Lote de Certificados</span>
              <HiOutlineCheckBadge size="1.2em" />
            </SendButton>
          </Area>

          {/* Seção 2: Geração Manual */}
          <form onSubmit={submitCert(handleManualCert, handleValidationError)}>
            <SubTitle>Geração Manual (Bypass)</SubTitle>
            <Description>
              Emita um certificado individual diretamente para um inscrito cadastrado nesta edição.
            </Description>
            <Area>
              <InputContainer>
                <h3>E-mail do Inscrito</h3>
                <input
                  type="email"
                  placeholder="aluno@email.com"
                  {...regCert("email")}
                />
              </InputContainer>
              <InputContainer>
                <h3>Frequência (%)</h3>
                <input
                  type="number"
                  placeholder="100"
                  min="1"
                  max="100"
                  {...regCert("attendance")}
                />
              </InputContainer>
            </Area>
            <SendButton type="submit" style={{ marginTop: "1.5rem" }} disabled={!activeEdition}>
              <span>Gerar Certificado Avulso</span>
              <HiOutlineCheckBadge size="1.2em" />
            </SendButton>
          </form>

          {/* Seção 3: Histórico de Certificados Emitidos */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <SubTitle style={{ margin: 0 }}>Certificados Emitidos</SubTitle>
              <Button
                onClick={() => loadCertificates()}
                disabled={isLoadingCertificates || !activeEdition}
                style={{ padding: "0.5rem 1rem", gap: "0.4rem" }}
              >
                <HiOutlineArrowPath size={16} />
                <span>Atualizar</span>
              </Button>
            </div>

            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th>Participante</th>
                    <th>E-mail</th>
                    <th>Frequência</th>
                    <th>Hash ID</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.length > 0 ? (
                    certificates.map((cert) => (
                      <tr key={cert.id}>
                        <td>{cert.participant?.name || "N/A"}</td>
                        <td>{cert.participant?.email || "N/A"}</td>
                        <td>{cert.attendance}%</td>
                        <td style={{ fontFamily: "monospace", color: "#a9a9b2" }}>
                          {cert.id}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center", color: "#a9a9b2" }}>
                        {isLoadingCertificates
                          ? "Carregando certificados..."
                          : "Nenhum certificado emitido para esta edição."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </TableContainer>
          </div>
        </AreaContainer>
      </Container>
    </>
  );
}
