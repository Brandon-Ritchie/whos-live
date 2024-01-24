export default function ProfileYoutubeSubsRange({
  numberOfSubs,
  name,
  onChange,
}: {
  numberOfSubs: number | undefined;
  name: string;
  onChange: (numberOfSubs: number) => void;
}) {
  return (
    <label htmlFor={name}>
      <span className="label">
        Number of YouTube Subscribers To Use: {numberOfSubs ?? 25}
      </span>
      <input
        type="range"
        min={5}
        max={50}
        value={numberOfSubs ?? 25}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range"
        step={5}
        id={name}
        name={name}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        {Array.from(Array(10).keys()).map((i) => (
          <span key={i}>|</span>
        ))}
      </div>
    </label>
  );
}
