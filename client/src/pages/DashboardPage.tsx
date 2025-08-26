import DashSummarySection from "@/components/sections/DashSummarySection";
import RecentShipmentsSection from "@/components/sections/RecentShipmentsSection";
import PageRouteWrapper from "@/components/wrappers/PageRouteWrapper";

const UserDashboard = () => {
  return (
    <PageRouteWrapper>
      <div className="route-page grid grid-cols-1 gap-10">
        <DashSummarySection />
        <div className="w-full grid grid-cols-1 @lg:grid-cols-[2fr_1fr] gap-6">
          <RecentShipmentsSection />
        </div>
      </div>
    </PageRouteWrapper>
  );
};

export default UserDashboard;
