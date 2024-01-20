export default ({ children }: { children: React.ReactNode }) => (
  <div className="card card-compact bg-neutral shadow-xl">
    <div className="card-body">{children}</div>
  </div>
);
