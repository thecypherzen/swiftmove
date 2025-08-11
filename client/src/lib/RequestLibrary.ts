import type { LoginFormSubmitType } from "@/components/forms/types";
import type { APIResponseType } from "@/shared/types";
import { QueryClient } from "@tanstack/react-query";
//import { type QueryKey, type QueryFunction } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 5000,
});

//export class APIError extends Error {
//  errno: number;
//  constructor(message: string, errno: number, cause?: APIErrorCause) {
//    super(message, { cause });
//    this.errno = errno;
//  }
//}

/**
 * Make Api Requests
 * @param {APIRequestType}
 * @returns {Promise<APIResponseType>}
 */
export const apiRequest = async ({
  method,
  url,
  ...rest
}: APIRequestType): Promise<APIResponseType> => {
  console.log("rest:", rest);
  try {
    const res = await api({
      method,
      url,
      data: rest?.data ?? {},
      ...rest?.extras,
    });
    console.log(`[${method} REQUEST]: ${url}\nRESPONSE:\n\t`, res);
    return { success: true, data: res?.data };
  } catch (err: any) {
    console.log(err?.code === "ERR_NETWORK");
    const name = err?.code === "ERR_NETWORK" ? "Network Error" : "Error";
    const message =
      err?.message === "Network Error" && err?.code === "ERR_NETWORK"
        ? "Failed to connect. Try again later."
        : err?.message;
    const errno = err?.errno ?? err?.code === "ERR_NETWORK" ? 1 : -1;
    return {
      success: false,
      data: { name, message, errno, cause: err.cause },
    };
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const res = await apiRequest({
          method: "GET",
          url: `/${queryKey.join("/")}`,
        });
        return res;
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export const LoginMutationFn = async (data: LoginFormSubmitType) => {
  const res = await apiRequest({
    method: "POST",
    url: "/auth/login",
    data,
  });
  if (!res.success) {
    throw res.data;
  }
  return res.data;
};

export type APIRequestType = {
  method: "POST" | "GET" | "PUT" | "DELETE";
  url: string;
  data?: Record<string, any>;
  extras?: {
    headers?: Record<string, any>;
    params?: Record<string, any>;
    [key: string]: any;
  };
};

//export type APIErrorType = APIError;
