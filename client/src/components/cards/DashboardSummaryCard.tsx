import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardSummaryCard = ({
  loading = false,
  total = 0,
  description,
  action,
  title,
  summary,
  icon,
}: DashSCardType) => {
  return (
    <Card className="gap-1.5">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent className="px-6">
        <div className="flex items-center justify-between">
          <div>
            {loading ? (
              <Skeleton className="h-8 w-16 mt-2" />
            ) : (
              <p className="text-2xl font-bold">{total}</p>
            )}
          </div>
          {icon && (
            <div
              className={cn(
                "size-12 rounded-lg flex items-center justify-center",
                icon.baseColor === ("primary" as AppColorType)
                  ? "bg-primary-100 dark:bg-primary-900"
                  : icon.baseColor === ("success" as AppColorType)
                  ? "bg-success-100 dark:bg-success-900"
                  : icon.baseColor === ("info" as AppColorType)
                  ? "bg-info-100 dark:bg-info-900"
                  : icon.baseColor === ("warning" as AppColorType)
                  ? "bg-warning-100 dark:bg-warning-900"
                  : icon.baseColor === ("destructive" as AppColorType)
                  ? "bg-destructive-100 dark:bg-destructive-900"
                  : "bg-neutral-100 dark:bg-neutral-900"
              )}
            >
              <icon.value
                className={cn(
                  "size-6",
                  icon.baseColor === ("primary" as AppColorType)
                    ? "text-primary-600 dark:text-primary-300"
                    : icon.baseColor === ("success" as AppColorType)
                    ? "text-success-600 dark:text-success-300"
                    : icon.baseColor === ("info" as AppColorType)
                    ? "text-info-600 dark:text-info-300"
                    : icon.baseColor === ("warning" as AppColorType)
                    ? "text-warning-600 dark:text-warning-300"
                    : icon.baseColor === ("destructive" as AppColorType)
                    ? "text-destructive-600 dark:text-destructive-300"
                    : "text-neutral-600 dark:text-neutral-300"
                )}
              />
            </div>
          )}
        </div>
      </CardContent>
      {summary && (
        <CardFooter>
          <p
            className={cn(
              "text-xs mt-1",
              summary.color === "primary"
                ? "text-primary-600"
                : summary.color === "success"
                ? "text-success-600"
                : summary.color === "warning"
                ? "text-warning-500"
                : summary.color === "destructive"
                ? "text-destructive-500"
                : summary.color === "info"
                ? "text-info-600"
                : "text-neutral-600"
            )}
          >
            {summary.text}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export type AppColorType =
  | "success"
  | "destructive"
  | "warning"
  | "neutral"
  | "info"
  | "primary";
export type SummaryDataType = {
  text: string;
  color: AppColorType;
};

export type SummaryIconType = {
  value: LucideIcon;
  baseColor: AppColorType;
};

export type DashSCardType = {
  title: string;
  summary?: SummaryDataType;
  loading?: boolean;
  total?: number;
  description?: string;
  action?: React.ReactNode | string;
  icon?: SummaryIconType;
};
export default DashboardSummaryCard;
