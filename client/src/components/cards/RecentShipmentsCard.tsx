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
import { Link } from "react-router-dom";

const RecentShipmentsCard = ({
  loading,
  description,
  action,
  title,
  data,
  footer,
  className,
}: RShipmentsCardType) => {
  return (
    <Card
      className={cn(
        "shadow-none px-2 @lg:px-6 @container/rscard max-h-120 overflow-y-auto",
        className
      )}
    >
      <CardHeader className="px-2 @lg:px-6">
        <CardTitle className="text-xl sm:text-2xl text-foreground">
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
      <CardContent className="px-2 @lg:px-6">
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
                className="grid grid-cols-1 @xs/rscard:grid-cols-[1fr_3fr] @sm/rscard:grid-cols-[1fr_2fr] @md/rscard:grid-cols-10 items-center gap-3 p-4 bg-muted rounded-lg"
              >
                <div className="hidden @xs/rscard:block @sm/rscard:row-span-2 @md/rscard:row-span-1 @md/rscard:col-span-2 @xl/rscard:col-span-1 overflow-hidden aspect-square rounded-lg object-cover object-center bg-muted dark:bg-white/90">
                  <img
                    src={shipment.owner?.avatar ?? getRandomImageUrl()}
                    alt="image"
                    className="object-top object-cover h-full"
                  />
                </div>
                <div className="flex-1 text-center @xs/rscard:text-left space-y-1 @md/rscard:col-span-6 @xl/rscard:col-span-7">
                  <h4 className="font-semibold line-clamp-2 @xs/rscard:line-clamp-1">
                    {shipment.owner.name}
                  </h4>
                  <p className="text-sm text-muted-foreground line-lamp-2">
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
        "text-xs  text-neutral-50 rounded-full w-full @xs/rscard:col-span-full @sm:col-span-1 @md/rscard:text-[10px] @md/rscard:col-span-2",
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
  loading: boolean;
  description?: string;
  action?: string;
  data: ShipmentType[];
  footer?: string;
  className?: string;
};
export default RecentShipmentsCard;
