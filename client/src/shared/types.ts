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
export type APIResponseType = {
  success: boolean;
  data: APIErrorType | UserType;
};
