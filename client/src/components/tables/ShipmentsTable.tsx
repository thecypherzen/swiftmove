import { shipmentsData } from "@/mock_data/ShipmentsData";
import type { ShipmentType } from "@/shared/types";
import { DataTable } from "../ui/data-table";
import { ShipmentTableColumns } from "./columns/ShipmentsTableColumns";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import UseModal from "@/hooks/UseModal";
import CreateShipmentModal from "../modals/CreateShipmentModal";

const ShipmentsTable = () => {
  const data: ShipmentType[] = shipmentsData;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");

  const { setOpenShipmentModal } = UseModal();
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Shipments</h2>
        <Button onClick={() => setOpenShipmentModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Shipment
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search shipments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="p-0">
            <DataTable data={data} columns={ShipmentTableColumns} />;
          </div>
        </CardContent>
      </Card>
      <CreateShipmentModal />
    </div>
  );
};

export default ShipmentsTable;
