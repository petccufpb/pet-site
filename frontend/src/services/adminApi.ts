export class ApiError extends Error {
  status: number;

  fields?: Record<string, string>;

  constructor(message: string, status: number, fields?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }
}

interface BackendErrorBody {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

const FIELD_NAMES = ["name", "about", "photoUrl", "type", "isActive", "contactInfo"];

function parseValidationFields(message: string | string[]): Record<string, string> | undefined {
  const messages = Array.isArray(message) ? message : [message];
  const fields: Record<string, string> = {};

  for (const currentMessage of messages) {
    const matchedField = FIELD_NAMES.find(field => currentMessage.startsWith(field));

    if (matchedField) {
      fields[matchedField] = currentMessage;
    }
  }

  return Object.keys(fields).length > 0 ? fields : undefined;
}

/**
 * Faz uma requisição autenticada passando pelo proxy do Next.js
 * (`/api/proxy`), garantindo que o cookie HttpOnly da sessão de admin
 * seja enviado same-origin.
 */
export async function adminRequest<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`/api/proxy${path}`, {
      credentials: "include",
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
      },
    });
  } catch {
    throw new ApiError("Não foi possível conectar ao servidor. Tente novamente.", 0);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const body = (await response.json().catch(() => null)) as BackendErrorBody | null;

  if (!response.ok) {
    const rawMessage = body?.message ?? "Ocorreu um erro inesperado.";
    const message = Array.isArray(rawMessage) ? rawMessage.join(" ") : rawMessage;

    throw new ApiError(message, response.status, rawMessage ? parseValidationFields(rawMessage) : undefined);
  }

  return body as T;
}
