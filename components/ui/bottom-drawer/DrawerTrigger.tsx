import * as React from "react";
import { useDrawerContext } from "./BottomDrawer";

type TriggerProps = {
  children: React.ReactElement<{
    onClick?: (e: React.MouseEvent) => void;
    "aria-expanded"?: boolean;
  }>;
};

export default function DrawerTrigger({ children }: TriggerProps) {
  const { onOpen, isOpen } = useDrawerContext();

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      onOpen();
    },
    "aria-expanded": isOpen,
  });
}
