'use client';

type PanelTwoProps = {
  value: string;
  onChange: (v: string) => void;
  onBack: () => void
};

export default function PanelTwo({ value, onChange, onBack }: PanelTwoProps) {

  const handleClick = () => {
    onChange("but it's whack"); // inform orchestrator
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-bold mb-2">Panel Two</h2>
      <span className="">
        <button
          onClick={handleClick}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Update Value
        </button>
        <button onClick={onBack} className="btn">back</button>
      </span>
    </div>
  );
};
