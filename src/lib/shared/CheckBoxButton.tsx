export default function CheckBoxButton({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        className="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <button className="ml-2" onClick={() => onChange(!checked)}>
        {label}
      </button>
    </label>
  );
}
