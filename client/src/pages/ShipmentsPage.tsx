import ShipmentsTable from "@/components/tables/ShipmentsTable";
import EBWithLoaderComponent from "@/components/utils/EBWithLoaderComponent";
import PageRouteWrapper from "@/components/wrappers/PageRouteWrapper";

const UserDashboard = () => {
  return (
    <EBWithLoaderComponent>
      <PageRouteWrapper>
        <div className="route-page">
          <ShipmentsTable />
        </div>
      </PageRouteWrapper>
    </EBWithLoaderComponent>
  );
};

export default UserDashboard;
