//import { summaryData } from "@/mock_data/DashboardSummaryData";
import { recentShipments } from "@/mock_data/DashboardData";
import RecentShipmentsCard from "../cards/RecentShipmentsCard";

const RecentShipmentsSection = () => {
  return (
    <aside className="w-full grid grid-cols-1 @3xl/page:grid-cols-[2fr_1fr] gap-6">
      <RecentShipmentsCard title={"Recent Shipments"} data={recentShipments} />
    </aside>
  );
};

export default RecentShipmentsSection;
