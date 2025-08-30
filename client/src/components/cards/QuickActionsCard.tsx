import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import UseModal from "@/hooks/UseModal";
import { useAuth } from "@/hooks/UseAuth";
import { Plus, Truck, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import CreateShipmentModal from "../modals/CreateShipmentModal";
import CreateDeliveryModal from "../modals/CreateDeliveryModal";
import CreateDriverModal from "../modals/CreateDriverModal";

const QuickActionsCard = ({ className }: QuickActionPropsType) => {
  const {
    openShipmentModal,
    setOpenShipmentModal,
    openDeliveryModal,
    setOpenDeliveryModal,
    openDriverModal,
    setOpenDriverModal,
  } = UseModal();
  const { user } = useAuth();

  return (
    <React.Fragment>
      <Card className={cn("gap-1.5 shadow-none", className)}>
        <CardHeader className="mb-3">
          <CardTitle className="text-xl sm:text-2xl text-foreground">
            Quick&nbsp;Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 space-y-5">
          <Button
            className="w-full"
            onClick={() => setOpenShipmentModal(!openShipmentModal)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Shipment
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpenDeliveryModal(!openDeliveryModal)}
          >
            <Truck className="mr-2 h-4 w-4" />
            Schedule Delivery
          </Button>
          {user?.role === "admin" && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setOpenDriverModal(!openDriverModal)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Driver
            </Button>
          )}
        </CardContent>
      </Card>
      {/* Modals */}
      <CreateShipmentModal />
      <CreateDeliveryModal />
      <CreateDriverModal />
    </React.Fragment>
  );
};

type QuickActionPropsType = {
  className?: string;
};

export default QuickActionsCard;
