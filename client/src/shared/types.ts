export type BadgeType =
  | "warning"
  | "success"
  | "destructive"
  | "info"
  | "neutral"
  | "default"
  | "dark-destructive";
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

export type PriorityType = "high" | "medium" | "low";

export type ShipmentStatusType =
  | "processing"
  | "in-transit"
  | "delivered"
  | "rejected"
  | "missing"
  | "pending"
  | "lost";

export type ShipmentType = {
  id: string;
  sender: {
    name: string;
    email?: string;
    phone: string;
    address?: string;
    avatar?: string;
  };
  receiver: {
    name: string;
    email?: string;
    phone: string;
    address?: string;
    avatar?: string;
  };
  pickupAddress: string;
  destinationAddress: string;
  priority: PriorityType;
  weight: number;
  status: ShipmentStatusType;
  trackingId: string;
  notes: string | null;
  deliveryDate: Date;
  createdAt: Date;
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

export type WeightUnitType = "Kg" | "Lbs" | "g" | "T";
