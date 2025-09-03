/** A global modal that can be used from anywhere in the application */

import { createContext, useContext, useState } from "react";

// the context
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

// the provider
export const ModalProvider = ({ children }: ModalPropsType) => {
  const [openShipmentModal, setOpenShipmentModal] = useState(false);
  const [openDeliveryModal, setOpenDeliveryModal] = useState<boolean>(false);
  const [openDriverModal, setOpenDriverModal] = useState<boolean>(false);
  const [openSearchInputModal, setOpenSearchInputModal] =
    useState<boolean>(false);
  return (
    <ModalContext.Provider
      value={{
        openShipmentModal,
        setOpenShipmentModal,
        openDeliveryModal,
        setOpenDeliveryModal,
        openDriverModal,
        setOpenDriverModal,
        openSearchInputModal,
        setOpenSearchInputModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// custom hook for easy access throughout the appp
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
  openShipmentModal: boolean;
  setOpenShipmentModal: React.Dispatch<React.SetStateAction<boolean>>;
  openDeliveryModal: boolean;
  setOpenDeliveryModal: React.Dispatch<React.SetStateAction<boolean>>;
  openDriverModal: boolean;
  setOpenDriverModal: React.Dispatch<React.SetStateAction<boolean>>;
  openSearchInputModal: boolean;
  setOpenSearchInputModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default UseModal;
