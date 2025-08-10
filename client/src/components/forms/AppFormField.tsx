import {
  FormField,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import type { FormFieldPropsType } from "./types";
import type { FieldValues } from "react-hook-form";

/**
 * @component
 * @name AppFormField
 * @description A form field component factory.
 * @param @type {React.props} React element props
 * @returns {React.ReactElement} A react hook form field
 */
const AppFormField = <T extends FieldValues>({
  fcClassName,
  fwClassName,
  inputClassName,
  inputWClassName,
  control,
  description,
  inputType,
  label,
  name,
  placeholder,
  autocomplete,
  disabled,
  withElement = false,
  Element,
  id,
  reverseLabel,
}: FormFieldPropsType<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem
          className={cn(
            "text-foreground font-medium mb-1",
            fwClassName && fwClassName
          )}
        >
          {!reverseLabel && (
            <FormLabel htmlFor={id} className="text-muted-foreground">
              {label}
            </FormLabel>
          )}
          <FormControl className={cn(fcClassName && fcClassName)}>
            <div className={cn(withElement ? "relative" : "", inputWClassName)}>
              <Input
                id={id}
                placeholder={placeholder}
                {...field}
                type={inputType}
                className={cn(
                  "py-6 [&::placeholder]:text-sm [&::placeholder]:text-muted-foreground/30",
                  inputClassName
                )}
                autoComplete={autocomplete}
                disabled={disabled}
                aria-disabled={disabled}
              />
              {withElement && Element !== undefined && Element}
            </div>
          </FormControl>
          {reverseLabel && (
            <FormLabel htmlFor={id} className="text-muted-foreground">
              {label}
            </FormLabel>
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AppFormField;
