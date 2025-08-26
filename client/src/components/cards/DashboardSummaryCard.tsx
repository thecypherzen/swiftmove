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
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardSummaryCard = ({
  loading = false,
  total = 0,
  description,
  action,
  title,
  summary,
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
          <div className="size-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <Package className="size-6 text-blue-600 dark:text-blue-300" />
          </div>
        </div>
      </CardContent>
      {summary && (
        <CardFooter>
          <p
            className={cn(
              "text-xs mt-1",
              `text-${summary.color}${
                summary.color === "destructive" ? "-500" : "-600"
              }`
            )}
          >
            {summary.text}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export type SummaryDataType = {
  text: string;
  color: "success" | "destructive" | "warning" | "neutral";
};
export type DashSCardType = {
  title: string;
  summary?: SummaryDataType;
  loading?: boolean;
  total?: number;
  description?: string;
  action?: React.ReactNode | string;
};
export default DashboardSummaryCard;
