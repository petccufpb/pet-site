"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Member } from "backend";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineXMark } from "react-icons/hi2";
import { toast } from "react-toastify";
import { z } from "zod";

import { ApiError } from "@services/adminApi";
import { createMember, MemberPayload, updateMember } from "@services/members";

import {
  AddContactButton,
  Backdrop,
  CheckboxRow,
  CloseButton,
  ContactRow,
  ContactsHeader,
  ContactsHeaderTitle,
  ContactsSection,
  Field,
  FieldError,
  FieldLabel,
  FieldRow,
  FooterButton,
  FormError,
  Input,
  Modal,
  ModalFooter,
  ModalHeader,
  RemoveContactButton,
  Select,
  Textarea,
} from "./styles";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome do contato"),
  snsId: z.string().trim().min(1, "Informe o usuário ou identificador"),
});

const memberFormSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome do membro"),
  about: z
    .string()
    .trim()
    .max(2000, "A descrição pode ter no máximo 2000 caracteres")
    .optional()
    .transform(value => (value ? value : undefined)),
  photoUrl: z
    .string()
    .trim()
    .optional()
    .refine(value => !value || z.string().url().safeParse(value).success, {
      message: "Informe uma URL válida (começando com http:// ou https://)",
    })
    .transform(value => (value ? value : undefined)),
  type: z.union([z.enum(["decano", "founder", "tutor"]), z.literal("")]).optional(),
  isActive: z.boolean(),
  contactInfo: z.array(contactSchema),
});

type MemberFormData = z.infer<typeof memberFormSchema>;

interface MemberFormModalProps {
  /** `null` indica criação de um novo membro */
  member: Member | null;
  onRequestClose: () => void;
  /** Chamado após um salvamento bem-sucedido (a lista é recarregada pelo pai) */
  onSaved: () => void;
}

