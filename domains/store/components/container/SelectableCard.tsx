'use client';

type ContainerMode = "view" | "edit" | "delete";

type CardContent = {
  id: string;
  mode: ContainerMode;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onNavigate?: () => void;
  children?: React.ReactNode;
};

export default function SelectableCard({
  id,
  mode,
  isSelected,
  onSelect,
  onNavigate,
  children,
}: CardContent) {
  const ringColor: Record<ContainerMode, string> = {
    view: "ring-transparent",
    edit: "ring-sky-300",
    delete: "ring-error",
  };

  const color =
    mode === "view"
      ? ringColor[mode]
      : isSelected
      ? ringColor[mode]
      : "ring-whitesmoke/30";

  const handleClick = () => {
    if (mode === 'view' && onNavigate) {
      onNavigate()
      return
    }

    onSelect(id)
  }

  return (
    <li
      onClick={handleClick}
      className={`w-full h-fit rounded-xl relative ring-2  ${color}`}
    >
      {children}

      <div
        className={`${color} absolute right-4 top-4 ring-3 size-3 rounded-full`}
      />
    </li>
  );
}
