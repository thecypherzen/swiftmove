import DashSummarySection from "@/components/sections/DashSummarySection";
import PageRouteWrapper from "@/components/wrappers/PageRouteWrapper";

const UserDashboard = () => {
  return (
    <PageRouteWrapper>
      <div className="route-page w-99/100 @container">
        <DashSummarySection />
      </div>
    </PageRouteWrapper>
  );
};

export default UserDashboard;
