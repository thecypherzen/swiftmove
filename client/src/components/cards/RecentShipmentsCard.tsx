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
import { cn, getRandomImageUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { ShipmentType } from "@/shared/types";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const RecentShipmentsCard = ({
  loading = false,
  description,
  action,
  title,
  data,
  footer,
}: RShipmentsCardType) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-3xl text-foreground">
          {title ?? "Recent Shipments"}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <CardAction>
          <Button
            className="cursor-pointer border-1 border-muted"
            variant="ghost"
            asChild
          >
            <Link to="../shipments">{action ?? "View All"}</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-4 p-4 bg-muted/50 dark:bg-muted/20 rounded-lg border-[1px] border-muted/50 dark:border-muted/30"
              >
                <Skeleton className="skeleton-bg size-12 rounded-lg " />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24 skeleton-bg" />
                  <Skeleton className="h-3 w-48 skeleton-bg" />
                </div>
                <Skeleton className="h-6 w-16 skeleton-bg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((shipment) => (
              <div
                key={shipment.id}
                className="flex items-center space-x-4 p-4 bg-muted rounded-lg"
              >
                {/*<div className="size-12 rounded-lg overflow-hidden">

								</div>*/}
                <img
                  src={shipment.owner?.avatar ?? getRandomImageUrl()}
                  alt="Delivery truck"
                  className="size-12 rounded-lg object-cover bg-muted dark:bg-white/90"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{shipment.owner.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {shipment.pickupAddress.split(",")[0]} →{" "}
                    {shipment.destinationAddress.split(",")[0]}
                  </p>
                </div>
                {getStatusBadge(shipment.status)}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {footer && (
        <CardFooter>
          <p className={cn("text-xs mt-1")}>{footer}</p>
        </CardFooter>
      )}
    </Card>
  );
};

const getStatusBadge = (status: string) => {
  return (
    <Badge
      className={cn(
        "text-xs text-neutral-50 rounded-full ",
        status === "in_transit"
          ? `bg-info-600`
          : status === "delivered"
          ? "bg-success dark:bg-success-600"
          : status === "processing"
          ? `bg-warning-600`
          : status === "canceled"
          ? "bg-destructive dark:bg-destructive-600"
          : "bg-neutral dark:bg-neutral-600"
      )}
    >
      {status.replace("_", " ")}
    </Badge>
  );
};

export type RShipmentsCardType = {
  title?: string;
  loading?: boolean;
  description?: string;
  action?: string;
  data: ShipmentType[];
  footer?: string;
};
export default RecentShipmentsCard;
