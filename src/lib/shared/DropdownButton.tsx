export default function DropdownButton({
  children,
  label,
  buttonColor,
  backgroundColor,
}: {
  children: React.ReactNode;
  label: string;
  buttonColor?: string;
  backgroundColor?: string;
}) {
  return (
    <details className="dropdown dropdown-bottom">
      <summary
        tabIndex={0}
        role="button"
        className={`btn ${buttonColor ? "btn-" + buttonColor : ""} m-1`}
      >
        {label}
      </summary>
      <div
        className={`menu dropdown-content z-[1] rounded-box bg-${backgroundColor ?? "neutral"} max-h-52 overflow-hidden p-2 shadow`}
      >
        <ul className="overflow-y-auto">{children}</ul>
      </div>
    </details>
  );
}
