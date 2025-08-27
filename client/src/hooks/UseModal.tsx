/** A global modal that can be used from anywhere in the application */

import { createContext, useContext, useState } from "react";

// the context
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

// the provider
export const ModalProvider = ({ children }: ModalPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const set = (modalContent: React.ReactNode) => {
    setContent(modalContent);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setContent(null);
    setIsOpen(false);
  };

  // the modal component
  return (
    <ModalContext.Provider
      value={{
        isOpen,
        open,
        close,
        set,
      }}
    >
      {children}
      {isOpen && (
        <div
          className="fixed w-screen h-screen inset-0 bg-neutral-900/94 dark:bg-background/94 z-[1000] flex flex-col items-center justify-center p-4 !transition-discrete duration-1000"
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

// custom hook for easy access throughout th appp
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
  set: (content: React.ReactNode) => void;
  open: () => void;
  close: () => void;
};

export default UseModal;
