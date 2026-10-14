"use client";

import React, { useState, useEffect } from "react";
import { HiX, HiOutlineUserAdd, HiOutlineCheck, HiOutlineExclamationCircle } from "react-icons/hi";
import { SDCSpeaker } from "sdc-admin";
import { createSpeaker } from "../../../../../../services/projects/speakersService";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  InputHint,
  ErrorAlert,
  ModalFooter,
  SubmitButton,
  CancelButton,
} from "./styles";

interface CreateSpeakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newSpeaker: SDCSpeaker) => void;
}

export function CreateSpeakerModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateSpeakerModalProps) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAbout("");
      setPhotoUrl("");
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("O nome do palestrante é obrigatório.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newSpeaker = await createSpeaker({
        name: name.trim(),
        about: about.trim() || undefined,
        photoUrl: photoUrl.trim() || undefined,
      });

      onSuccess(newSpeaker);
      onClose();
    } catch (err: any) {
      console.error("Erro ao criar palestrante:", err);

      if (err.response?.status === 401) {
        setError("Sessão expirada ou não autenticada. Acesse /admin/login para autenticar-se como administrador.");
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
          "Não foi possível cadastrar o palestrante. Verifique os dados e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalOverlay data-lenis-prevent="true" onClick={() => !isLoading && onClose()}>
      <ModalContainer data-lenis-prevent="true" onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div>
            <h2>
              <HiOutlineUserAdd color="#73E5E2" />
              Novo Palestrante
            </h2>
            <p>Cadastre um palestrante ou instrutor para vincular à atividade.</p>
          </div>
          <CloseButton onClick={() => !isLoading && onClose()} aria-label="Fechar modal">
            <HiX size={20} />
          </CloseButton>
        </ModalHeader>

        <Form data-lenis-prevent="true" onSubmit={handleSubmit}>
          {error && (
            <ErrorAlert>
              <HiOutlineExclamationCircle size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>{error}</div>
            </ErrorAlert>
          )}

          <FormGroup>
            <Label htmlFor="speaker-name">
              Nome Completo <span className="required">*</span>
            </Label>
            <Input
              id="speaker-name"
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Prof. Dr. Arnaldo Gualberto"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="speaker-about">
              Sobre / Minibio
              <span className="helper">Opcional</span>
            </Label>
            <TextArea
              id="speaker-about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Ex: Engenheiro de Software sênior, especialista em Sistemas Distribuídos e Cloud Native..."
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="speaker-photo">
              Foto do Palestrante (URL ou ID do Google Drive)
              <span className="helper">Opcional</span>
            </Label>
            <Input
              id="speaker-photo"
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Ex: 1xbXsf7r7eEYb5ZJ... ou https://link-da-imagem.jpg"
            />
            <InputHint>
              Você pode colar o link direto da imagem ou apenas o ID do arquivo hospedado no Google Drive.
            </InputHint>
          </FormGroup>

          <ModalFooter>
            <CancelButton type="button" onClick={onClose} disabled={isLoading}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit" disabled={isLoading} $loading={isLoading}>
              {isLoading ? (
                "Cadastrando..."
              ) : (
                <>
                  <HiOutlineCheck size={18} />
                  Cadastrar Palestrante
                </>
              )}
            </SubmitButton>
          </ModalFooter>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default CreateSpeakerModal;
