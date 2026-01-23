
export type StatusProps = {
  icon: React.ReactNode;
  text: string;
  tone: "success" | "error";
}

export default function Status({ icon, text, tone }: StatusProps) {
  return (
    <span
      className={`flex space-x-4 ${
        tone === "success" ? "text-success-dark" : "text-error-dark"
      }`}
    >
      {icon}
      <p>{text}</p>
    </span>
  );
}

