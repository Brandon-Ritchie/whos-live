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
      <ul
        className={`menu dropdown-content z-[1] rounded-box bg-${backgroundColor ?? "neutral"} p-2 shadow`}
      >
        {children}
      </ul>
    </details>
  );
}
