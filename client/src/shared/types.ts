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
};
