import { summaryData } from "@/mock_data/DashboardData";
import DashboardSummaryCard, {
  type SummaryDataType,
  type SummaryIconType,
} from "../cards/DashboardSummaryCard";

const DashSummarySection = () => {
  return (
    <div className="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 @5xl:grid-cols-4 gap-5 ">
      {summaryData.map((item, index) => {
        console.log(item);
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
