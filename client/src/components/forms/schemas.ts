import { z } from "zod";
import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
} from "libphonenumber-js";
export const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export const SignupFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export const PhoneNumberSchema = z.string().refine((val) => {
  const p = parsePhoneNumberFromString(val, {
    defaultCountry: "NG",
    defaultCallingCode: "+234",
  });
  return !!p?.isValid();
});

export const AddressSchema = z.string().min(10, "Address too short");

export const NewShipmentFormSchema = z.object({
  senderName: z.string().min(1, "Required"),
  senderEmail: z.email().optional(),
  receierEmail: z.email().optional(),
  senderPhone: PhoneNumberSchema,
  receiverName: z.string().min(1, "Required"),
  pickupAddress: AddressSchema,
  deliveryAddress: AddressSchema,
  priority: z.enum(["high", "low", "normal"]),
  weight: z.number().min(0.01, "Invalid weight"),
  pickupDate: z.iso.datetime(),
  deliveryDate: z.iso.date(),
  notes: z.string().optional(),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
export type SignupFormType = z.infer<typeof SignupFormSchema>;
export type NewShipmentFormType = z.infer<typeof NewShipmentFormSchema>;
