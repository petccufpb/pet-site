"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineAcademicCap,
  HiOutlineCheckBadge,
  HiOutlineArrowPath,
  HiOutlinePaperAirplane,
  HiOutlinePlusCircle,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import api from "@api";
import { useSDC } from "../../../../contexts/SDCContext";

import {
  Container,
  Header,
  TitleArea,
  ActionGroup,
  EditionBadge,
  CardsGrid,
  Card,
  Form,
  FormRow,
  InputGroup,
  Button,
  TableSection,
  TableHeaderBar,
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  EmptyState,
  HashTag,
  AttendanceBadge,
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
              <HiOutlineAcademicCap color="#73E5E2" />
              Certificados da SDC
            </h2>
            <p>
              Gestão de certificados de participação da Semana de Computação. Dispare
              certificados em lote por e-mail corporativo ou emita de forma manual avulsa.
            </p>
          </TitleArea>

          <ActionGroup>
            <EditionBadge>
              Edição:{" "}
              <strong>
                {activeEdition
                  ? `${activeEdition.number}ª Edição ${activeEdition.name ? `(${activeEdition.name})` : ""}`
                  : "Nenhuma ativa"}
              </strong>
            </EditionBadge>
          </ActionGroup>
        </Header>

        <CardsGrid>
          {/* Card 1: Disparo em Lote */}
          <Card>
            <div>
              <h3>
                <HiOutlinePaperAirplane color="#73E5E2" />
                Disparo SMTP em Lote
              </h3>
              <p>
                Calcula automaticamente a elegibilidade de todos os participantes desta edição
                com base na frequência mínima requerida e envia os certificados por e-mail.
              </p>
            </div>

            <Button
              variant="success"
              onClick={handleBatchGenerate}
              disabled={!activeEdition || isGeneratingBatch}
            >
              <HiOutlineCheckBadge size={18} />
              Executar Lote de Certificados
            </Button>
          </Card>

          {/* Card 2: Emissão Manual */}
          <Card>
            <div>
              <h3>
                <HiOutlinePlusCircle color="#73E5E2" />
                Geração Manual (Bypass)
              </h3>
              <p>
                Emita um certificado avulso diretamente para um participante inscrito nesta
                edição informando o e-mail e a frequência atingida.
              </p>
            </div>

            <Form onSubmit={submitCert(handleManualCert, handleValidationError)}>
              <FormRow>
                <InputGroup>
                  <label htmlFor="cert-email">E-mail do Participante</label>
                  <input
                    id="cert-email"
                    type="email"
                    placeholder="participante@exemplo.com"
                    {...regCert("email")}
                  />
                </InputGroup>

                <InputGroup>
                  <label htmlFor="cert-attendance">Frequência (%)</label>
                  <input
                    id="cert-attendance"
                    type="number"
                    placeholder="100"
                    min="1"
                    max="100"
                    {...regCert("attendance")}
                  />
                </InputGroup>
              </FormRow>

              <Button primary type="submit" disabled={!activeEdition}>
                <HiOutlineCheckBadge size={18} />
                Gerar Certificado Avulso
              </Button>
            </Form>
          </Card>
        </CardsGrid>

        {/* Seção da Tabela */}
        <TableSection>
          <TableHeaderBar>
            <h3>
              <HiOutlineDocumentText color="#73E5E2" />
              Certificados Emitidos
              {certificates.length > 0 && ` (${certificates.length})`}
            </h3>

            <Button
              onClick={() => loadCertificates()}
              disabled={isLoadingCertificates || !activeEdition}
            >
              <HiOutlineArrowPath size={16} />
              Atualizar Lista
            </Button>
          </TableHeaderBar>

          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Participante</TableHeader>
                  <TableHeader>E-mail</TableHeader>
                  <TableHeader>Frequência</TableHeader>
                  <TableHeader>Hash ID</TableHeader>
                </tr>
              </thead>
              <tbody>
                {certificates.length > 0 ? (
                  certificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell style={{ fontWeight: 600 }}>
                        {cert.participant?.name || "N/A"}
                      </TableCell>
                      <TableCell style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                        {cert.participant?.email || "N/A"}
                      </TableCell>
                      <TableCell>
                        <AttendanceBadge value={cert.attendance}>
                          {cert.attendance}%
                        </AttendanceBadge>
                      </TableCell>
                      <TableCell>
                        <HashTag>{cert.id}</HashTag>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <tr>
                    <TableCell colSpan={4}>
                      <EmptyState>
                        {isLoadingCertificates
                          ? "Carregando certificados da edição..."
                          : "Nenhum certificado emitido para esta edição até o momento."}
                      </EmptyState>
                    </TableCell>
                  </tr>
                )}
              </tbody>
            </Table>
          </TableContainer>
        </TableSection>
      </Container>
    </>
  );
}
