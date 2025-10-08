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
import { useEffect, useRef, useState } from "react";

/**
 * @component RecentShipmentsCard
 * @description Displays a list of recent shipments with status badges and actions.
 *
 * @prop {boolean} loading - Whether to show loading skeletons.
 * @prop {ShipmentType[]} data - Array of shipment data to display.
 * @prop {string} [title] - Optional card title.
 * @prop {string} [description] - Optional subtitle or context text.
 * @prop {string} [action] - Text for the call-to-action link (defaults to "View All").
 * @prop {string} [footer] - Optional footer note.
 * @prop {string} [className] - Additional Tailwind classes.
 *
 * @example
 * <RecentShipmentsCard
 *   loading={false}
 *   data={shipments}
 *   title="Recent Shipments"
 *   footer="Updated 10 mins ago"
 * />
 */
const RecentShipmentsCard = ({
  loading,
  description,
  action,
  title,
  data,
  footer,
  className,
}: RShipmentsCardType) => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * @hook
   * Loads and unloads an observer unto the sentinel, tracking
   * it's scroll position and sets/unsets card header pos
   * accordingly
   */
  useEffect(() => {
    const rsCard = document.getElementById("rs-card");
    if (!rsCard || !sentinelRef.current) return;
    //observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio <= 0.15) {
          if (!isSticky) {
            setIsSticky(true);
            // unload if sticky
            observerRef.current!.unobserve(sentinelRef.current!);
          }
        } else {
          if (isSticky) {
            setIsSticky(false);
            // load if not sticky
            observerRef.current!.observe(sentinelRef.current!);
          }
        }
      },
      {
        root: rsCard,
        rootMargin: "-50px",
        threshold: 1,
      }
    );
    //initial observer load
    observerRef.current.observe(sentinelRef.current);
    //cleanup
    return () => {
      if (sentinelRef.current) {
        observerRef?.current?.unobserve(sentinelRef.current);
        observerRef?.current?.disconnect();
      }
    };
  }, []);

  return (
    <Card
      className={cn(
        "shadow-none px-2 @lg:px-6 @container/rscard max-h-120 overflow-y-auto transform-3d translate-z-0",
        isSticky && "pt-0",
        className
      )}
      id="rs-card"
    >
      {/* Sentilen - to track current scroll position */}
      <div ref={sentinelRef}></div>

      {/* Heading */}
      <CardHeader
        className={cn(
          "px-2 @lg:px-6 transition-all duration-300",
          isSticky && "sticky top-0 bg-background pt-6 pb-2"
        )}
      >
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
      {/* Content */}
      <CardContent className="px-2 @lg:px-6">
        {loading ? (
          // when loading - render skeleton
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
          // when ready - render content
          <div className="space-y-4">
            {data.slice(0, 5).map((shipment) => (
              <div
                key={shipment.id}
                className="grid grid-cols-1 @xs/rscard:grid-cols-[1fr_3fr] @sm/rscard:grid-cols-[1fr_2fr] @md/rscard:grid-cols-10 items-center gap-3 p-4 bg-muted rounded-lg"
              >
                <div className="hidden @xs/rscard:block @sm/rscard:row-span-2 @md/rscard:row-span-1 @md/rscard:col-span-2 @xl/rscard:col-span-1 overflow-hidden aspect-square rounded-lg object-cover object-center bg-muted dark:bg-white/90">
                  <img
                    src={shipment.sender?.avatar ?? getRandomImageUrl()}
                    alt="image"
                    className="object-top object-cover h-full"
                  />
                </div>
                <div className="flex-1 text-center @xs/rscard:text-left space-y-1 @md/rscard:col-span-6 @xl/rscard:col-span-7">
                  <h4 className="font-semibold line-clamp-2 @xs/rscard:line-clamp-1">
                    {shipment.sender.name}
                  </h4>
                  <p className="text-sm text-muted-foreground line-lamp-2">
                    {shipment.pickupAddress.split(",")[0]} →{" "}
                    {shipment.destinationAddress.split(",")[0]}
                  </p>
                </div>
                {StatusBadge(shipment.status)}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {/* Show footer if any */}
      {footer && (
        <CardFooter>
          <p className={cn("text-xs mt-1")}>{footer}</p>
        </CardFooter>
      )}
    </Card>
  );
};

/**
 * @component StatusBadge - A shipment's status badge based on 'status' value
 * Designed strictly for its parent - @RecentShipmentsCard and not
 * for external use. Open for modifications though.
 *
 * @prop {string} status - the shipment status
 * @returns {React.ReactNode} - a badge
 */
const StatusBadge = (status: string) => {
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
