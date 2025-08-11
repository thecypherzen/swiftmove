import type { Control, FieldPath, FieldValues } from "react-hook-form";

export type LoginFormValuesType = {
  email: string;
  password: string;
};

export type SignupFormValuesType = {
  email: string;
  password: string;
};

export type LoginFormPropsType = {
  disabled: boolean;
  setFormCredentials: React.Dispatch<
    React.SetStateAction<LoginFormSubmitType | null>
  >;
  className?: string;
};

export type SignupFormPropsType = {
  disabled: boolean;
  setFormCredentials: React.Dispatch<
    React.SetStateAction<SignupFormSubmitType | null>
  >;
  className?: string;
};

export type LoginFormSubmitType = LoginFormValuesType & {
  role: string;
  cacheData: boolean;
};

export type SignupFormSubmitType = SignupFormValuesType & {
  role: string;
  acceptTerms: boolean;
};

export type FormInputPropsType = {
  placeholder?: string;
  id: string;
  inputType: string;
  description?: string;
  label?: string;
  inputClassName?: string;
  inputWClassName?: string;
  fcClassName?: string;
  fwClassName?: string;
  autocomplete?: string;
  disabled: boolean;
  withElement?: boolean;
  Element?: React.ReactNode;
  reverseLabel?: boolean;
};

export type FormFieldPropsType<T extends FieldValues> = FormInputPropsType & {
  name: FieldPath<T>;
  control: Control<T, any>;
};
