import React from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

/**
 * A Form's Section component
 * Wraps a form's section content in a section with
 * a label, creating a visual group of form data.
 * @function FormSection
 * @param {FormSectionPropsType} props Props received
 * @returns {React.ReactNode} A react node
 */
const FormSection = ({
  children,
  labelFor,
  name,
  label,
  className,
}: FormSectionPropsType) => {
  const now = Date.now();
  const id = `${name}-${now}`;
  return (
    <div
      className={cn(
        "border-1 border-muted rounded-md p-3 pt-4 relative",
        className
      )}
      id={id}
    >
      <Label
        htmlFor={labelFor ?? id}
        className="absolute -top-2 left-1 text-xs text-muted-foreground/50"
      >
        <span className="bg-background px-2">{label}</span>
      </Label>
      {children}
    </div>
  );
};

export type FormSectionPropsType = {
  children: React.ReactNode;
  name: string;
  label: string;
  labelFor?: string;
  className?: string;
};

export default FormSection;
