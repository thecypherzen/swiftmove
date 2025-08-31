import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BadgeType, WeightUnitType } from "@/shared/types";

export const BadgeDataCell = ({ data, className }: BadgeDataCellType) => (
  <Badge
    variant={data.type === "destructive" ? "destructive" : "default"}
    className={cn("text-sm", className)}
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
        <span className="font-semibold bg-muted-foreground/10 dark:bg-muted py-0.5 px-1 rounded-md">
          From
        </span>
        &nbsp;
        <span>{data.from}</span>
      </span>
      <span>
        <span className="font-semibold bg-muted-foreground/10 dark:bg-muted py-0.5 px-1 rounded-md">
          To
        </span>
        &nbsp;
        <span>{data.to}</span>
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
