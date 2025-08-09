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
  inputClassName,
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
}: FormFieldPropsType<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-neutral-800 font-medium mb-1">
            {label}
          </FormLabel>
          <FormControl>
            <div className={withElement ? "relative" : ""}>
              <Input
                placeholder={placeholder}
                {...field}
                type={inputType}
                className={cn(
                  "py-6 [&::placeholder]:text-sm [&::placeholder]:text-neutral-300",
                  inputClassName
                )}
                autoComplete={autocomplete}
                disabled={disabled}
                aria-disabled={disabled}
              />
              {withElement && Element && Element}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AppFormField;
