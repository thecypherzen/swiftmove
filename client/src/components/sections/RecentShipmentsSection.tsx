//import { summaryData } from "@/mock_data/DashboardSummaryData";
import { recentShipments } from "@/mock_data/DashboardData";
import RecentShipmentsCard from "../cards/RecentShipmentsCard";

const RecentShipmentsSection = () => {
  return (
    <aside className="">
      <RecentShipmentsCard title={"Recent Shipments"} data={recentShipments} />
    </aside>
  );
};

export default RecentShipmentsSection;
