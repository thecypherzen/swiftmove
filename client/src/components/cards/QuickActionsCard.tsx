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
import { Plus, Truck, UserPlus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import UseModal from "@/hooks/UseModal";
import CreateShipmentForm from "../forms/CreateShipmentForm";
import CreateDeliveryForm from "../forms/CreateDeliveryForm";

const QuickActionsCard = () => {
  const { set, open, isOpen } = UseModal();
  return (
    <Card className="gap-1.5 shadow-none border-1 h-1/2">
      <CardHeader className="mb-3">
        <CardTitle className="text-xl sm:text-2xl text-foreground">
          Quick&nbsp;Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 space-y-5">
        <Button
          className="w-full"
          onClick={() => {
            set(<CreateShipmentForm />);
            if (!isOpen) open();
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Shipment
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            set(<CreateDeliveryForm />);
            if (!isOpen) open();
          }}
        >
          <Truck className="mr-2 h-4 w-4" />
          Schedule Delivery
        </Button>
        <Button variant="outline" className="w-full">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Driver
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
