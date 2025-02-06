import Cookies from "js-cookie";
import { ResponseData } from "./interfaces";
import { AUTH_LOGIN_ENDPOINT } from "./auth/endpoints";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const getAuthToken = () => Cookies.get("token");

const handleAuthError = (endpoint: string) => {
  if (endpoint !== AUTH_LOGIN_ENDPOINT) {
    Cookies.remove("token");
    window.location.href = "/login";
  }
  return { success: false, message: "Sessão expirada. Faça login novamente." };
};

export const fetchAPI = async <T>(
  endpoint: string,
  method: string = "GET",
  body?: object
): Promise<ResponseData<T>> => {
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    const data: ResponseData<T> = response.status !== 204 
      ? await response.json().catch(() => ({})) 
      : {};

    if (!response.ok) {
      if (response.status === 401) {
        return handleAuthError(endpoint);
      }
      return { success: false, errors: data.errors || {}, message: data.message || "Ocorreu um erro." };
    }

    return { success: true, data: data.data, message: data.message || "Sucesso." };
  } catch (error) {
    return { success: false, message: "Ocorreu um erro na requisição." };
  }
};
