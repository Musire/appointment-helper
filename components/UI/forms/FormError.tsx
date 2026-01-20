// FormError.tsx
import { FieldError, FieldErrors, FieldValues } from "react-hook-form";

export type FormErrorProps<TFieldValues extends FieldValues = FieldValues> = {
  showError: boolean;
  errors: FieldErrors<TFieldValues>;
};

function flattenErrors(errors: FieldErrors): FieldError[] {
  const result: FieldError[] = [];

  const walk = (obj: any) => {
    for (const value of Object.values(obj)) {
      if (!value) continue;

      if (typeof value === "object" && "message" in value) {
        result.push(value as FieldError);
      } else if (typeof value === "object") {
        walk(value);
      }
    }
  };

  walk(errors);
  return result;
}

export default function FormError<TFieldValues extends FieldValues>({
  showError,
  errors,
}: FormErrorProps<TFieldValues>) {
  if (!showError) return null;

  const list = flattenErrors(errors);

  return (
    <div className="space-y-1 text-sm text-error-dark">
      {list.map((err, i) => (
        <p key={i}>{err.message}</p>
      ))}
    </div>
  );
}
