"use client";

import { Member } from "backend";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HiPlus, HiOutlineLogout, HiPencil, HiTrash, HiUser } from "react-icons/hi";

import { getDirectImageLink } from "@utils/googleDrive";

import MemberForm from "./components/MemberForm";
import {
  Container,
  Header,
  TitleArea,
  Button,
  TabSelector,
  Tab,
  MembersTable,
  TableRow,
  TableHeader,
  TableCell,
  Avatar,
  StatusBadge,
  ModalOverlay,
  ModalContent,
  NoData,
} from "./styles";

export default function AdminTimePage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [tutors, setTutors] = useState<Member[]>([]);
  const [activeTab, setActiveTab] = useState<"members" | "tutors">("members");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const [loading, setLoading] = useState(true);

  const checkAuthAndFetchData = async () => {
    const storedToken = localStorage.getItem("pet_admin_auth");
    if (!storedToken) {
      router.push("/admin/login");
      return;
    }
    setToken(storedToken);

    try {
      setLoading(true);
      const membersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/members`);
      const membersData = await membersRes.json();

      const tutorsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/tutors`);
      const tutorsData = await tutorsRes.json();

      setMembers(membersData);
      setTutors(tutorsData);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthAndFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("pet_admin_auth");
    router.push("/admin/login");
  };

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member: Member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleSaveMember = async (payload: any) => {
    if (!token) return;

    const url = editingMember
      ? `${process.env.NEXT_PUBLIC_API_URL}/team/members/${editingMember.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/team/members`;

    const method = editingMember ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Falha ao salvar membro.");
    }

    setIsModalOpen(false);
    setEditingMember(null);
    // Recarregar os dados
    checkAuthAndFetchData();
  };

  const handleToggleActive = async (member: Member) => {
    if (!token) return;
    if (!confirm(`Deseja alterar o status de ${member.name}?`)) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/members/${member.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          isActive: !member.isActive,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao alterar status.");
      }

      checkAuthAndFetchData();
    } catch (err: any) {
      alert(err.message || "Erro de conexão.");
    }
  };

  const handleDeleteMember = async (member: Member) => {
    if (!token) return;
    if (!confirm(`Deseja excluir permanentemente o membro ${member.name}? Esta ação não pode ser desfeita.`))
      return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/members/${member.id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao excluir membro.");
      }

      checkAuthAndFetchData();
    } catch (err: any) {
      alert(err.message || "Erro de conexão.");
    }
  };

  const activeList = activeTab === "members" ? members : tutors;

  return (
    <Container>
      <Header>
        <TitleArea>
          <h1>Gerenciamento do Time</h1>
          <p>Painel Administrativo do PET Computação</p>
        </TitleArea>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button onClick={handleOpenAddModal} primary>
            <HiPlus size={18} />
            <span>Novo Membro</span>
          </Button>
          <Button onClick={handleLogout}>
            <HiOutlineLogout size={18} />
            <span>Sair</span>
          </Button>
        </div>
      </Header>

      <TabSelector>
        <Tab active={activeTab === "members"} onClick={() => setActiveTab("members")}>
          Membros do PET
        </Tab>
        <Tab active={activeTab === "tutors"} onClick={() => setActiveTab("tutors")}>
          Tutores e Fundadores
        </Tab>
      </TabSelector>

      {loading ? (
        <NoData>Carregando membros...</NoData>
      ) : activeList.length === 0 ? (
        <NoData>Nenhum membro cadastrado nesta categoria.</NoData>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <MembersTable>
            <thead>
              <tr>
                <TableHeader>Membro</TableHeader>
                <TableHeader>Tipo</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Redes Sociais</TableHeader>
                <TableHeader style={{ textAlign: "right" }}>Ações</TableHeader>
              </tr>
            </thead>
            <tbody>
              {activeList.map(member => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      {member.photoUrl ? (
                        <Avatar src={getDirectImageLink(member.photoUrl)} alt={member.name} />
                      ) : (
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <HiUser size={20} color="#737380" />
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: 600, color: "#DEE1F4" }}>{member.name}</div>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "#A8A8B3",
                            maxWidth: "250px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {member.about || "Sem biografia."}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {member.type === "founder"
                      ? "Fundador"
                      : member.type === "tutor"
                      ? "Tutor"
                      : member.type === "decano"
                      ? "Decano"
                      : "Membro Regular"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      active={member.isActive}
                      onClick={() => handleToggleActive(member)}
                      title="Clique para alternar o status"
                    >
                      {member.isActive ? "Ativo" : "Inativo"}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {member.contactInfo?.map((sns: any) => (
                        <span
                          key={sns.id}
                          style={{
                            fontSize: "0.75rem",
                            background: "rgba(56, 188, 222, 0.1)",
                            color: "#38BCDE",
                            padding: "0.2rem 0.4rem",
                            borderRadius: "4px",
                          }}
                        >
                          {sns.name}: {sns.snsId}
                        </span>
                      ))}
                      {(!member.contactInfo || member.contactInfo.length === 0) && (
                        <span style={{ fontSize: "0.8rem", color: "#505057" }}>Nenhuma</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                      <button
                        onClick={() => handleOpenEditModal(member)}
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "none",
                          borderRadius: "4px",
                          padding: "0.4rem",
                          color: "#38BCDE",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background 0.2s",
                        }}
                        title="Editar"
                      >
                        <HiPencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member)}
                        style={{
                          background: "rgba(206, 74, 74, 0.1)",
                          border: "none",
                          borderRadius: "4px",
                          padding: "0.4rem",
                          color: "#CE4A4A",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background 0.2s",
                        }}
                        title="Excluir"
                      >
                        <HiTrash size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </MembersTable>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <MemberForm
              member={editingMember}
              onSave={handleSaveMember}
              onCancel={() => setIsModalOpen(false)}
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
