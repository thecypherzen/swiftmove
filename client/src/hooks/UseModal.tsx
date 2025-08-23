import { createContext, useContext, useState } from "react";

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider = ({ children }: ModalPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const open = (modalContent: React.ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
  };

  const close = () => {
    setContent(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        open,
        close,
      }}
    >
      {children}
      {isOpen && (
        <div
          className="fixed w-screen h-screen inset-0 bg-background/94  z-[1000] flex items-center justify-center p-4"
          onClick={() => close()}
        >
          <div onClick={(e) => e.stopPropagation()} className="opacity-100">
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

const UseModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("UseModal must be used within a ModalProvider");
  }
  return context;
};

// types
export type ModalPropsType = {
  children: React.ReactNode;
};
export type ModalContextType = {
  isOpen: boolean;
  open: (content: React.ReactNode) => void;
  close: () => void;
};

export default UseModal;
