import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import type { DriverStatusType } from "@/shared/types";
import { cn } from "@/lib/utils";

const driverStats: DStatSummaryType = {
  available: 0,
  busy: 0,
  inactive: 0,
};

const DriversStatusCard = ({ loading, className }: DStatCardType) => {
  return (
    <Card className={cn("gap-1.5 shadow-none", className)}>
      <CardHeader className="mb-3">
        <CardTitle className="text-xl sm:text-2xl text-foreground">
          Quick&nbsp;Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-8" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Available</span>
              <span className="text-sm font-medium text-green-600">
                {driverStats.available}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Busy</span>
              <span className="text-sm font-medium text-blue-600">
                {driverStats.busy}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Inactive</span>
              <span className="text-sm font-medium text-muted-foreground">
                {driverStats.inactive}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type DStatCardType = {
  loading: boolean;
  className?: string;
};

type DStatSummaryType = Record<DriverStatusType, number>;
export default DriversStatusCard;
