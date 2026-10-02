"use client";

import React, { useState, useEffect } from "react";
import { HiX, HiOutlineExclamationCircle, HiOutlinePhotograph, HiOutlineCheck } from "react-icons/hi";
import { SDCEdition, CreateEditionInput } from "sdc-admin";
import { createEdition } from "../../../../../../services/projects/editionsService";
import { DEFAULT_SDC_PROJECT_ID } from "../../../../../../services/mocks/sdcMocks";

import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  Form,
  FormGroup,
  Row,
  Label,
  Input,
  InputHint,
  ErrorAlert,
  LogoPreviewContainer,
  ModalFooter,
  SubmitButton,
  CancelButton,
} from "./styles";

interface EditionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newEdition: SDCEdition) => void;
  existingEditions: SDCEdition[];
  projectId?: string;
}

export function EditionFormModal({
  isOpen,
  onClose,
  onSuccess,
  existingEditions,
  projectId,
}: EditionFormModalProps) {
  // Próximo número sugerido
  const highestNumber = existingEditions.length > 0
    ? Math.max(...existingEditions.map((e) => Number(e.number) || 0))
    : 36;
  const suggestedNumber = highestNumber + 1;

  // Estados do formulário
  const [number, setNumber] = useState<string>(String(suggestedNumber));
  const [name, setName] = useState<string>(`Semana da Computação #${suggestedNumber}`);
  const [date, setDate] = useState<string>("");
  const [minimumAttendance, setMinimumAttendance] = useState<number>(75);
  const [logoUrl, setLogoUrl] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Resetar campos quando modal abre
  useEffect(() => {
    if (isOpen) {
      const nextNum = existingEditions.length > 0
        ? Math.max(...existingEditions.map((e) => Number(e.number) || 0)) + 1
        : 37;

      setNumber(String(nextNum));
      setName(`Semana da Computação #${nextNum}`);

      // Data padrão: 30 dias a partir de hoje
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 30);
      setDate(defaultDate.toISOString().split("T")[0]);

      setMinimumAttendance(75);
      setLogoUrl("");
      setError(null);
    }
  }, [isOpen, existingEditions]);

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  // Verificar se o número já existe
  const parsedNumber = Number(number);
  const numberExists = existingEditions.some((e) => Number(e.number) === parsedNumber);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!number || isNaN(parsedNumber) || parsedNumber <= 0) {
      setError("Por favor, informe um número de edição válido.");
      return;
    }

    if (numberExists) {
      setError(`Já existe uma edição cadastrada com o número #${parsedNumber}. Escolha outro número.`);
      return;
    }

    if (!date) {
      setError("A data de realização do evento é obrigatória.");
      return;
    }

    if (minimumAttendance < 0 || minimumAttendance > 100) {
      setError("A presença mínima para certificado deve estar entre 0% e 100%.");
      return;
    }

    // Identificar o projectId
    const effectiveProjectId =
      projectId ||
      existingEditions.find((e) => e.projectId)?.projectId ||
      DEFAULT_SDC_PROJECT_ID;

    setIsLoading(true);
    setError(null);

    try {
      const payload: CreateEditionInput = {
        number: parsedNumber,
        name: name.trim() || `Semana da Computação #${parsedNumber}`,
        date: new Date(`${date}T08:00:00.000Z`).toISOString(),
        minimumAttendance: Number(minimumAttendance),
        logoUrl: logoUrl.trim() || undefined,
        projectId: effectiveProjectId,
      };

      const newEdition = await createEdition(payload);
      onSuccess(newEdition);
      onClose();
    } catch (err: any) {
      console.error("Erro ao criar edição:", err);
      if (err.response?.status === 401) {
        setError(
          "Acesso não autorizado: sua sessão expirou ou você não está autenticado. Acesse /admin/login para entrar novamente."
        );
        return;
      }

      const backendMessage =
        err.response?.data?.message ||
        (Array.isArray(err.response?.data?.message)
          ? err.response.data.message.join(", ")
          : null);

      setError(
        backendMessage ||
          err.message ||
          "Não foi possível criar a edição. Verifique os dados e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Preview de imagem (seja URL direta ou Google Drive)
  let previewUrl = logoUrl.trim();
  if (previewUrl.includes("drive.google.com/file/d/")) {
    const fileId = previewUrl.split("/d/")[1]?.split("/")[0];
    if (fileId) previewUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
  } else if (previewUrl.includes("drive.google.com/uc?id=")) {
    const fileId = new URL(previewUrl).searchParams.get("id");
    if (fileId) previewUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return (
    <ModalOverlay onClick={() => !isLoading && onClose()}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div>
            <h2>Nova Edição da SDC</h2>
            <p>Cadastre uma nova edição da Semana de Computação no sistema.</p>
          </div>
          <CloseButton onClick={() => !isLoading && onClose()} aria-label="Fechar modal">
            <HiX size={20} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          {error && (
            <ErrorAlert>
              <HiOutlineExclamationCircle size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>{error}</div>
            </ErrorAlert>
          )}

          <Row>
            <FormGroup>
              <Label htmlFor="edition-number">
                Número da Edição <span className="required">*</span>
              </Label>
              <Input
                id="edition-number"
                type="number"
                min="1"
                step="1"
                required
                value={number}
                $hasError={numberExists}
                onChange={(e) => {
                  setNumber(e.target.value);
                  const nextVal = e.target.value;
                  if (nextVal && name.startsWith("Semana da Computação #")) {
                    setName(`Semana da Computação #${nextVal}`);
                  }
                }}
                placeholder="Ex: 37"
              />
              {numberExists && (
                <InputHint style={{ color: "#ff8888" }}>
                  A edição #{parsedNumber} já existe no histórico.
                </InputHint>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="edition-date">
                Data do Evento <span className="required">*</span>
              </Label>
              <Input
                id="edition-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormGroup>
          </Row>

          <FormGroup>
            <Label htmlFor="edition-name">
              Nome / Tema da Edição
              <span className="helper">Opcional</span>
            </Label>
            <Input
              id="edition-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Semana da Computação XXXVII - Inteligência Artificial e Sociedade"
            />
            <InputHint>Se não informado, será usado o nome padrão com o número da edição.</InputHint>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="edition-attendance">
              Presença Mínima para Certificado (%)
              <span className="required">*</span>
            </Label>
            <Input
              id="edition-attendance"
              type="number"
              min="0"
              max="100"
              required
              value={minimumAttendance}
              onChange={(e) => setMinimumAttendance(Math.max(0, Math.min(100, Number(e.target.value))))}
              placeholder="75"
            />
            <InputHint>Porcentagem mínima de eventos/aulas assistidas exigida para o certificado geral.</InputHint>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="edition-logo">
              URL da Logo ou Banner
              <span className="helper">Opcional</span>
            </Label>
            <Input
              id="edition-logo"
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://exemplo.com/logo.png ou link do Google Drive"
            />
            <InputHint>Suporta links de imagem diretos e links compartilháveis do Google Drive.</InputHint>

            {previewUrl && (
              <LogoPreviewContainer>
                <img
                  src={previewUrl}
                  alt="Pré-visualização da logo"
                  onError={(e) => {
                    // Se falhar ao carregar, esconde o preview
                    (e.target as HTMLElement).style.display = "none";
                  }}
                  onLoad={(e) => {
                    (e.target as HTMLElement).style.display = "block";
                  }}
                />
                <span>Pré-visualização da logo informada</span>
              </LogoPreviewContainer>
            )}
          </FormGroup>

          <ModalFooter>
            <CancelButton type="button" onClick={onClose} disabled={isLoading}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit" disabled={isLoading} $loading={isLoading}>
              {isLoading ? (
                "Criando edição..."
              ) : (
                <>
                  <HiOutlineCheck size={18} />
                  Criar Edição
                </>
              )}
            </SubmitButton>
          </ModalFooter>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default EditionFormModal;
