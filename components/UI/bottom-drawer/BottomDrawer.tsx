'use client';
import * as React from "react";

type DrawerContextType = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const DrawerContext = React.createContext<DrawerContextType | undefined>(undefined);

export function useDrawerContext() {
  const context = React.useContext(DrawerContext);
  if (!context) throw new Error("Drawer components must be used within <Drawer />");
  return context;
}

export default function BottomDrawer({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <DrawerContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </DrawerContext.Provider>
    )
}