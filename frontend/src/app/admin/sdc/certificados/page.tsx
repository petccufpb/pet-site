"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import api from "@api";

import {
  Area,
  AreaContainer,
  AreaOption,
  AreaSelector,
  Container,
  InputContainer,
  SendButton,
  SubTitle,
  Description,
  TableContainer,
  SelectNative,
  ProgressModalOverlay,
  ProgressModalContent,
  ProgressBarContainer,
  ProgressBarFill,
} from "./styles";

// ==========================================
// SCHEMAS (DEV 3 & DEV 5)
// ==========================================
const editionSchema = z.object({
  number: z.coerce.number({ invalid_type_error: "Insira um número" }).min(1, "Nº obrigatório"),
  name: z.string().optional(),
  date: z.string().min(1, "Data de início obrigatória"),
  minimumAttendance: z.coerce.number().min(1).max(100),
});

const eventSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  type: z.enum(["minicurso", "palestra", "main"]),
  startTime: z.string().min(1, "Início obrigatório"),
  endTime: z.string().min(1, "Término obrigatório"),
  location: z.string().min(1, "Localização obrigatória"),
  capacity: z.coerce.number().optional(),
  speakerId: z.string().min(1, "ID do Palestrante obrigatório"),
});

const certSchema = z.object({
  email: z.string().email("E-mail inválido"),
  attendance: z.coerce.number().min(1, "Mínimo 1").max(100, "Máximo 100"),
});

type EditionData = z.infer<typeof editionSchema>;
type EventData = z.infer<typeof eventSchema>;
type CertData = z.infer<typeof certSchema>;

