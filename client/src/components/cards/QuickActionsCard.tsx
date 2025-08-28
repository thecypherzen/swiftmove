import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import UseModal from "@/hooks/UseModal";
import CreateShipmentForm from "../forms/CreateShipmentForm";
import CreateDeliveryForm from "../forms/CreateDeliveryForm";
import CreateDriverForm from "../forms/CreateDriverForm";
import { useAuth } from "@/hooks/UseAuth";
import { Plus, Truck, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const QuickActionsCard = ({ className }: QuickActionPropsType) => {
  const { set, open, isOpen } = UseModal();
  const { user } = useAuth();

  return (
    <Card className={cn("gap-1.5 shadow-none", className)}>
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
        {user?.role === "admin" && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              set(<CreateDriverForm />);
              if (!isOpen) open();
            }}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Driver
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

type QuickActionPropsType = {
  className?: string;
};

export default QuickActionsCard;
