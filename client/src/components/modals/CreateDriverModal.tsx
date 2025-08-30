import CreateDriverForm from "../forms/CreateDriverForm";
import UseModal from "@/hooks/UseModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const CreateDriverModal = () => {
  const { openDriverModal, setOpenDriverModal } = UseModal();
  return (
    <Dialog open={openDriverModal} onOpenChange={setOpenDriverModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Driver</DialogTitle>
        </DialogHeader>
        <CreateDriverForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDriverModal;
