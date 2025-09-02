import { Package, Truck, Users } from "lucide-react";

export const summaryData = [
  {
    title: "Total Shipments",
    total: 3,
    summary: {
      text: "↗ +12% from last month",
      color: "success",
    },
    icon: {
      value: Package,
      baseColor: "info",
    },
  },
  {
    title: "Active Deliveries",
    total: 1,
    summary: {
      text: "➘ -50% from yesterday",
      color: "destructive",
    },
    icon: {
      value: Truck,
      baseColor: "primary",
    },
  },
  {
    title: "Available Drivers",
    total: 5,
    summary: {
      text: "➞ No change",
      color: "warning",
    },
    icon: {
      value: Users,
      baseColor: "success",
    },
  },
  {
    title: "Revenue",
    total: 84200,
    summary: {
      text: "↗ +15% from last month",
      color: "success",
    },
    icon: {
      value: Package,
      baseColor: "warning",
    },
  },
];
