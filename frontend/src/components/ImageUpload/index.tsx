"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import { Actions, Container, Placeholder, Preview, RemoveButton, UploadButton } from "./styles";

export interface ImageUploadProps {
  label?: string;
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
  externalPreviewUrl?: string | null;
}

export function ImageUpload({
  label = "Imagem",
  value,
  onChange,
  accept = "image/*",
  disabled = false,
  externalPreviewUrl,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    if (externalPreviewUrl) {
      setPreviewUrl(externalPreviewUrl);
      return;
    }

    setPreviewUrl(null);
  }, [value, externalPreviewUrl]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    onChange(nextFile);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Container>
      <label>{label}</label>

      <Preview hasPreview={!!previewUrl}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={label}
            referrerPolicy="no-referrer"
            onError={() => {
              setPreviewUrl(null);
            }}
          />
        ) : (
          <Placeholder>Selecionar imagem</Placeholder>
        )}
      </Preview>

      <Actions>
        <UploadButton type="button" onClick={() => inputRef.current?.click()} disabled={disabled}>
          Escolher arquivo
        </UploadButton>

        {value && (
          <RemoveButton type="button" onClick={() => onChange(null)} disabled={disabled}>
            Remover
          </RemoveButton>
        )}
      </Actions>

      <input ref={inputRef} type="file" accept={accept} hidden onChange={handleChange} />
    </Container>
  );
}
