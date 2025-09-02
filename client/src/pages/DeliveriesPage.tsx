import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreateDeliveryModal from "@/components/modals/CreateDeliveryModal";
import { Plus } from "lucide-react";
import UseModal from "@/hooks/UseModal";
import PageRouteWrapper from "@/components/wrappers/PageRouteWrapper";

const DeliveriesPage = () => {
  const { setOpenDeliveryModal } = UseModal();

  return (
    <PageRouteWrapper>
      <div className="route-page grid grid-cols-1 content-start items-start gap-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold">Deliveries Management</h2>
          <Button onClick={() => setOpenDeliveryModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Delivery
          </Button>
        </div>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Delivery management interface is being developed.
              </p>
              <p className="text-sm text-muted-foreground">
                This section will include delivery tracking, route optimization,
                and real-time updates.
              </p>
            </div>
          </CardContent>
        </Card>

        <CreateDeliveryModal />
      </div>
    </PageRouteWrapper>
  );
};

export default DeliveriesPage;
