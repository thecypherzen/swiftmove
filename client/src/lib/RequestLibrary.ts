import type {
  LoginFormSubmitType,
  SignupFormSubmitType,
} from "@/components/forms/types";
import type {
  APIErrorType,
  APIRequestType,
  APIResponseType,
  APISuccessType,
  UserType,
} from "@/shared/types";
import { QueryClient } from "@tanstack/react-query";
//import { type QueryKey, type QueryFunction } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/${
    import.meta.env.VITE_API_VERSION
  }`,
  withCredentials: true,
  timeout: 5000,
});

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
  try {
    const res = await api({
      method,
      url,
      data: rest?.data ?? {},
      ...rest?.extras,
    });
    console.log(`[${method} REQUEST]: ${url}\nRESPONSE:\n\t`, res);
    return { success: true, data: res?.data.payload };
  } catch (err: any) {
    let name, errno, message;
    console.error(`[${method} REQUEST]: ${url}\nRESPONSE:\n\t`, err);
    switch (err.code) {
      case "ERR_NETWORK":
        name = "Network Error";
        errno = 1;
        switch (err.status) {
          case undefined:
            name = "Request denied";
            message = "You're not allowed. Report this error";
            errno = -1;
            break;
          default:
            message = "Failed to connect. Try again later";
            break;
        }
        break;
      case "ECONNABORTED":
        name = "Error";
        message = "Server took too long to respond. Try again later";
        errno = 2;
        break;
      default:
        name = "Error";
        switch (err.name) {
          case "AxiosError":
            errno = -1;
            message = "Failed to connect to the server. Try again later";
            break;
          default:
            message = err.desc;
            break;
        }
        try {
          errno = parseInt(err.response.data.errno);
        } catch (_) {
          errno = parseInt(err.response.data.errno.slice(1));
        }
        console.log("errno", errno);
        break;
    }
    return {
      success: false,
      data: { name, message, errno, cause: err.cause },
    };
  }
};

/**
 * QueryClient
 * @typedef {typeof QueryClient} QueryClientType
 */
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

/**
 * @function LoginMutationFn - Login handler using Tanstack Query
 * @param data
 * @returns {object}
 */
export const LoginMutationFn = async (
  data: LoginFormSubmitType
): Promise<UserType> => {
  const res = await apiRequest({
    method: "POST",
    url: "/auth/login",
    data,
  });
  if (!res.success) {
    throw res.data as APIErrorType;
  }
  return (res.data as APISuccessType)[0] as UserType;
};

/**
 * @function SignupMutationFn - Signup handler using Tanstack Query
 * @param data
 * @returns {object}
 */
export const SignupMutationFn = async (data: SignupFormSubmitType) => {
  const res = await apiRequest({
    method: "POST",
    url: "/auth/register",
    data,
  });
  if (!res.success) {
    console.error(res.data);
    throw res.data;
  }
  console.log(res.data);
  return res.data;
};

/**
 * @function SignupMutationFn - Signup handler using Tanstack Query
 * @param { objet } data
 * @returns { object }
 */
export const NewShipmentMutationFn = async (data: Record<string, any>) => {
  const res = await apiRequest({
    method: "POST",
    url: "/shipments",
    data,
  });
  if (!res.success) {
    console.error(res.data);
    throw res.data;
  }
  console.log(res.data);
  return res.data;
};

//export type
