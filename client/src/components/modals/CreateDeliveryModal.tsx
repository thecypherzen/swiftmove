import CreateDeliveryForm from "../forms/CreateDeliveryForm";
import UseModal from "@/hooks/UseModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const CreateDeliveryModal = () => {
  const { openDeliveryModal, setOpenDeliveryModal } = UseModal();
  return (
    <Dialog open={openDeliveryModal} onOpenChange={setOpenDeliveryModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule New Delivery</DialogTitle>
        </DialogHeader>
        <CreateDeliveryForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDeliveryModal;
