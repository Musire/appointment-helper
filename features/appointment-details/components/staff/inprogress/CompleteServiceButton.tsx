
type Props = {
  disabled: boolean;
  onComplete: () => void;
};

export default function CompleteServiceButton({
  disabled,
  onComplete,
}: Props) {
  return (
    <div className="mt-auto">
      <button
        type="button"
        disabled={disabled}
        onClick={onComplete}
        className="fixed bottom-22 left-6 cursor-pointer hover:bg-darken-2/main w-[calc(100%-3rem)] normal-space bg-main centered text-background rounded-lg h-14 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Complete Service
      </button>
    </div>
  );
}