export default function MemberFormModal({ member, onRequestClose, onSaved }: MemberFormModalProps) {
  const isEditing = member !== null;

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name: member?.name ?? "",
      about: member?.about ?? "",
      photoUrl: member?.photoUrl ?? "",
      type: (member?.type as MemberFormData["type"]) ?? "",
      isActive: member?.isActive ?? true,
      contactInfo: (member?.contactInfo ?? []).map(contact => ({
        name: contact.name,
        snsId: contact.snsId,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "contactInfo" });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onRequestClose();
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onRequestClose]);

  const handleSave = handleSubmit(async data => {
    const payload: MemberPayload = {
      name: data.name,
      about: data.about,
      photoUrl: data.photoUrl,
      type: data.type || null,
      isActive: data.isActive,
      contactInfo: data.contactInfo,
    };

    try {
      if (isEditing) {
        await updateMember(member.id, payload);
      } else {
        await createMember(payload);
      }

      toast.success(isEditing ? "Membro atualizado com sucesso!" : "Membro cadastrado com sucesso!");
      onSaved();
    } catch (err) {
      if (err instanceof ApiError) {
        const fieldEntries = err.fields ? Object.entries(err.fields) : [];

        for (const [field, message] of fieldEntries) {
          if (field === "contactInfo") {
            setError("contactInfo", { message });
          } else {
            setError(field as keyof MemberFormData, { type: "server", message });
          }
        }

        if (fieldEntries.length === 0) {
          setError("root", { message: err.message });
        }
      } else {
        setError("root", { message: "Erro inesperado ao salvar o membro. Tente novamente." });
      }
    }
  });

  return (
    <Backdrop
      onMouseDown={event => {
        if (event.target === event.currentTarget) onRequestClose();
      }}
    >
      <Modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-form-title"
        onMouseDown={event => event.stopPropagation()}
      >
        <ModalHeader>
          <div>
            <h2 id="member-form-title">{isEditing ? "Editar membro" : "Novo membro"}</h2>
            <p>
              {isEditing
                ? "Atualize os dados cadastrais e os contatos deste membro."
                : "Preencha os dados para cadastrar um novo membro da equipe."}
            </p>
          </div>

          <CloseButton type="button" onClick={onRequestClose} aria-label="Fechar formulário">
            <HiOutlineXMark size={20} />
          </CloseButton>
        </ModalHeader>

        {errors.root?.message && <FormError role="alert">{errors.root.message}</FormError>}

        <form onSubmit={handleSave} noValidate>
          <Field>
            <FieldLabel htmlFor="member-name">
              Nome <span>*</span>
            </FieldLabel>
            <Input
              id="member-name"
              type="text"
              autoFocus
              $hasError={!!errors.name}
              placeholder="Nome completo"
              {...register("name")}
            />
            {errors.name && <FieldError role="alert">{errors.name.message}</FieldError>}
          </Field>

          <FieldRow>
            <Field>
              <FieldLabel htmlFor="member-type">Tipo</FieldLabel>
              <Select id="member-type" $hasError={!!errors.type} {...register("type")}>
                <option value="">Membro (sem tipo)</option>
                <option value="decano">Decano</option>
                <option value="founder">Fundador</option>
                <option value="tutor">Tutor</option>
              </Select>
              {errors.type && <FieldError role="alert">{errors.type.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="member-photo">URL da foto</FieldLabel>
              <Input
                id="member-photo"
                type="url"
                placeholder="https://..."
                $hasError={!!errors.photoUrl}
                {...register("photoUrl")}
              />
              {errors.photoUrl && <FieldError role="alert">{errors.photoUrl.message}</FieldError>}
            </Field>
          </FieldRow>

          <Field>
            <FieldLabel htmlFor="member-about">Sobre</FieldLabel>
            <Textarea
              id="member-about"
              placeholder="Breve descrição sobre o membro, sua atuação no PET, etc."
              $hasError={!!errors.about}
              {...register("about")}
            />
            {errors.about && <FieldError role="alert">{errors.about.message}</FieldError>}
          </Field>

          <ContactsSection>
            <ContactsHeader>
              <ContactsHeaderTitle>Redes sociais / contatos</ContactsHeaderTitle>
              <AddContactButton
                type="button"
                onClick={() => append({ name: "", snsId: "" })}
                aria-label="Adicionar novo contato"
              >
                <HiOutlinePlus size={14} />
                Adicionar
              </AddContactButton>
            </ContactsHeader>

            {fields.length === 0 && (
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#737380", fontFamily: "Inter Variable" }}>
                Nenhum contato adicionado.
              </p>
            )}

            {fields.map((field, index) => (
              <div key={field.id}>
                <ContactRow>
                  <div>
                    <Input
                      type="text"
                      placeholder="Ex.: Instagram"
                      aria-label={`Nome do contato ${index + 1}`}
                      $hasError={!!errors.contactInfo?.[index]?.name}
                      {...register(`contactInfo.${index}.name`)}
                    />
                    {errors.contactInfo?.[index]?.name && (
                      <FieldError role="alert">{errors.contactInfo[index]?.name?.message}</FieldError>
                    )}
                  </div>

                  <div>
                    <Input
                      type="text"
                      placeholder="Ex.: @petcomputacao"
                      aria-label={`Identificador do contato ${index + 1}`}
                      $hasError={!!errors.contactInfo?.[index]?.snsId}
                      {...register(`contactInfo.${index}.snsId`)}
                    />
                    {errors.contactInfo?.[index]?.snsId && (
                      <FieldError role="alert">{errors.contactInfo[index]?.snsId?.message}</FieldError>
                    )}
                  </div>

                  <RemoveContactButton
                    type="button"
                    onClick={() => remove(index)}
                    aria-label={`Remover contato ${index + 1}`}
                  >
                    <HiOutlineTrash size={18} />
                  </RemoveContactButton>
                </ContactRow>

                {index < fields.length - 1 && <div style={{ height: "0.6rem" }} />}
              </div>
            ))}

            {errors.contactInfo?.message && (
              <FieldError role="alert">{errors.contactInfo.message}</FieldError>
            )}
          </ContactsSection>

          <CheckboxRow>
            <input type="checkbox" {...register("isActive")} />
            <span>Membro ativo (exibido publicamente)</span>
          </CheckboxRow>

          <ModalFooter>
            <FooterButton type="button" onClick={onRequestClose} disabled={isSubmitting}>
              Cancelar
            </FooterButton>
            <FooterButton type="submit" $variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : isEditing ? "Salvar alterações" : "Cadastrar membro"}
            </FooterButton>
          </ModalFooter>
        </form>
      </Modal>
    </Backdrop>
  );
}
