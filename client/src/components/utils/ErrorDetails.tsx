import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ErrorDetails = ({ error, errorInfo }: ErrorDetailsPropsType) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {}, [value]);
  return (
    <Accordion type="single" collapsible onValueChange={setValue}>
      <AccordionItem value="details">
        <AccordionTrigger>{`${
          value ? "Hide" : "Show"
        } Details`}</AccordionTrigger>
        <AccordionContent className="min-h-[100px] overflow-y-auto bg-muted rounded-lg">
          <div className="p-3 wrap-anywhere text-wrap flex flex-col gap-3">
            {<h4 className="font-bold text-md">{error?.name ?? "Error"}</h4>}
            {errorInfo && <p>{errorInfo.componentStack}</p>}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

type ErrorDetailsPropsType = {
  error: Error;
  errorInfo?: React.ErrorInfo;
};
export default ErrorDetails;
