import DashSummarySection from "@/components/sections/DashSummarySection";
import RecentShipmentsSection from "@/components/sections/RecentShipmentsSection";
import PageRouteWrapper from "@/components/wrappers/PageRouteWrapper";

const UserDashboard = () => {
  return (
    <PageRouteWrapper>
      <div className="route-page grid grid-cols-1 gap-10">
        <DashSummarySection />
        <RecentShipmentsSection />
      </div>
    </PageRouteWrapper>
  );
};

export default UserDashboard;