export default function AdminPage() {
  const [selectedArea, setSelectedArea] = useState(0); 
  
  const [latestEdition, setLatestEdition] = useState<any>(null);
  const [editionsList, setEditionsList] = useState<any[]>([]);
  
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);

  const { register: regEd, handleSubmit: submitEd, reset: resetEd } = useForm<EditionData>({ resolver: zodResolver(editionSchema) });
  const { register: regEv, handleSubmit: submitEv, reset: resetEv } = useForm<EventData>({ resolver: zodResolver(eventSchema) });
  const { register: regCert, handleSubmit: submitCert, reset: resetCert } = useForm<CertData>({ resolver: zodResolver(certSchema) });

  const handleValidationError = () => {
    toast.warning("Verifique os campos. Preencha todos corretamente.");
  };

  const loadGlobalContext = async () => {
    try {
      const { data: latest } = await api.get("/projects/editions/latest?project=SDC");
      setLatestEdition(latest);
      
      const { data: allEditions } = await api.get("/projects/editions?project=SDC");
      setEditionsList(Array.isArray(allEditions) ? allEditions : [allEditions]);
    } catch (error) {
      console.warn("Ainda não existem edições.");
    }
  };

  useEffect(() => {
    loadGlobalContext();
  }, []);

  const handleCreateEdition = async (data: EditionData) => {
    const i = toast.loading("A criar edição...");
    try {
      await api.post("/projects/editions", {
        projectId: latestEdition?.projectId || "200a0b12-1d57-4180-b2be-017cd1e00e84", 
        number: data.number,
        name: data.name,
        date: new Date(data.date).toISOString(),
        minimumAttendance: data.minimumAttendance,
      });
      toast.update(i, { render: "Edição criada com sucesso!", type: "success", isLoading: false, autoClose: 3000 });
      resetEd();
      loadGlobalContext();
    } catch (err) {
      toast.update(i, { render: "Falha ao criar edição.", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const handleCreateEvent = async (data: EventData) => {
    if (!latestEdition) return toast.error("Crie uma Edição primeiro!");
    const i = toast.loading("A registar evento...");
    try {
      await api.post("/projects/events", {
        editionId: latestEdition.id,
        name: data.name,
        type: data.type,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
        location: data.location,
        speakerId: data.speakerId,
        capacity: data.capacity || 0,
        onSite: true,
      });
      toast.update(i, { render: "Evento adicionado ao cronograma!", type: "success", isLoading: false, autoClose: 3000 });
      resetEv();
    } catch (err) {
      toast.update(i, { render: "Falha ao criar evento.", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const loadCertificates = async () => {
    if (!latestEdition) return;
    try {
      const { data } = await api.get(`/projects/certificates?editionId=${latestEdition.id}`);
      setCertificates(data);
    } catch (error) {
      toast.error("Erro ao carregar certificados.");
    }
  };

  useEffect(() => {
    if (selectedArea === 2 && latestEdition) loadCertificates();
  }, [selectedArea, latestEdition]);

  const simulateProgress = () => {
    setBatchProgress(0);
    return setInterval(() => {
      setBatchProgress((prev) => (prev >= 90 ? prev : prev + 5));
    }, 1500);
  };

  const handleBatchGenerate = async () => {
    if (!latestEdition) return toast.error("Nenhuma Edição Ativa!");
    setIsGeneratingBatch(true);
    const interval = simulateProgress();

    try {
      await api.post("/projects/certificates", { editionId: latestEdition.id });
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
    if (!latestEdition) return toast.error("Nenhuma Edição Ativa!");
    const i = toast.loading("A gerar certificado...");
    try {
      await api.post("/projects/certificates/create", {
        editionId: latestEdition.id,
        email: data.email,
        attendance: data.attendance,
      });
      toast.update(i, { render: "Certificado gerado com sucesso!", type: "success", isLoading: false, autoClose: 3000 });
      resetCert();
      loadCertificates();
    } catch (error) {
      toast.update(i, { render: "Erro: Participante não encontrado ou duplicado.", type: "error", isLoading: false, autoClose: 3000 });
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
            <span style={{ color: batchProgress === 100 ? "#04d361" : "#38bcde", fontWeight: "bold" }}>
              {batchProgress}%
            </span>
          </ProgressModalContent>
        </ProgressModalOverlay>
      )}

      <Container>
        <h1>SDC: Área Administrativa</h1>
        
        <AreaSelector>
          <AreaOption onClick={() => setSelectedArea(0)} selected={selectedArea === 0}>Edições</AreaOption>
          <AreaOption onClick={() => setSelectedArea(1)} selected={selectedArea === 1}>Eventos</AreaOption>
          <AreaOption onClick={() => setSelectedArea(2)} selected={selectedArea === 2}>Certificados</AreaOption>
        </AreaSelector>

        {selectedArea === 0 && (
          <AreaContainer>
            <form onSubmit={submitEd(handleCreateEdition, handleValidationError)}>
              <SubTitle>Cadastrar Nova Edição</SubTitle>
              <Area>
                <InputContainer>
                  <h3>Nº da Edição</h3>
                  <input type="number" placeholder="Ex: 30" min="1" {...regEd("number")} />
                </InputContainer>
                <InputContainer>
                  <h3>Nome (Opcional)</h3>
                  <input type="text" placeholder="Semana da Computação" {...regEd("name")} />
                </InputContainer>
                <InputContainer>
                  <h3>Data de Início</h3>
                  <input type="datetime-local" {...regEd("date")} />
                </InputContainer>
                <InputContainer>
                  <h3>Frequência Mínima (%)</h3>
                  <input type="number" defaultValue="75" min="1" max="100" {...regEd("minimumAttendance")} />
                </InputContainer>
              </Area>
              <SendButton type="submit" style={{ marginTop: "1.5rem" }}>
                <span>Salvar Edição</span>
                <HiOutlineCheckBadge size="1.2em" />
              </SendButton>
            </form>

            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th>Edição</th>
                    <th>Nome</th>
                    <th>Data</th>
                    <th>ID do Sistema</th>
                  </tr>
                </thead>
                <tbody>
                  {editionsList.map((ed) => (
                    <tr key={ed.id}>
                      <td>{ed.number}ª Edição</td>
                      <td>{ed.name || "N/A"}</td>
                      <td>{new Date(ed.date).toLocaleDateString("pt-BR")}</td>
                      <td style={{ fontFamily: "monospace", color: "#a9a9b2" }}>{ed.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableContainer>
          </AreaContainer>
        )}

        {selectedArea === 1 && (
          <AreaContainer>
            <form onSubmit={submitEv(handleCreateEvent, handleValidationError)}>
              <SubTitle>Agendar Evento (Cronograma)</SubTitle>
              <Description>
                Associado à Edição: <strong style={{color: 'white'}}>{latestEdition ? `${latestEdition.number}ª` : 'Nenhuma'}</strong>.
              </Description>
              <Area style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                <InputContainer>
                  <h3>Nome da Atividade</h3>
                  <input type="text" placeholder="Ex: Introdução a Python" {...regEv("name")} />
                </InputContainer>
                <InputContainer>
                  <h3>Tipo de Evento</h3>
                  <SelectNative {...regEv("type")}>
                    <option value="minicurso">Minicurso</option>
                    <option value="palestra">Palestra</option>
                    <option value="main">Evento Principal</option>
                  </SelectNative>
                </InputContainer>
                <InputContainer>
                  <h3>Speaker ID</h3>
                  <input type="text" defaultValue="9e2e2d4b-d044-4852-9226-f7a284e32321" {...regEv("speakerId")} />
                </InputContainer>
                <InputContainer>
                  <h3>Início</h3>
                  <input type="datetime-local" {...regEv("startTime")} />
                </InputContainer>
                <InputContainer>
                  <h3>Término</h3>
                  <input type="datetime-local" {...regEv("endTime")} />
                </InputContainer>
                <InputContainer>
                  <h3>Localização</h3>
                  <input type="text" placeholder="Ex: Auditório 1" {...regEv("location")} />
                </InputContainer>
                <InputContainer>
                  <h3>Vagas (Opcional)</h3>
                  <input type="number" placeholder="Ex: 40" {...regEv("capacity")} />
                </InputContainer>
              </Area>
              <SendButton type="submit" style={{ marginTop: "1.5rem" }}>
                <span>Cadastrar Evento</span>
                <HiOutlineCheckBadge size="1.2em" />
              </SendButton>
            </form>
          </AreaContainer>
        )}

        {selectedArea === 2 && (
          <AreaContainer>
            <Area style={{ gridTemplateColumns: "1fr", rowGap: "1rem", marginBottom: "2rem" }}>
              <SubTitle>Disparo de Certificados em Lote</SubTitle>
              <SendButton onClick={handleBatchGenerate}>
                <span>Executar Lote de Certificados</span>
                <HiOutlineCheckBadge size="1.2em" />
              </SendButton>
            </Area>

            <form onSubmit={submitCert(handleManualCert, handleValidationError)}>
              <SubTitle>Geração Manual (Bypass)</SubTitle>
              <Area style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                <InputContainer>
                  <h3>E-mail do Inscrito</h3>
                  <input type="email" placeholder="aluno@email.com" {...regCert("email")} />
                </InputContainer>
                <InputContainer>
                  <h3>Frequência (%)</h3>
                  <input type="number" placeholder="100" min="1" max="100" {...regCert("attendance")} />
                </InputContainer>
              </Area>
              <SendButton type="submit" style={{ marginTop: "2rem" }}>
                <span>Gerar Certificado Avulso</span>
                <HiOutlineCheckBadge size="1.2em" />
              </SendButton>
            </form>

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
                        <td style={{ fontFamily: "monospace", color: "#a9a9b2" }}>{cert.id}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center", color: "#a9a9b2" }}>
                        Nenhum certificado emitido.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </TableContainer>
          </AreaContainer>
        )}
      </Container>
    </>
  );
}