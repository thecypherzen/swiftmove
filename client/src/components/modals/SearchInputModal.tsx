import UseModal from "@/hooks/UseModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

const SearchInputModal = ({ content }: SearchModalPropsType) => {
  const { openSearchInputModal, setOpenSearchInputModal } = UseModal();
  return (
    <Dialog open={openSearchInputModal} onOpenChange={setOpenSearchInputModal}>
      <DialogContent>
        <div className="flex flex-col gap-6 items-center pt-20">
          <DialogHeader>
            <DialogTitle className="dark:text-primary text-primary-600 mb-4 text-xl sr-only">
              Search
            </DialogTitle>
            <DialogDescription className="w-4/5 m-auto">
              Enter a search term and we'll look it up in the app for you.
            </DialogDescription>
          </DialogHeader>
          {content ? (
            <>{content}</>
          ) : (
            <div className="rounded-md bg-background">
              <Input
                type="text"
                placeholder={"Search here..."}
                className="w-full"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

type SearchModalPropsType = {
  content?: React.ReactNode;
};
export default SearchInputModal;
