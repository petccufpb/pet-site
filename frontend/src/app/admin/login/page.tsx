"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HiOutlineLockClosed } from "react-icons/hi2";

import {
  Container,
  FormContainer,
  InputGroup,
  Input,
  Label,
  SubmitButton,
  ErrorMessage,
} from "./styles";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiUrl = "/api/proxy";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Autenticação com cookie HttpOnly First-Party (100% compatível com Edge, Chrome e Safari)
      const response = await fetch(`${apiUrl}/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Usuário ou senha inválidos.");
      }

      window.location.href = "/admin/time";
    } catch (err: any) {
      setError(err.message || "Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <div className="header">
          <HiOutlineLockClosed size={48} />
          <h1>PET Computação</h1>
          <p>Acesso Administrativo</p>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <InputGroup>
          <Label htmlFor="username">Usuário</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </InputGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </SubmitButton>
      </FormContainer>
    </Container>
  );
}
