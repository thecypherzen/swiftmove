import { type ColumnDef } from "@tanstack/react-table";
import { type ShipmentType } from "@/shared/types";
import {
  StatusDataCell,
  DefaultDataCell,
  MultiFieldCell,
  PriorityDataCell,
  RouteCell,
} from ".";
import { getDateString, getTimeStringFromDate } from "@/lib/utils";

export const ShipmentTableColumns: ColumnDef<ShipmentType>[] = [
  {
    accessorKey: "sender",
    header: "Sender",
    cell: ({ row }) => {
      const sender = { ...row.original.sender } as Record<
        string,
        string | number
      >;
      return <MultiFieldCell data={sender} keys={["name", "phone", "email"]} />;
    },
  },
  {
    accessorKey: "receiver",
    header: "Receiver",
    cell: ({ row }) => {
      const receiver = { ...row.original.receiver } as Record<
        string,
        string | number
      >;
      return (
        <MultiFieldCell data={receiver} keys={["name", "phone", "email"]} />
      );
    },
  },
  {
    id: "route",
    header: "Route",
    cell: ({ row }) => (
      <RouteCell
        data={{
          from: row.original.pickupAddress,
          to: row.original.destinationAddress,
        }}
      />
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      return <PriorityDataCell value={row.original.priority} />;
    },
  },
  {
    accessorKey: "weight",
    header: "Weight",
    enableSorting: true,
    cell: ({ row }) => <DefaultDataCell value={row.original.weight} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusDataCell value={row.original.status} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Sent",
    enableSorting: true,
    cell: ({ row }) => {
      const d = row.original.createdAt;
      const dstr = getDateString(d);
      const tstr = getTimeStringFromDate(d);
      const data = { date: `${dstr}`, time: `${tstr}` };
      return <MultiFieldCell data={data} />;
    },
  },
  {
    accessorKey: "deliveryDate",
    enableSorting: true,
    header: "Delivery Date",
    cell: ({ row }) => {
      const d = row.original.deliveryDate;
      const dstr = getDateString(d);
      const tstr = getTimeStringFromDate(d);
      const data = { date: `${dstr}`, time: `${tstr}` };
      return <MultiFieldCell data={data} />;
    },
  },

  {
    accessorKey: "trackingId",
    header: "Tracking Number",
    cell: ({ row }) => <DefaultDataCell value={row.original.trackingId} />,
  },
];
