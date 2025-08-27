import QuickActionsCard from "@/components/cards/QuickActionsCard";
import RecentShipmentsCard from "@/components/cards/RecentShipmentsCard";
import DashSummarySection from "@/components/sections/DashSummarySection";
import PageRouteWrapper from "@/components/wrappers/PageRouteWrapper";
import { recentShipments } from "@/mock_data/DashboardData";

const UserDashboard = () => {
  return (
    <PageRouteWrapper>
      <div className="route-page grid grid-cols-1 gap-10">
        <DashSummarySection />
        <div className="w-full grid grid-cols-1 @3xl/page:grid-cols-[2fr_1fr] gap-6">
          <RecentShipmentsCard
            title={"Recent Shipments"}
            data={recentShipments}
          />
          <QuickActionsCard />
        </div>
      </div>
    </PageRouteWrapper>
  );
};

export default UserDashboard;
