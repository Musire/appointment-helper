'use client';
type PanelOneProps = {
  value: string;
  onChange: (v: string) => void;
};

export default function PanelOne({ value, onChange }: PanelOneProps) {

  const handleClick = () => {
    onChange('testing the button yo'); 
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-bold mb-2">Panel One</h2>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Update Value
      </button>
    </div>
  );
};
