"use client";

import { useState, useEffect } from "react";
import { Member } from "backend";

interface MemberFormProps {
  member?: Member | null;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function MemberForm({ member, onSave, onCancel }: MemberFormProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Social Links
  const [github, setGithub] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (member) {
      setName(member.name || "");
      setType(member.type || "");
      setAbout(member.about || "");
      setPhotoUrl(member.photoUrl || "");
      setIsActive(member.isActive !== false); // default to true

      // Preencher contatos
      const gh = member.contactInfo?.find((c: any) => c.name === "GitHub");
      const ig = member.contactInfo?.find((c: any) => c.name === "Instagram");
      const li = member.contactInfo?.find((c: any) => c.name === "LinkedIn");

      setGithub(gh?.snsId || "");
      setInstagram(ig?.snsId || "");
      setLinkedin(li?.snsId || "");
    } else {
      setName("");
      setType("");
      setAbout("");
      setPhotoUrl("");
      setIsActive(true);
      setGithub("");
      setInstagram("");
      setLinkedin("");
    }
  }, [member]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("O nome é obrigatório.");
      return;
    }

    setLoading(true);
    setError("");

    // Formatar contatos
    const contactInfo = [];
    if (github.trim()) contactInfo.push({ name: "GitHub", snsId: github.trim() });
    if (instagram.trim()) contactInfo.push({ name: "Instagram", snsId: instagram.trim() });
    if (linkedin.trim()) contactInfo.push({ name: "LinkedIn", snsId: linkedin.trim() });

    const payload: any = {
      name: name.trim(),
      about: about.trim() || undefined,
      photoUrl: photoUrl.trim() || undefined,
      type: type || null, // null representa membro regular
      isActive,
      contactInfo,
    };

    try {
      await onSave(payload);
    } catch (err: any) {
      setError(err.message || "Erro ao salvar o membro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        {member ? "Editar Membro" : "Adicionar Novo Membro"}
      </h2>

      {error && (
        <div style={{ padding: "0.75rem", background: "rgba(206, 74, 74, 0.15)", border: "1px solid #CE4A4A", borderRadius: "6px", color: "#ff8888", fontSize: "0.9rem" }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#A8A8B3" }}>Nome Completo</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: João da Silva"
          required
          style={{ background: "rgba(0, 0, 18, 0.4)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "6px", padding: "0.75rem", color: "#DEE1F4", fontSize: "1rem" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#A8A8B3" }}>Tipo de Membro</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ background: "rgba(0, 0, 18, 0.4)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "6px", padding: "0.75rem", color: "#DEE1F4", fontSize: "1rem" }}
          >
            <option value="" style={{ background: "#182240" }}>Membro Regular</option>
            <option value="tutor" style={{ background: "#182240" }}>Tutor</option>
            <option value="founder" style={{ background: "#182240" }}>Fundador</option>
            <option value="decano" style={{ background: "#182240" }}>Decano</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#A8A8B3" }}>Status</label>
          <select
            value={isActive ? "true" : "false"}
            onChange={(e) => setIsActive(e.target.value === "true")}
            style={{ background: "rgba(0, 0, 18, 0.4)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "6px", padding: "0.75rem", color: "#DEE1F4", fontSize: "1rem" }}
          >
            <option value="true" style={{ background: "#182240" }}>Ativo</option>
            <option value="false" style={{ background: "#182240" }}>Inativo (Membro Antigo)</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#A8A8B3" }}>URL da Foto</label>
        <input
          type="text"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Ex: https://drive.google.com/... ou link de imagem"
          style={{ background: "rgba(0, 0, 18, 0.4)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "6px", padding: "0.75rem", color: "#DEE1F4", fontSize: "1rem" }}
        />
        <span style={{ fontSize: "0.75rem", color: "#737380" }}>
          Suporta links diretos ou links compartilháveis do Google Drive.
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#A8A8B3" }}>Sobre / Bio (Opcional)</label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Breve descrição sobre o membro..."
          rows={3}
          style={{ background: "rgba(0, 0, 18, 0.4)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "6px", padding: "0.75rem", color: "#DEE1F4", fontSize: "1rem", resize: "vertical" }}
        />
      </div>

      {/* Redes Sociais */}
      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#DEE1F4" }}>Redes Sociais (Usernames)</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label style={{ fontSize: "0.8rem", color: "#A8A8B3" }}>GitHub</label>
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="Ex: jsilva"
              style={{ background: "rgba(0, 0, 18, 0.4)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "6px", padding: "0.6rem", color: "#DEE1F4", fontSize: "0.9rem" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label style={{ fontSize: "0.8rem", color: "#A8A8B3" }}>Instagram</label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Ex: joao.silva"
              style={{ background: "rgba(0, 0, 18, 0.4)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "6px", padding: "0.6rem", color: "#DEE1F4", fontSize: "0.9rem" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label style={{ fontSize: "0.8rem", color: "#A8A8B3" }}>LinkedIn</label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="Ex: joaosilva"
              style={{ background: "rgba(0, 0, 18, 0.4)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "6px", padding: "0.6rem", color: "#DEE1F4", fontSize: "0.9rem" }}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
        <button
          type="button"
          onClick={onCancel}
          style={{ background: "transparent", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "6px", padding: "0.75rem 1.25rem", color: "#DEE1F4", fontSize: "1rem", cursor: "pointer", transition: "all 0.2s" }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          style={{ background: "#0072ED", border: "none", borderRadius: "6px", padding: "0.75rem 1.5rem", color: "white", fontSize: "1rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}
