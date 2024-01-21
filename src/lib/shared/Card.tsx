function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="card card-compact min-w-64 max-w-96 bg-neutral shadow-xl">
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
