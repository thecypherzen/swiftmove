import { type ColumnDef } from "@tanstack/react-table";
import { type ShipmentType } from "@/shared/types";
import { BadgeDataCell, DefaultDataCell, MultiFieldCell, RouteCell } from ".";

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
      const value = row.original.priority;
      const type =
        value === "high"
          ? "destructive"
          : value === "medium"
          ? "info"
          : "neutral";

      <BadgeDataCell data={{ value, type }} />;
    },
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }) => <DefaultDataCell value={row.original.weight} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.original.status;
      const type =
        value === "processing"
          ? "warning"
          : value === "in-transit"
          ? "info"
          : "neutral";

      <BadgeDataCell data={{ value, type }} />;
    },
  },
  {
    accessorKey: "deliveryDate",
    header: "Delivery Date",
    cell: ({ row }) => {
      const d = row.original.deliveryDate;
      const dstr = d.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const mstr = String(d.getMinutes()).padStart(2, "0");
      const hstr = String(d.getHours()).padStart(2, "0");
      return <DefaultDataCell value={`${dstr}(${hstr}:${mstr})`} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Send Date",
    cell: ({ row }) => {
      const d = row.original.createdAt;
      const dstr = d.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const mstr = String(d.getMinutes()).padStart(2, "0");
      const hstr = String(d.getHours()).padStart(2, "0");
      return <DefaultDataCell value={`${dstr}(${hstr}:${mstr})`} />;
    },
  },
  {
    accessorKey: "trackingId",
    header: "Tracking Number",
    cell: ({ row }) => <DefaultDataCell value={row.original.trackingId} />,
  },
];
