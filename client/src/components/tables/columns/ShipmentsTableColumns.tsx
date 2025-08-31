import { type ColumnDef } from "@tanstack/react-table";
import { type ShipmentType } from "@/shared/types";

export const ShipmentTableColumns: ColumnDef<ShipmentType>[] = [
  {
    accessorFn: (row) => row.sender.name,
    header: "Sender",
    id: "sender",
  },
  {
    accessorFn: (row) => row.receiver.name,
    header: "Receiver",
    id: "receiverName",
  },
  {
    accessorKey: "pickupAddress",
    header: "Pickup Location",
  },
  {
    accessorKey: "destinationAddress",
    header: "Deivery Location",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "deliveryDate",
    header: "Delivery Date",
  },
  {
    accessorKey: "createdAt",
    header: "Send Date",
  },
  {
    accessorKey: "trackingId",
    header: "Tracking Number",
  },
];
