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
  role?: "user" | "admin" | "driver";
  [key: string]: any;
};

export type ShipmentType = {
  id: string;
  owner: {
    name: string;
    email: string;
    avatar?: string;
  };
  pickupAddress: string;
  destinationAddress: string;
  priority: string;
  weight: number;
  status: string;
  notes: string | null;
  deliveryDate: Date;
  createdAt?: Date;
};

export type DriverType = {
  profile: UserType;
  licenseNumber: string;
  status: DriverStatusType;
  createdAt?: Date;
};

export type DriverStatusType = "available" | "busy" | "inactive";

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
