import CreateDeliveryForm from "../forms/CreateDeliveryForm";
import UseModal from "@/hooks/UseModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const CreateDeliveryModal = () => {
  const { openDeliveryModal, setOpenDeliveryModal } = UseModal();
  return (
    <Dialog open={openDeliveryModal} onOpenChange={setOpenDeliveryModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="dark:text-primary text-primary-600 mb-4 text-xl">
            Schedule New Delivery
          </DialogTitle>
        </DialogHeader>
        <CreateDeliveryForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDeliveryModal;
