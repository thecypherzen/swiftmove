import type { Control, FieldPath, FieldValues } from "react-hook-form";

export type LoginFormValuesType = {
  email: string;
  password: string;
};

export type LoginFormPropsType = {
  disabled: boolean;
  setFormCredentials: React.Dispatch<
    React.SetStateAction<LoginFormValuesType | null>
  >;
  className?: string;
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
