import { summaryData } from "@/mock_data/DashboardData";
import DashboardSummaryCard, {
  type SummaryDataType,
  type SummaryIconType,
} from "../cards/DashboardSummaryCard";

const DashSummarySection = () => {
  return (
    <div className="grid grid-cols-1 @md/page:grid-cols-2 @2xl/page:grid-cols-3 @4xl/page:grid-cols-4 gap-3">
      {summaryData.map((item, index) => {
        return (
          <DashboardSummaryCard
            key={`ds-item-${index + 1}`}
            title={item.title}
            total={item.total}
            summary={item.summary as SummaryDataType}
            icon={item.icon as SummaryIconType}
          />
        );
      })}
    </div>
  );
};

export default DashSummarySection;
