import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BadgeType, WeightUnitType } from "@/shared/types";
import { CornerDownLeft } from "lucide-react";

export const BadgeDataCell = ({ data, className }: BadgeDataCellType) => (
  <Badge
    className={cn(
      "text-xs text-white/90",
      data.type === "destructive"
        ? "bg-destructive-700"
        : data.type === "info"
        ? "bg-info"
        : data.type === "warning"
        ? "bg-warning-600"
        : data.type === "dark-destructive"
        ? "bg-destructive-700"
        : data.type === "success"
        ? "bg-success-600 dark:bg-success-700"
        : data.type === "neutral"
        ? "bg-neutral-400 dark:bg-neutral-600"
        : "bg-primary-700 dark:bg-primary-600",
      className
    )}
  >
    {data.value}
  </Badge>
);

export const DefaultDataCell = ({ value, className }: BaseDataCellType) => (
  <div className={cn("font-medium text-md", className)}>{`${value}`}</div>
);

export const MultiFieldCell = ({
  data,
  keys,
  className,
}: MultiFieldCellType) => (
  <div className={cn("", className)}>
    {Object.entries(data).map(([key, value], index) => {
      if (keys?.includes(key))
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

type BadgeDataCellType = Omit<BaseDataCellType, "value"> & {
  data: { value: string; type: BadgeType };
};

type BaseDataCellType = {
  className?: string;
  value?: string | number;
};

type MultiFieldCellType = {
  data: Record<string, string | number>;
  keys?: string[];
  className?: string;
};

type RouteCellType = Omit<BaseDataCellType, "value"> & {
  data: { from: string; to: string };
};

type WeightDataCellType = Omit<BaseDataCellType, "value"> & {
  data: { value: number; unit: WeightUnitType };
};
