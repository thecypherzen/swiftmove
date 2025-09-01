import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  PriorityType,
  ShipmentStatusType,
  WeightUnitType,
} from "@/shared/types";
import { CornerDownLeft } from "lucide-react";

export const StatusDataCell = ({ value, className }: StatusDataCellType) => (
  <Badge
    className={cn(
      "text-xs text-white/90",
      value === "processing"
        ? "bg-warning-600"
        : value === "in-transit"
        ? "bg-info"
        : value === "delivered"
        ? "bg-success"
        : value === "rejected"
        ? "bg-destructive-700"
        : value === "missing"
        ? "bg-orange-600"
        : value === "pending"
        ? "bg-neutral-400 dark:bg-neutral-600"
        : "bg-primary-700 dark:bg-primary-600",
      className
    )}
  >
    {value}
  </Badge>
);

export const DefaultDataCell = ({ value, className }: BaseDataCellType) => (
  <div className={cn("font-medium text-md", className)}>{`${value}`}</div>
);

export const MultiFieldCell = ({
  data,
  keys,
  className,
}: MultiFieldCellType) => {
  const len = keys?.length;
  return (
    <div className={cn("", className)}>
      {Object.entries(data).map(([key, value], index) => {
        if (keys?.includes(key) || !len)
          return (
            <div
              key={`${key}-${index}`}
              className={
                !index
                  ? "font-medium text-md"
                  : "font-normal text-sm text-muted-foreground"
              }
            >{`${value}`}</div>
          );
      })}
    </div>
  );
};

export const PriorityDataCell = ({
  value,
  className,
}: PriorityDataCellType) => (
  <Badge
    className={cn(
      "text-xs text-white/90",
      value === "high"
        ? "bg-purple-800"
        : value === "medium"
        ? "bg-purple-400"
        : value === "low"
        ? "bg-purple-100 dark:bg-purple-200 text-purple-950"
        : "bg-primary-700 dark:bg-primary-600",
      className
    )}
  >
    {value}
  </Badge>
);

export const RouteCell = ({ data, className }: RouteCellType) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span>
        <span className="font-semibold inline-flex flex-col items-center justify-center bg-muted-foreground/20 dark:bg-muted rounded-full text-muted size-2"></span>
        &nbsp;
        <span>{data.from}</span>
      </span>
      <span className="inline-flex gap-0.1 items-start">
        <span className="font-semibold">
          <CornerDownLeft className="size-6 transform -scale-x-100 text-muted-foreground/20 dark:text-muted" />
        </span>
        &nbsp;
        <span className="text-wrap mt-[2px]">{data.to}</span>
      </span>
    </div>
  );
};

export const WeightDataCell = ({ data, className }: WeightDataCellType) => (
  <DefaultDataCell value={`${data.value}${data.unit}`} className={className} />
);

type BaseDataCellType = {
  className?: string;
  value?: string | number;
};

type StatusDataCellType = Omit<BaseDataCellType, "value"> & {
  value: ShipmentStatusType;
};

type MultiFieldCellType = {
  data: Record<string, string | number>;
  keys?: string[];
  className?: string;
};

type PriorityDataCellType = Omit<BaseDataCellType, "value"> & {
  value: PriorityType;
};

type RouteCellType = Omit<BaseDataCellType, "value"> & {
  data: { from: string; to: string };
};

type WeightDataCellType = Omit<BaseDataCellType, "value"> & {
  data: { value: number; unit: WeightUnitType };
};
