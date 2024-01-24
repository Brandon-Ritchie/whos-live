function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="card card-compact min-h-64 w-72 bg-neutral shadow-xl">
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
