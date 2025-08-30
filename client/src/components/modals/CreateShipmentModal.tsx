import CreateShipmentForm from "../forms/CreateShipmentForm";
import UseModal from "@/hooks/UseModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const CreateShipmentModal = () => {
  const { openShipmentModal, setOpenShipmentModal } = UseModal();
  return (
    <Dialog open={openShipmentModal} onOpenChange={setOpenShipmentModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="dark:text-primary text-primary-600 mb-4 text-xl">
            Create New Shipment
          </DialogTitle>
        </DialogHeader>
        <CreateShipmentForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateShipmentModal;
