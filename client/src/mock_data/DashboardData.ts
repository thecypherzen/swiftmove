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

export const recentShipments = [
  {
    id: "0198e83c-7e66-74de-b864-3e2e4a75d4bf",
    owner: {
      name: "TechCorp Inc.",
      email: "tech@corp.com",
      avatar:
        "https://images.unsplash.com/photo-1748382018115-cdcecf7b4b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=96",
    },
    pickupAddress: "123 Tech Street, New York, NY 10001",
    destinationAddress: "456 Innovation Ave, Los Angeles, CA 90210",
    priority: "high",
    weight: 500,
    status: "delivered",
    notes: "Handle with care - electronics",
    deliveryDate: new Date("2025-08-21T10:30:00Z"),
  },
  {
    id: "0198e83c-8514-71fd-8d75-c7774e02306",
    owner: {
      name: "GlobalFurniture Corp.",
      email: "orders@globalfurn.com",
      avatar:
        "https://images.unsplash.com/photo-1756017353605-01901a3f86e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=96",
    },
    pickupAddress: "789 Furniture Blvd, Chicago, IL 60601",
    destinationAddress: "321 Home Street, Miami, FL 33101",
    priority: "medium",
    weight: 1200,
    status: "in_transit",
    notes: "Large furniture items - requires special handling",
    deliveryDate: new Date("2025-08-29T08:15:00Z"),
  },
  {
    id: "0198e842-3cda-775f-9ad4-610f67077bc9",
    owner: {
      name: "MedSupply Labs",
      email: "procurement@medsupply.com",
    },
    pickupAddress: "555 Medical Center Dr, Boston, MA 02101",
    destinationAddress: "777 Healthcare Way, Atlanta, GA 30301",
    priority: "high",
    weight: 200,
    status: "processing",
    notes: "Temperature-sensitive medical supplies",
    deliveryDate: new Date("2025-08-27T14:00:00Z"),
  },
];
