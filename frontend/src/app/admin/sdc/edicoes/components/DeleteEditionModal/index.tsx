"use client";

import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import { HiTrash, HiOutlineExclamationTriangle } from "react-icons/hi2";
import { SDCEdition } from "sdc-admin";
import { deleteEdition } from "../../../../../../services/projects/editionsService";

import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  ContentBody,
  DangerBanner,
  TargetEditionCard,
  ValidationStep,
  CheckboxGroup,
  ConfirmInput,
  ErrorAlert,
  ModalFooter,
  DeleteButton,
  CancelButton,
} from "./styles";

interface DeleteEditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void> | void;
  edition: SDCEdition | null;
}

export function DeleteEditionModal({
  isOpen,
  onClose,
  onSuccess,
  edition,
}: DeleteEditionModalProps) {
  // Validação Dupla:
  // 1) Checkbox de confirmação de ciência do impacto
  const [hasAcknowledged, setHasAcknowledged] = useState<boolean>(false);
  // 2) Digitação exata do número da edição
  const [typedConfirmation, setTypedConfirmation] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Resetar estados quando abrir
  useEffect(() => {
    if (isOpen) {
      setHasAcknowledged(false);
      setTypedConfirmation("");
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen, edition]);

  // Fechar com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen || !edition) return null;

  const expectedMatch = String(edition.number);
  const isMatchValid = typedConfirmation.trim() === expectedMatch;
  const isDoubleValidated = hasAcknowledged && isMatchValid;

  const handleDelete = async () => {
    if (!isDoubleValidated || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      await deleteEdition(edition.id);
      await onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Erro ao excluir edição:", err);
      if (err.response?.status === 401) {
        setError("Sua sessão expirou ou você não tem permissão de administrador. Faça login em /admin/login.");
      } else {
        const backendMessage =
          err.response?.data?.message ||
          (Array.isArray(err.response?.data?.message)
            ? err.response.data.message.join(", ")
            : null);

        setError(backendMessage || err.message || "Não foi possível excluir a edição.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={() => !isLoading && onClose()}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div className="title-group">
            <div className="icon-badge">
              <HiOutlineExclamationTriangle size={24} />
            </div>
            <div>
              <h2>Excluir Edição da SDC</h2>
              <p>Ação destrutiva e irreversível</p>
            </div>
          </div>
          <CloseButton onClick={() => !isLoading && onClose()} aria-label="Fechar modal">
            <HiX size={20} />
          </CloseButton>
        </ModalHeader>

        <ContentBody>
          {error && <ErrorAlert>{error}</ErrorAlert>}

          <DangerBanner>
            <div className="banner-header">
              <HiOutlineExclamationTriangle size={18} />
              <span>Zona de Perigo</span>
            </div>
            <p>
              Ao excluir esta edição, <strong>todos os eventos, atividades, inscrições, presenças e certificados</strong> associados a ela serão removidos permanentemente do banco de dados.
            </p>
          </DangerBanner>

          <TargetEditionCard>
            <div className="edition-info">
              <div className="num">Edição #{edition.number}</div>
              <div className="name">{edition.name || `Semana da Computação #${edition.number}`}</div>
            </div>
            <div className="events-count">
              {edition.events?.length ?? 0} evento(s) vinculado(s)
            </div>
          </TargetEditionCard>

          {/* Validação 1: Ciência explícita do impacto destrutivo */}
          <ValidationStep>
            <CheckboxGroup>
              <input
                type="checkbox"
                checked={hasAcknowledged}
                onChange={(e) => setHasAcknowledged(e.target.checked)}
                disabled={isLoading}
              />
              <span>
                <strong>Validação 1:</strong> Compreendo que esta ação não pode ser desfeita e que todos os dados relacionados a esta edição serão apagados.
              </span>
            </CheckboxGroup>
          </ValidationStep>

          {/* Validação 2: Confirmação por digitação */}
          <ValidationStep>
            <label className="step-label" htmlFor="confirmation-input">
              <strong>Validação 2:</strong> Para confirmar, digite o número da edição: <strong>{expectedMatch}</strong>
            </label>
            <ConfirmInput
              id="confirmation-input"
              type="text"
              placeholder={`Digite ${expectedMatch} para confirmar`}
              value={typedConfirmation}
              onChange={(e) => setTypedConfirmation(e.target.value)}
              $valid={isMatchValid}
              disabled={isLoading}
              autoComplete="off"
            />
          </ValidationStep>
        </ContentBody>

        <ModalFooter>
          <CancelButton type="button" onClick={onClose} disabled={isLoading}>
            Cancelar
          </CancelButton>
          <DeleteButton
            type="button"
            onClick={handleDelete}
            disabled={!isDoubleValidated || isLoading}
            $enabled={isDoubleValidated && !isLoading}
          >
            <HiTrash size={17} />
            {isLoading ? "Excluindo edição..." : "Excluir Definitivamente"}
          </DeleteButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default DeleteEditionModal;
