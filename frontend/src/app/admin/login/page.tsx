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

  useEffect(() => {
    // Se o usuário já estiver logado, redireciona para o painel do time
    const token = localStorage.getItem("pet_admin_auth");
    if (token) {
      router.push("/admin/time");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const basicToken = btoa(`${username}:${password}`);
      const authHeader = `Basic ${basicToken}`;

      // Fazer uma requisição de validação para o endpoint de auth-check no backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/members/auth-check`, {
        method: "GET",
        headers: {
          Authorization: authHeader,
        },
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos.");
      }

      // Salva a credencial no localStorage se a verificação tiver sucesso
      localStorage.setItem("pet_admin_auth", authHeader);
      router.push("/admin/time");
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
