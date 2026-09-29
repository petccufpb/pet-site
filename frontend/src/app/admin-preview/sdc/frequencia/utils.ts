import { isAxiosError } from "axios";

export function getApiError(err: unknown): { message?: string; status?: number } {
  if (isAxiosError(err)) {
    return {
      message: err.response?.data?.message,
      status: err.response?.status,
    };
  }

  return {};
}
