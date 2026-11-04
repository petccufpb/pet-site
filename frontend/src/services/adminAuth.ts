import { adminRequest } from "./adminApi";

export interface AdminSession {
  username: string;
}

export async function loginAdmin(username: string, password: string): Promise<void> {
  await adminRequest<{ message: string }>("/auth/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function logoutAdmin(): Promise<void> {
  try {
    await adminRequest<{ message: string }>("/auth/admin/logout", { method: "POST" });
  } catch {
    // O cookie pode já estar inválido/expirado; o logout local acontece de qualquer forma
  }
}

export async function getAdminSession(): Promise<AdminSession> {
  return adminRequest<AdminSession>("/auth/admin/me");
}
