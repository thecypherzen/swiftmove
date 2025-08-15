export type RegPgImgSecPropsType = {
  id?: string;
  className?: string;
  imgUrl?: string;
};

export type UserType = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: "user" | "admin";
  [key: string]: any;
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

export type APIErrorCause = {
  name: string;
  message: string;
  stack?: string;
  errno?: number;
};
export type APIErrorType = {
  name: string;
  message: string;
  errno: number;
  cause?: APIErrorCause;
};
export type APISuccessType = Array<Record<string, any>>;

export type APIResponseType = {
  success: boolean;
  data: APIErrorType | APISuccessType;
};
