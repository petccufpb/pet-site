"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { z } from "zod";

import { ApiError } from "@services/adminApi";
import { loginAdmin } from "@services/adminAuth";

import {
  Container,
  ErrorMessage,
  FieldError,
  FormContainer,
  Input,
  InputGroup,
  Label,
  SubmitButton,
} from "./styles";

const loginFormSchema = z.object({
  username: z.string().trim().min(1, "Informe o usuário"),
  password: z.string().min(1, "Informe a senha"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

/** Redireciona apenas para rotas administrativas, evitando open redirect. */
function getSafeNextPath(): string {
  const nextPath = new URLSearchParams(window.location.search).get("next");

  if (
    !nextPath ||
    !nextPath.startsWith("/admin") ||
    nextPath.startsWith("//") ||
    nextPath.startsWith("/admin/login")
  ) {
    return "/admin";
  }

  return nextPath;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: "", password: "" },
  });

  const handleLogin = handleSubmit(async data => {
    setError(null);

    try {
      await loginAdmin(data.username, data.password);

      const nextPath = getSafeNextPath();

      // Recarrega a página para que o shell administrativo valide a nova sessão
      if (nextPath === "/admin") {
        window.location.assign("/admin");
      } else {
        router.replace(nextPath);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro de conexão com o servidor.");
    }
  });

  return (
    <Container>
      <FormContainer onSubmit={handleLogin} noValidate>
        <div className="header">
          <HiOutlineLockClosed size={48} aria-hidden="true" />
          <h1>PET Computação</h1>
          <p>Acesso administrativo</p>
        </div>

        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}

        <InputGroup>
          <Label htmlFor="username">Usuário</Label>
          <Input
            id="username"
            type="text"
            autoComplete="username"
            $hasError={!!errors.username}
            aria-invalid={!!errors.username}
            placeholder="Digite seu usuário"
            autoFocus
            {...register("username")}
          />
          {errors.username && <FieldError role="alert">{errors.username.message}</FieldError>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            $hasError={!!errors.password}
            aria-invalid={!!errors.password}
            placeholder="Digite sua senha"
            {...register("password")}
          />
          {errors.password && <FieldError role="alert">{errors.password.message}</FieldError>}
        </InputGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </SubmitButton>
      </FormContainer>
    </Container>
  );
}
