import DriversStatusCard from "@/components/cards/DriversStatusCard";
import QuickActionsCard from "@/components/cards/QuickActionsCard";
import RecentShipmentsCard from "@/components/cards/RecentShipmentsCard";
import DashSummarySection from "@/components/sections/DashSummarySection";
import PageRouteWrapper from "@/components/wrappers/PageRouteWrapper";
import { shipmentsData } from "@/mock_data/ShipmentsData";
import { useState } from "react";
import EBWithLoaderComponent from "@/components/utils/EBWithLoaderComponent";

const UserDashboard = () => {
  const [loadingShipments, _] = useState<boolean>(false);
  const [loadingDriverStats, __] = useState<boolean>(false);

  return (
    <EBWithLoaderComponent>
      <PageRouteWrapper>
        <div className="route-page grid grid-cols-1 content-start gap-5 items-start">
          <DashSummarySection />
          {/* Recent Shipments, Quick Actions and Driver Stats */}
          <div className="w-full grid grid-cols-1 grid-auto-rows-min @2xl/page:grid-cols-[2fr_1fr] gap-6 items-start">
            <RecentShipmentsCard
              title={"Recent Shipments"}
              data={shipmentsData}
              loading={loadingShipments}
            />
            <div className="flex flex-col gap-7 @md/page:flex-row @2xl/page:flex-col">
              <QuickActionsCard className="@md/page:w-1/2 @2xl/page:w-full" />
              <DriversStatusCard
                loading={loadingDriverStats}
                className="@md/page:w-1/2 @2xl/page:w-full"
              />
            </div>
          </div>
        </div>
      </PageRouteWrapper>
    </EBWithLoaderComponent>
  );
};

export default UserDashboard;
