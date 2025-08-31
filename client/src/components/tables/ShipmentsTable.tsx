import { shipments } from "@/mock_data/ShipmentsData";
import type { ShipmentStatusType, ShipmentType } from "@/shared/types";
import { DataTable } from "../ui/data-table";
import { ShipmentTableColumns } from "./columns/ShipmentsTableColumns";

const ShipmentsTable = () => {
  const data: ShipmentType[] = shipments.map((field) => {
    return {
      ...field,
      createdAt: new Date(field.createdAt),
      deliveryDate: new Date(field.deliveryDate),
      status: field.status as ShipmentStatusType,
    };
  });
  return <DataTable data={data} columns={ShipmentTableColumns} />;
};

export default ShipmentsTable;
