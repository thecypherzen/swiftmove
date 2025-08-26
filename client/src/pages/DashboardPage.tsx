import DashSummarySection from "@/components/sections/DashSummarySection";
import PageRouteWrapper from "@/components/wrappers/PageRouteWrapper";

const UserDashboard = () => {
  return (
    <PageRouteWrapper>
      <div className="route-page">
        <DashSummarySection />
      </div>
    </PageRouteWrapper>
  );
};

export default UserDashboard;
