export default function RangeWithLabel({
  min = 0,
  max = 50,
  value = 25,
  step = 1,
  label,
}: {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  label: string;
}) {
  const numberOfSteps = (max - min) / step;

  return (
    <label>
      <span className="label">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className="range"
        step={step}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        {[...(Array(numberOfSteps + 1) as never[])].map((_, index) => (
          <div key={index}>{min + index * step}</div>
        ))}
      </div>
    </label>
  );
}
