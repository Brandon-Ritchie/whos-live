export default function ToggleWithLabel({
  label,
  checked,
  onChange,
  labelSide = "left",
  name,
}: {
  label: string;
  checked: boolean;
  labelSide?: "left" | "right";
  name: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        {labelSide === "left" && <span className="label-text">{label}</span>}
        <input
          type="checkbox"
          checked={checked}
          className="toggle"
          id={name}
          onChange={() => onChange(!checked)}
          name={name}
        />
        {labelSide === "right" && <span className="label-text">{label}</span>}
      </label>
    </div>
  );
}
