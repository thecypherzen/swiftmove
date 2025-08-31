import ShipmentsTable from "@/components/tables/ShipmentsTable";
import PageRouteWrapper from "@/components/wrappers/PageRouteWrapper";

const UserDashboard = () => {
  return (
    <PageRouteWrapper>
      <div className="route-page">
        <ShipmentsTable />
      </div>
    </PageRouteWrapper>
  );
};

export default UserDashboard;
